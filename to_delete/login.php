<?php
include_once 'classes/base.class.php';
include_once 'classes/login.class.php';
include_once 'twig_core.php';

session_start();
if (isset($_SESSION['signed_in'])) header("Location:index.php");

$message = "";
$baseObject = new Base();

$login_submit = filter_input(INPUT_POST,"login_submit",FILTER_SANITIZE_STRING);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $login_submit == ""){

	$username = filter_input(INPUT_POST,"username",FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST,"password",FILTER_SANITIZE_STRING);
		
	$login_data = $baseObject->query("","SELECT user_ID, email, role FROM users WHERE email='{$username}' AND password='{$password}'");

	if (count($login_data) != 0) {

		$_SESSION['signed_in'] = 1;
		$_SESSION['ses_user_signed_in'] = $baseObject->encrypt($login_data[0]['user_ID']);
		$_SESSION['ses_user_role'] = $login_data[0]['role'];
		
		if (isset($_POST['remember_user'])) $baseObject->set_cookie("ivra_cookie", $login_data[0]['email'], "86400 * 30");

	$login_data = $baseObject->query("UPDATE","UPDATE users SET login_time=now() WHERE email = '{$login_data[0]['email']}'");
	
	header("Location: ".$baseObject->getBaseUrl());
	} else {
		
		$message = "Greška kod logiranja.";
	}

}

//Base::unset_cookie("ivra_cookie");

$remember = "";
if(isset($_COOKIE['ivra_cookie'])) $remember = $_COOKIE['ivra_cookie'];

$template = $twig->loadTemplate("login.twig");
echo $template->render(array(
    "remember" => $remember,
    "check_cookie" => $baseObject->check_cookie(),
    "ivra_cookie" => $baseObject->debug_cookie("ivra_cookie"),
    "login_message" => $message
));

?>
