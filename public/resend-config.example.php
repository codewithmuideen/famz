<?php
/**
 * Copy this file to resend-config.php (same folder) and fill in your real
 * values. resend-config.php is gitignored on purpose — it holds a secret
 * API key and must never be committed or pushed to GitHub.
 */

define('RESEND_API_KEY', 'your_resend_api_key_here');

// Must be an address on a domain you've verified in Resend (Domains -> Add Domain).
define('RESEND_FROM', 'Dieux Website <no-reply@dieux.co.uk>');

// Where admin notifications are sent.
define('CONTACT_ADMIN_EMAIL', 'Info@dieux.co.uk');
