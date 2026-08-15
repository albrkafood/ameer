<?php
/**
 * Asmatullah & Brothers Construction Co. - Dynamic SMTP Email Dispatcher
 * Handles Tender Submissions, RFQ Inquiries, and General Contact Messages.
 */

// Allow CORS for API calls
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['status' => 'ok']);
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed. POST is required.']);
    exit;
}

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/smtp-client.php';

// Parse incoming payload (supports both JSON and multipart/form-data)
$inputData = [];
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

if (strpos($contentType, 'application/json') !== false) {
    $rawInput = file_get_contents('php://input');
    $inputData = json_decode($rawInput, true) ?: [];
} else {
    $inputData = $_POST;
}

// Extract and sanitize fields
$name            = htmlspecialchars(trim($inputData['name'] ?? ''));
$organization    = htmlspecialchars(trim($inputData['organization'] ?? ''));
$phone           = htmlspecialchars(trim($inputData['phone'] ?? ''));
$email           = filter_var(trim($inputData['email'] ?? ''), FILTER_VALIDATE_EMAIL) ? trim($inputData['email']) : '';
$projectLocation = htmlspecialchars(trim($inputData['projectLocation'] ?? $inputData['location'] ?? ''));
$inquiryType     = htmlspecialchars(trim($inputData['inquiryType'] ?? $inputData['subject'] ?? 'General Inquiry'));
$estimatedBudget = htmlspecialchars(trim($inputData['estimatedBudget'] ?? $inputData['budget'] ?? ''));
$details         = htmlspecialchars(trim($inputData['details'] ?? $inputData['message'] ?? ''));
$source          = htmlspecialchars(trim($inputData['source'] ?? 'Website Portal'));

// Validation
if (empty($name)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Full Name / Representative Name is required.']);
    exit;
}

if (empty($phone) && empty($email)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please provide at least a Phone Number or an Email Address so our engineering team can contact you.']);
    exit;
}

if (empty($details)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please include project specifications, BOQ details, or message inquiry.']);
    exit;
}

// Generate Unique Inquiry Reference Number
$refNumber = 'ABCC-' . date('Y') . '-' . strtoupper(substr(uniqid(), -5));
$submissionTime = date('d-M-Y H:i:s T');

// Handle File Uploads (Drawings, BOQ, RFP Specs)
$attachments = [];
if (!empty($_FILES['attachment']) && is_array($_FILES['attachment']['name'])) {
    // Multiple files
    for ($i = 0; $i < count($_FILES['attachment']['name']); $i++) {
        if ($_FILES['attachment']['error'][$i] === UPLOAD_ERR_OK) {
            $attachments[] = [
                'path' => $_FILES['attachment']['tmp_name'][$i],
                'name' => $_FILES['attachment']['name'][$i],
                'type' => $_FILES['attachment']['type'][$i] ?? 'application/octet-stream',
            ];
        }
    }
} elseif (!empty($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
    $attachments[] = [
        'path' => $_FILES['attachment']['tmp_name'],
        'name' => $_FILES['attachment']['name'],
        'type' => $_FILES['attachment']['type'] ?? 'application/octet-stream',
    ];
}

// Load SMTP Configuration
$config = getMailConfig();

// Format HTML Email for Company Management / Engineering Department
$emailSubject = "[{$refNumber}] {$inquiryType} - {$name}" . ($organization ? " ({$organization})" : "");

$htmlBody = "
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; color: #1e293b; margin: 0; padding: 20px; }
  .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-top: 6px solid #f59e0b; border-bottom: 4px solid #0f172a; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
  .header { background: #0f172a; color: #ffffff; padding: 24px; text-align: left; }
  .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #f59e0b; }
  .header p { margin: 0; font-size: 12px; color: #cbd5e1; font-weight: 600; text-transform: uppercase; }
  .ref-badge { display: inline-block; background: #f59e0b; color: #0f172a; font-weight: 900; font-size: 11px; padding: 3px 8px; margin-top: 8px; text-transform: uppercase; }
  .content { padding: 24px; }
  .section-title { font-size: 13px; font-weight: 800; text-transform: uppercase; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 18px; margin-bottom: 12px; }
  .data-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
  .data-table td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
  .data-table td.label { font-weight: 700; color: #64748b; width: 32%; background-color: #f8fafc; text-transform: uppercase; font-size: 11px; }
  .data-table td.value { font-weight: 600; color: #0f172a; }
  .message-box { background-color: #f8fafc; border-left: 4px solid #f59e0b; padding: 14px; font-size: 13px; line-height: 1.6; color: #334155; white-space: pre-wrap; font-family: inherit; }
  .footer { background: #f8fafc; padding: 16px 24px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center; }
</style>
</head>
<body>
<div class='container'>
  <div class='header'>
    <h1>Asmatullah & Brothers Construction Co.</h1>
    <p>PEC Category C1 Certified Contractors | Highway, Bridge & Society Infrastructure</p>
    <div class='ref-badge'>Inquiry Ref: {$refNumber}</div>
  </div>
  
  <div class='content'>
    <div class='section-title'>Client & Procurement Details</div>
    <table class='data-table'>
      <tr>
        <td class='label'>Client / Officer Name:</td>
        <td class='value'><strong>{$name}</strong></td>
      </tr>
      <tr>
        <td class='label'>Department / Company:</td>
        <td class='value'>" . ($organization ?: 'Individual / Private Client') . "</td>
      </tr>
      <tr>
        <td class='label'>Contact Phone:</td>
        <td class='value'><a href='tel:{$phone}' style='color: #d97706; font-weight: bold;'>{$phone}</a></td>
      </tr>
      <tr>
        <td class='label'>Email Address:</td>
        <td class='value'>" . ($email ? "<a href='mailto:{$email}'>{$email}</a>" : 'Not Provided') . "</td>
      </tr>
      <tr>
        <td class='label'>Inquiry Category:</td>
        <td class='value'><strong>{$inquiryType}</strong></td>
      </tr>
      <tr>
        <td class='label'>Project Location / Site:</td>
        <td class='value'>" . ($projectLocation ?: 'Not Specified') . "</td>
      </tr>
      <tr>
        <td class='label'>Estimated Budget:</td>
        <td class='value'>" . ($estimatedBudget ?: 'To be estimated / BOQ based') . "</td>
      </tr>
      <tr>
        <td class='label'>Submission Time:</td>
        <td class='value'>{$submissionTime}</td>
      </tr>
      <tr>
        <td class='label'>Source:</td>
        <td class='value'>{$source}</td>
      </tr>
    </table>

    <div class='section-title'>Project Scope / Specs / Requirements</div>
    <div class='message-box'>" . nl2br($details) . "</div>
  </div>

  <div class='footer'>
    This message was sent automatically from the Asmatullah & Brothers Construction Co. website portal.<br>
    Please contact the client promptly within business hours.
  </div>
</div>
</body>
</html>
";

$textBody = "ASMATULLAH & BROTHERS CONSTRUCTION CO. - NEW INQUIRY\n"
          . "Reference: {$refNumber}\n"
          . "--------------------------------------------------------\n"
          . "Client Name: {$name}\n"
          . "Organization/Dept: {$organization}\n"
          . "Phone: {$phone}\n"
          . "Email: {$email}\n"
          . "Category: {$inquiryType}\n"
          . "Location: {$projectLocation}\n"
          . "Estimated Budget: {$estimatedBudget}\n"
          . "Time: {$submissionTime}\n\n"
          . "PROJECT REQUIREMENTS / DETAILS:\n"
          . "{$details}\n\n"
          . "--------------------------------------------------------\n";

// Initialize SMTP Client
$mailer = new SimpleSmtpMailer($config);

// Send to Company Admin / Engineering Department
$sendResult = $mailer->send([
    'from_email'  => $config['from_email'],
    'from_name'   => $config['from_name'],
    'to_email'    => $config['to_email'],
    'reply_to'    => $email ?: $config['from_email'],
    'cc_email'    => $config['cc_email'],
    'bcc_email'   => $config['bcc_email'],
    'subject'     => $emailSubject,
    'html_body'   => $htmlBody,
    'text_body'   => $textBody,
    'attachments' => $attachments,
]);

// If SMTP failed, attempt fallback to native PHP mail() if available
if (!$sendResult['success']) {
    $nativeHeaders = "MIME-Version: 1.0\r\n";
    $nativeHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";
    $nativeHeaders .= "From: {$config['from_name']} <{$config['from_email']}>\r\n";
    if ($email) {
        $nativeHeaders .= "Reply-To: <{$email}>\r\n";
    }

    $fallbackSent = @mail($config['to_email'], $emailSubject, $htmlBody, $nativeHeaders);
    if ($fallbackSent) {
        $sendResult['success'] = true;
        $sendResult['message'] = 'Sent via server mail agent fallback';
    }
}

// Send Automatic Acknowledgment / Confirmation to Customer if valid email was provided
if ($sendResult['success'] && !empty($email) && $config['autoreply']) {
    $autoReplySubject = "Inquiry Received [Ref: {$refNumber}] - Asmatullah & Brothers Construction";
    $autoReplyHtml = "
    <!DOCTYPE html>
    <html>
    <head><meta charset='utf-8'></head>
    <body style='font-family: Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px;'>
      <div style='max-width: 600px; margin: 0 auto; background: #ffffff; border-top: 5px solid #f59e0b; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 24px;'>
        <h2 style='color: #0f172a; margin-top: 0;'>Thank you for contacting Asmatullah & Brothers</h2>
        <p>Dear <strong>{$name}</strong>,</p>
        <p>We have successfully received your inquiry regarding <strong>{$inquiryType}</strong> (Reference: <strong>{$refNumber}</strong>).</p>
        <p>Our senior civil engineering and estimating department is currently reviewing your project details. A technical representative will get in touch with you shortly via phone or email.</p>
        
        <div style='background: #f1f5f9; padding: 14px; border-left: 4px solid #f59e0b; margin: 20px 0;'>
          <p style='margin: 0; font-size: 13px;'><strong>Inquiry Reference:</strong> {$refNumber}</p>
          <p style='margin: 4px 0 0 0; font-size: 13px;'><strong>Category:</strong> {$inquiryType}</p>
          <p style='margin: 4px 0 0 0; font-size: 13px;'><strong>Submitted On:</strong> {$submissionTime}</p>
        </div>

        <p style='font-size: 13px;'>For urgent procurement assistance or site inspection schedules, please reach our executive lines:</p>
        <ul style='font-size: 13px; color: #334155;'>
          <li><strong>Direct Line:</strong> +92 300 9008985</li>
          <li><strong>Chief Engineer:</strong> +92 345 9444154</li>
          <li><strong>Email:</strong> info@asmatullahbrothers.com</li>
        </ul>

        <p style='font-size: 12px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 12px;'>
          Asmatullah & Brothers Construction Co. | PEC Category C1 Licensed Contractors
        </p>
      </div>
    </body>
    </html>";

    $customerMailer = new SimpleSmtpMailer($config);
    $customerMailer->send([
        'from_email' => $config['from_email'],
        'from_name'  => $config['from_name'],
        'to_email'   => $email,
        'subject'    => $autoReplySubject,
        'html_body'  => $autoReplyHtml,
        'text_body'  => "Dear {$name},\n\nWe have received your inquiry (Ref: {$refNumber}). Our engineering team will contact you shortly.\n\nDirect Line: +92 300 9008985\nAsmatullah & Brothers Construction Co.",
    ]);
}

if ($sendResult['success']) {
    http_response_code(200);
    echo json_encode([
        'success'   => true,
        'message'   => 'Your inquiry has been successfully transmitted to our engineering team.',
        'reference' => $refNumber,
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'Failed to deliver email through SMTP server: ' . ($sendResult['error'] ?? 'Unknown network error'),
        'details' => $sendResult['error'] ?? '',
    ]);
}
