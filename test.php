<?php
// emailReminder.php

// Replace with your mail service provider's details
$smtp_host = "smtp.gmail.com";
$smtp_port = 465;//587; // Replace with appropriate port (e.g., 465 for SSL/TLS)
$username = "fostersnt@gmail.com";
$password = "lxgtcnhsqzkscupt";

// Set email recipient and subject
$to = "fostersnt@gmail.com";
$subject = "Daily Reminder: Check Your Tasks";

// Set email body
$message = "This is your daily reminder to check your tasks and stay on track.";

// Set headers for the email
$headers = "From: foster@mcini.com";

$stream = fsockopen($smtp_host, $smtp_port, $errno, $errstr, 30);

if (!$stream) {
  echo "Failed to connect to mail server: $errstr ($errno)";
  exit;
}

// Configure SMTP settings
ini_set('SMTP_Host', $smtp_host);
ini_set('SMTP_Port', $smtp_port);
ini_set('SMTP_Auth', true); // Enable SMTP authentication
ini_set('SMTP_Username', $username);
ini_set('SMTP_Password', $password);

// Enable TLS encryption after connection is established
if (stream_socket_enable_crypto($stream, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
    echo "TLS encryption enabled successfully\n";
  } else {
    echo "Failed to enable TLS encryption\n";
    exit;
  }

// Send the email
if (mail($to, $subject, $message, $headers)) {
    echo "Reminder email sent successfully!";
} else {
    echo "Failed to send reminder email.";
}
