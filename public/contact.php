<?php
/**
 * Contact form handler for the Dieux website — sends via Resend's API
 * (https://resend.com), not PHP's built-in mail(), because mail() is
 * unreliable on shared hosting (silently drops or spam-filters messages
 * while still reporting "success").
 *
 * Sends two emails per submission:
 *   1. Admin notification -> CONTACT_ADMIN_EMAIL, with Reply-To set to the
 *      visitor so you can just hit reply.
 *   2. Confirmation -> the visitor's own email, so they know it went through.
 *
 * Real API key lives in resend-config.php (gitignored, never committed).
 * See resend-config.example.php for the template.
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

$configFile = __DIR__ . '/resend-config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Email is not configured on the server yet.']);
    exit;
}
require $configFile;

if (!defined('RESEND_API_KEY') || RESEND_API_KEY === '' || RESEND_API_KEY === 'REPLACE_WITH_REAL_RESEND_API_KEY') {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Email is not configured on the server yet.']);
    exit;
}

function clean_field($value) {
    $value = trim((string) ($value ?? ''));
    return str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], '', $value);
}

/** Sends one email via the Resend API. Returns true on success. */
function send_via_resend($payload) {
    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . RESEND_API_KEY,
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_TIMEOUT => 15,
    ]);
    $response = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($curlError) {
        error_log('Resend request failed: ' . $curlError);
        return false;
    }
    if ($status < 200 || $status >= 300) {
        error_log('Resend API error (' . $status . '): ' . $response);
        return false;
    }
    return true;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

// Honeypot: a hidden field real visitors never fill in.
if (!empty($data['website'] ?? '')) {
    echo json_encode(['success' => true]);
    exit;
}

$firstName = clean_field($data['firstName'] ?? '');
$lastName  = clean_field($data['lastName'] ?? '');
$email     = clean_field($data['email'] ?? '');
$phone     = clean_field($data['phone'] ?? '');
$company   = clean_field($data['company'] ?? '');
$subject   = clean_field($data['subject'] ?? '');
$message   = trim((string) ($data['message'] ?? ''));

$errors = [];
if ($firstName === '') $errors[] = 'First name is required.';
if ($lastName === '') $errors[] = 'Last name is required.';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'A valid email is required.';
if ($subject === '') $errors[] = 'Subject is required.';
if (strlen($message) < 20) $errors[] = 'Message must be at least 20 characters.';

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

$fullName = "$firstName $lastName";
$nl = "\n";
$htmlEscaped = fn($v) => htmlspecialchars($v, ENT_QUOTES, 'UTF-8');

// --- 1. Admin notification ---
$adminText = "New contact form submission from the website$nl$nl"
    . "Name: $fullName$nl"
    . "Email: $email$nl"
    . "Phone: " . ($phone !== '' ? $phone : 'Not provided') . "$nl"
    . "Company: " . ($company !== '' ? $company : 'Not provided') . "$nl"
    . "Subject: $subject$nl$nl"
    . "Message:$nl$message$nl";

$adminSent = send_via_resend([
    'from' => RESEND_FROM,
    'to' => [CONTACT_ADMIN_EMAIL],
    'reply_to' => $email,
    'subject' => "New website enquiry: $subject",
    'text' => $adminText,
]);

if (!$adminSent) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Could not send your message right now. Please try again or email us directly.']);
    exit;
}

// --- 2. Confirmation to the person who submitted the form ---
$confirmHtml = '<p>Hi ' . $htmlEscaped($firstName) . ',</p>'
    . '<p>Thanks for getting in touch with Dieux Accounting &amp; Advisory. '
    . "We've received your message and a member of our team will get back to you shortly.</p>"
    . '<p><strong>Your message:</strong><br>' . nl2br($htmlEscaped($message)) . '</p>'
    . '<p>Best regards,<br>Dieux Accounting &amp; Advisory</p>';

send_via_resend([
    'from' => RESEND_FROM,
    'to' => [$email],
    'subject' => 'We\'ve received your message',
    'html' => $confirmHtml,
]);
// Confirmation email failing isn't fatal to the user's submission — the
// admin notification above already succeeded, so we still report success.

echo json_encode(['success' => true]);
