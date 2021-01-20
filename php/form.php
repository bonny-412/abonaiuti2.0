<?php
$to = 'andrea.bonaiuti.97@gmail.com';
$subject = 'Sito personale';

$message = $_POST['message'];
$header = 'From:' + $_POST['email'];

echo('To: ' + $to + ", subject: " + $subject + ", message: " + $message + ", header: " + $header);

?>