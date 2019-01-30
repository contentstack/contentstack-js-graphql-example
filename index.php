
<?php
if (!isset($_SERVER['PHP_AUTH_USER']) && !isset($_SERVER['PHP_AUTH_PW'])) {
header("WWW-Authenticate: Basic realm=\"Please enter your username and password to proceed further\"");
header("HTTP/1.0 401 Unauthorized");
print "Oops! It require login to proceed further. Please enter your login detail\n";
exit;
} else {
if ($_SERVER['PHP_AUTH_USER'] == 'admin' && $_SERVER['PHP_AUTH_PW'] == 'admin@123') {
header( 'Location: ./app.js' );
exit;
} else {
header("WWW-Authenticate: Basic realm=\"Please enter your username and password to proceed further\"");
header("HTTP/1.0 401 Unauthorized");
print "Oops! It require login to proceed further. Please enter your login detail\n";
exit;
}
}
