<?php
/**
 * Standalone Pure-PHP SMTP Client
 * High-performance, zero-dependency SMTP mailer with TLS/SSL, AUTH LOGIN & Attachment support.
 * Designed for DirectAdmin, cPanel, Apache, LiteSpeed, and Nginx PHP environments.
 */

class SimpleSmtpMailer {
    private $host;
    private $port;
    private $secure; // 'tls', 'ssl', 'none'
    private $auth;
    private $username;
    private $password;
    private $timeout = 20;
    private $debugLog = [];
    private $socket = null;

    public function __construct(array $config = []) {
        $this->host     = $config['host'] ?? 'localhost';
        $this->port     = (int)($config['port'] ?? 587);
        $this->secure   = strtolower($config['secure'] ?? 'tls');
        $this->auth     = filter_var($config['auth'] ?? true, FILTER_VALIDATE_BOOLEAN);
        $this->username = $config['username'] ?? '';
        $this->password = $config['password'] ?? '';
    }

    public function getLogs(): array {
        return $this->debugLog;
    }

    private function log($message) {
        $this->debugLog[] = date('[Y-m-d H:i:s] ') . $message;
    }

    private function getResponse(): string {
        $response = '';
        while ($line = fgets($this->socket, 515)) {
            $response .= $line;
            if (substr($line, 3, 1) === ' ') {
                break;
            }
        }
        $this->log("SERVER: " . trim($response));
        return $response;
    }

    private function sendCommand(string $command, $expectedCode = 250): bool {
        $this->log("CLIENT: " . ($command === $this->password ? '********' : $command));
        fwrite($this->socket, $command . "\r\n");
        $response = $this->getResponse();
        $code = (int)substr($response, 0, 3);

        if (is_array($expectedCode)) {
            return in_array($code, $expectedCode, true);
        }
        return $code === (int)$expectedCode;
    }

    public function send(array $mail): array {
        $fromEmail = $mail['from_email'] ?? $this->username;
        $fromName  = $mail['from_name'] ?? 'Mailer';
        $toEmail   = $mail['to_email'] ?? '';
        $toName    = $mail['to_name'] ?? '';
        $replyTo   = $mail['reply_to'] ?? $fromEmail;
        $ccEmail   = $mail['cc_email'] ?? '';
        $bccEmail  = $mail['bcc_email'] ?? '';
        $subject   = $mail['subject'] ?? 'Website Inquiry';
        $htmlBody  = $mail['html_body'] ?? '';
        $textBody  = $mail['text_body'] ?? strip_tags($htmlBody);
        $attachments = $mail['attachments'] ?? [];

        if (empty($toEmail)) {
            return ['success' => false, 'error' => 'Recipient email is required'];
        }

        $hostPrefix = ($this->secure === 'ssl') ? 'ssl://' : 'tcp://';
        $connectHost = $hostPrefix . $this->host;

        $this->log("Connecting to {$connectHost}:{$this->port}...");
        
        $context = stream_context_create([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true,
            ]
        ]);

        $this->socket = @stream_socket_client(
            "{$connectHost}:{$this->port}",
            $errno,
            $errstr,
            $this->timeout,
            STREAM_CLIENT_CONNECT,
            $context
        );

        if (!$this->socket) {
            $err = "Connection failed: $errstr ($errno)";
            $this->log($err);
            return ['success' => false, 'error' => $err, 'logs' => $this->debugLog];
        }

        stream_set_timeout($this->socket, $this->timeout);
        $greeting = $this->getResponse();
        if (substr($greeting, 0, 3) !== '220') {
            fclose($this->socket);
            return ['success' => false, 'error' => 'Invalid server greeting: ' . $greeting, 'logs' => $this->debugLog];
        }

        $clientHost = !empty($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'localhost';
        if (!$this->sendCommand("EHLO $clientHost", 250)) {
            if (!$this->sendCommand("HELO $clientHost", 250)) {
                fclose($this->socket);
                return ['success' => false, 'error' => 'EHLO/HELO failed', 'logs' => $this->debugLog];
            }
        }

        // STARTTLS upgrade if requested
        if ($this->secure === 'tls') {
            if ($this->sendCommand("STARTTLS", 220)) {
                $crypto_method = STREAM_CRYPTO_METHOD_TLS_CLIENT;
                if (defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')) {
                    $crypto_method |= STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
                }
                if (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT')) {
                    $crypto_method |= STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
                }
                
                $secured = stream_socket_enable_crypto($this->socket, true, $crypto_method);
                if (!$secured) {
                    fclose($this->socket);
                    return ['success' => false, 'error' => 'STARTTLS cryptographic negotiation failed', 'logs' => $this->debugLog];
                }
                // Re-send EHLO after TLS handshake
                $this->sendCommand("EHLO $clientHost", 250);
            }
        }

        // Authenticate
        if ($this->auth && !empty($this->username)) {
            if (!$this->sendCommand("AUTH LOGIN", 334)) {
                fclose($this->socket);
                return ['success' => false, 'error' => 'AUTH LOGIN not accepted', 'logs' => $this->debugLog];
            }
            if (!$this->sendCommand(base64_encode($this->username), 334)) {
                fclose($this->socket);
                return ['success' => false, 'error' => 'Username rejected by SMTP server', 'logs' => $this->debugLog];
            }
            if (!$this->sendCommand(base64_encode($this->password), 235)) {
                fclose($this->socket);
                return ['success' => false, 'error' => 'Password rejected / SMTP authentication failed', 'logs' => $this->debugLog];
            }
        }

        // MAIL FROM
        if (!$this->sendCommand("MAIL FROM:<$fromEmail>", 250)) {
            fclose($this->socket);
            return ['success' => false, 'error' => "MAIL FROM <$fromEmail> rejected", 'logs' => $this->debugLog];
        }

        // RCPT TO (Primary)
        $recipients = array_map('trim', explode(',', $toEmail));
        foreach ($recipients as $rcpt) {
            if (!empty($rcpt)) {
                if (!$this->sendCommand("RCPT TO:<$rcpt>", [250, 251])) {
                    fclose($this->socket);
                    return ['success' => false, 'error' => "RCPT TO <$rcpt> rejected", 'logs' => $this->debugLog];
                }
            }
        }

        // RCPT TO (CC)
        if (!empty($ccEmail)) {
            $ccList = array_map('trim', explode(',', $ccEmail));
            foreach ($ccList as $rcpt) {
                if (!empty($rcpt)) {
                    $this->sendCommand("RCPT TO:<$rcpt>", [250, 251]);
                }
            }
        }

        // RCPT TO (BCC)
        if (!empty($bccEmail)) {
            $bccList = array_map('trim', explode(',', $bccEmail));
            foreach ($bccList as $rcpt) {
                if (!empty($rcpt)) {
                    $this->sendCommand("RCPT TO:<$rcpt>", [250, 251]);
                }
            }
        }

        // DATA
        if (!$this->sendCommand("DATA", 354)) {
            fclose($this->socket);
            return ['success' => false, 'error' => 'DATA command rejected', 'logs' => $this->debugLog];
        }

        // Build MIME message
        $boundaryMixed = "----=_Part_Mixed_" . md5(uniqid(time()));
        $boundaryAlt   = "----=_Part_Alt_" . md5(uniqid(time() + 1));

        $headers = [];
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Date: " . date('r');
        $headers[] = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <$fromEmail>";
        $headers[] = "To: " . (!empty($toName) ? "=?UTF-8?B?" . base64_encode($toName) . "?= <$toEmail>" : "<$toEmail>");
        if (!empty($replyTo)) {
            $headers[] = "Reply-To: <$replyTo>";
        }
        if (!empty($ccEmail)) {
            $headers[] = "Cc: <$ccEmail>";
        }
        $headers[] = "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=";
        $headers[] = "X-Mailer: AsmatullahBrothers-Mailer-v2.0";

        $messageBody = "";

        if (empty($attachments)) {
            // Multipart / Alternative (HTML + Plain)
            $headers[] = "Content-Type: multipart/alternative; boundary=\"$boundaryAlt\"";
            $messageBody .= "--$boundaryAlt\r\n";
            $messageBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
            $messageBody .= "Content-Transfer-Encoding: base64\r\n\r\n";
            $messageBody .= chunk_split(base64_encode($textBody)) . "\r\n";

            $messageBody .= "--$boundaryAlt\r\n";
            $messageBody .= "Content-Type: text/html; charset=UTF-8\r\n";
            $messageBody .= "Content-Transfer-Encoding: base64\r\n\r\n";
            $messageBody .= chunk_split(base64_encode($htmlBody)) . "\r\n";
            $messageBody .= "--$boundaryAlt--\r\n";
        } else {
            // Multipart / Mixed (With Attachments)
            $headers[] = "Content-Type: multipart/mixed; boundary=\"$boundaryMixed\"";
            $messageBody .= "--$boundaryMixed\r\n";
            $messageBody .= "Content-Type: multipart/alternative; boundary=\"$boundaryAlt\"";
            $messageBody .= "\r\n\r\n";

            $messageBody .= "--$boundaryAlt\r\n";
            $messageBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
            $messageBody .= "Content-Transfer-Encoding: base64\r\n\r\n";
            $messageBody .= chunk_split(base64_encode($textBody)) . "\r\n";

            $messageBody .= "--$boundaryAlt\r\n";
            $messageBody .= "Content-Type: text/html; charset=UTF-8\r\n";
            $messageBody .= "Content-Transfer-Encoding: base64\r\n\r\n";
            $messageBody .= chunk_split(base64_encode($htmlBody)) . "\r\n";
            $messageBody .= "--$boundaryAlt--\r\n";

            // Add attachments
            foreach ($attachments as $att) {
                if (file_exists($att['path'])) {
                    $attContent = file_get_contents($att['path']);
                    $attName    = $att['name'] ?? basename($att['path']);
                    $attType    = $att['type'] ?? 'application/octet-stream';

                    $messageBody .= "--$boundaryMixed\r\n";
                    $messageBody .= "Content-Type: $attType; name=\"$attName\"\r\n";
                    $messageBody .= "Content-Disposition: attachment; filename=\"$attName\"\r\n";
                    $messageBody .= "Content-Transfer-Encoding: base64\r\n\r\n";
                    $messageBody .= chunk_split(base64_encode($attContent)) . "\r\n";
                }
            }
            $messageBody .= "--$boundaryMixed--\r\n";
        }

        $fullPayload = implode("\r\n", $headers) . "\r\n\r\n" . $messageBody . "\r\n.";

        if (!$this->sendCommand($fullPayload, 250)) {
            fclose($this->socket);
            return ['success' => false, 'error' => 'Message data transmission rejected by SMTP server', 'logs' => $this->debugLog];
        }

        $this->sendCommand("QUIT", 221);
        fclose($this->socket);

        return ['success' => true, 'message' => 'Email sent successfully via SMTP', 'logs' => $this->debugLog];
    }
}
