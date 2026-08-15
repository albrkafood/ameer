<?php
/**
 * DirectAdmin SMTP Configuration Diagnostics & Self-Test Script
 * Visit: https://yourdomain.com/api/test-smtp.php
 */

header("Content-Type: text/html; charset=UTF-8");

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/smtp-client.php';

$config = getMailConfig();
$testResult = null;
$logs = [];

if (isset($_POST['run_test'])) {
    $toTestEmail = filter_var(trim($_POST['test_email'] ?? $config['to_email']), FILTER_VALIDATE_EMAIL) ?: $config['to_email'];

    $testMailer = new SimpleSmtpMailer($config);
    $testResult = $testMailer->send([
        'from_email' => $config['from_email'],
        'from_name'  => $config['from_name'] . ' [Diagnostics]',
        'to_email'   => $toTestEmail,
        'subject'    => "SMTP Verification Test - " . date('Y-m-d H:i:s'),
        'html_body'  => "<h3>SMTP Test Successful</h3><p>Your DirectAdmin SMTP mail configuration is active and working properly.</p><p>Time: " . date('r') . "</p>",
        'text_body'  => "SMTP Test Successful. Configuration is working properly. Time: " . date('r'),
    ]);
    $logs = $testMailer->getLogs();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DirectAdmin SMTP Test | Asmatullah & Brothers</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
        .card { max-width: 760px; margin: 0 auto; background: #1e293b; border: 2px solid #334155; border-radius: 8px; padding: 24px; }
        h1 { color: #f59e0b; margin-top: 0; font-size: 22px; text-transform: uppercase; }
        .config-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .config-table td { padding: 8px 12px; border-bottom: 1px solid #334155; font-size: 13px; }
        .config-table td.key { color: #94a3b8; font-weight: bold; width: 35%; }
        .config-table td.val { color: #38bdf8; font-family: monospace; }
        .btn { background: #f59e0b; color: #0f172a; border: none; padding: 10px 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; border-radius: 4px; }
        .btn:hover { background: #d97706; }
        .input { width: 100%; max-width: 320px; padding: 8px 12px; background: #0f172a; border: 1px solid #475569; color: #fff; border-radius: 4px; margin-right: 8px; }
        .alert { padding: 14px; border-radius: 4px; margin: 16px 0; font-size: 14px; }
        .alert-success { background: #065f46; color: #a7f3d0; border: 1px solid #059669; }
        .alert-error { background: #7f1d1d; color: #fecaca; border: 1px solid #b91c1c; }
        .logs { background: #020617; border: 1px solid #334155; padding: 14px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #a3e635; max-height: 250px; overflow-y: auto; white-space: pre-wrap; }
    </style>
</head>
<body>
    <div class="card">
        <h1>🛠️ DirectAdmin SMTP Configuration Diagnostics</h1>
        <p style="font-size: 13px; color: #94a3b8;">
            This tool tests the connection between your PHP server and your SMTP mail server.
        </p>

        <h3>Current Loaded Configuration</h3>
        <table class="config-table">
            <tr>
                <td class="key">SMTP Host:</td>
                <td class="val"><?php echo htmlspecialchars($config['host']); ?></td>
            </tr>
            <tr>
                <td class="key">SMTP Port:</td>
                <td class="val"><?php echo htmlspecialchars($config['port']); ?></td>
            </tr>
            <tr>
                <td class="key">Encryption (Secure):</td>
                <td class="val"><?php echo htmlspecialchars($config['secure']); ?></td>
            </tr>
            <tr>
                <td class="key">Authentication:</td>
                <td class="val"><?php echo $config['auth'] ? 'TRUE' : 'FALSE'; ?></td>
            </tr>
            <tr>
                <td class="key">Username:</td>
                <td class="val"><?php echo htmlspecialchars($config['username'] ?: '(Not Set)'); ?></td>
            </tr>
            <tr>
                <td class="key">Password:</td>
                <td class="val"><?php echo !empty($config['password']) ? '•••••••••••• (' . strlen($config['password']) . ' chars)' : '<span style="color:#ef4444">(Not Set)</span>'; ?></td>
            </tr>
            <tr>
                <td class="key">From Email:</td>
                <td class="val"><?php echo htmlspecialchars($config['from_email']); ?></td>
            </tr>
            <tr>
                <td class="key">To Email (Primary):</td>
                <td class="val"><?php echo htmlspecialchars($config['to_email']); ?></td>
            </tr>
        </table>

        <?php if ($testResult !== null): ?>
            <?php if ($testResult['success']): ?>
                <div class="alert alert-success">
                    <strong>✅ Success!</strong> SMTP connection established and test email delivered to <u><?php echo htmlspecialchars($_POST['test_email'] ?? $config['to_email']); ?></u>.
                </div>
            <?php else: ?>
                <div class="alert alert-error">
                    <strong>❌ SMTP Error:</strong> <?php echo htmlspecialchars($testResult['error']); ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($logs)): ?>
                <h4>SMTP Socket Handshake Logs:</h4>
                <div class="logs"><?php echo htmlspecialchars(implode("\n", $logs)); ?></div>
            <?php endif; ?>
        <?php endif; ?>

        <form method="POST" style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #334155;">
            <p style="font-size: 13px; font-weight: bold; margin-bottom: 8px;">Send a test email to:</p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <input type="email" name="test_email" class="input" value="<?php echo htmlspecialchars($config['to_email']); ?>" required placeholder="your-email@example.com">
                <button type="submit" name="run_test" class="btn">🚀 Run Live SMTP Test</button>
            </div>
        </form>
    </div>
</body>
</html>
