<?php
/**
 * Contact form handler for the Dieux website.
 * Receives the form submission and emails it via PHP's mail() function.
 *
 * NOTE: If the contact email is ever changed through the website's admin
 * dashboard, update $to below to match — this file is separate from that
 * (it runs on the server, the admin only controls what's shown on the page).
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

$to = 'Info@dieux.co.uk';

function clean_field($value) {
    $value = trim((string) ($value ?? ''));
    // Strip anything that could be used for email header injection.
    return str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], '', $value);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

// Honeypot: a hidden field real visitors never fill in. If it has a value,
// this is almost certainly a bot — pretend success without sending anything.
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

$emailSubject = "New website enquiry: $subject";

$body  = "New contact form submission from the website\n\n";
$body .= "Name: $firstName $lastName\n";
$body .= "Email: $email\n";
$body .= "Phone: " . ($phone !== '' ? $phone : 'Not provided') . "\n";
$body .= "Company: " . ($company !== '' ? $company : 'Not provided') . "\n";
$body .= "Subject: $subject\n\n";
$body .= "Message:\n$message\n";

$host = preg_replace('/[^a-zA-Z0-9.\-]/', '', $_SERVER['HTTP_HOST'] ?? 'dieuxltd.com');

$headers = [];
$headers[] = "From: Website Contact Form <no-reply@$host>";
$headers[] = "Reply-To: $firstName $lastName <$email>";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

$sent = mail($to, $emailSubject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Could not send your message right now. Please try again or email us directly.']);
}
