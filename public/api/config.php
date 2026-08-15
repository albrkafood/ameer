<?php
/**
 * Configuration & Environment Parser for DirectAdmin PHP Mailer
 */

function loadEnvFile($filePath) {
    if (!file_exists($filePath) || !is_readable($filePath)) {
        return false;
    }

    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || strpos($line, '#') === 0) {
            continue;
        }

        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);

            // Strip surrounding quotes if present
            if ((strpos($value, '"') === 0 && strrpos($value, '"') === strlen($value) - 1) ||
                (strpos($value, "'") === 0 && strrpos($value, "'") === strlen($value) - 1)) {
                $value = substr($value, 1, -1);
            }

            if (!isset($_ENV[$key])) {
                $_ENV[$key] = $value;
                putenv("$key=$value");
            }
        }
    }
    return true;
}

// Check possible .env locations: current dir, parent dir, or web root
$envLocations = [
    __DIR__ . '/.env',
    __DIR__ . '/../.env',
    dirname(__DIR__, 2) . '/.env',
    dirname(__DIR__, 2) . '/public_html/.env',
];

foreach ($envLocations as $location) {
    if (loadEnvFile($location)) {
        break;
    }
}

function getMailConfig() {
    return [
        'host'       => getenv('SMTP_HOST') ?: ($_ENV['SMTP_HOST'] ?? 'localhost'),
        'port'       => (int)(getenv('SMTP_PORT') ?: ($_ENV['SMTP_PORT'] ?? 587)),
        'secure'     => strtolower(getenv('SMTP_SECURE') ?: ($_ENV['SMTP_SECURE'] ?? 'tls')),
        'auth'       => filter_var(getenv('SMTP_AUTH') ?: ($_ENV['SMTP_AUTH'] ?? true), FILTER_VALIDATE_BOOLEAN),
        'username'   => getenv('SMTP_USERNAME') ?: ($_ENV['SMTP_USERNAME'] ?? ''),
        'password'   => getenv('SMTP_PASSWORD') ?: ($_ENV['SMTP_PASSWORD'] ?? ''),
        'from_email' => getenv('SMTP_FROM_EMAIL') ?: ($_ENV['SMTP_FROM_EMAIL'] ?? 'info@asmatullahbrothers.com'),
        'from_name'  => getenv('SMTP_FROM_NAME') ?: ($_ENV['SMTP_FROM_NAME'] ?? 'Asmatullah & Brothers Construction Co.'),
        'to_email'   => getenv('SMTP_TO_EMAIL') ?: ($_ENV['SMTP_TO_EMAIL'] ?? 'info@asmatullahbrothers.com'),
        'cc_email'   => getenv('SMTP_CC_EMAIL') ?: ($_ENV['SMTP_CC_EMAIL'] ?? ''),
        'bcc_email'  => getenv('SMTP_BCC_EMAIL') ?: ($_ENV['SMTP_BCC_EMAIL'] ?? ''),
        'autoreply'  => filter_var(getenv('SEND_AUTOREPLY') ?: ($_ENV['SEND_AUTOREPLY'] ?? true), FILTER_VALIDATE_BOOLEAN),
    ];
}
