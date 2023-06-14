<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    
    // Validate the form data
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo "Please fill in all the fields.";
        exit;
    }
    
    // Email parameters
    $to = "Cr3Tools@proton.me"; // Change this to your email address
    $from = $email;
    $headers = "From: $name <$from>" . "\r\n";
    
    // Compose the email body
    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Subject: $subject\n";
    $email_body .= "Message:\n$message\n";
    
    // Send the email
    if (mail($to, $subject, $email_body, $headers)) {
        echo "Thank you for your message. We will get back to you soon!";
    } else {
        echo "Sorry, an error occurred. Please try again later.";
    }
}
?>
