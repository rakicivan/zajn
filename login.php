<?php
include_once 'classes/validation.class.php';

$validationObject = new Validation();

$login_submit = filter_input(INPUT_POST,"login_submit",FILTER_SANITIZE_STRING);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $login_submit == ""){

	$username = filter_input(INPUT_POST,"username",FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST,"password",FILTER_SANITIZE_STRING);
		
        $query = "";
        if($validationObject->phoneNumber($username,true)==""){
            $query = "SELECT user_ID, email, role FROM users WHERE mobile_number='{$username}' AND password='{$password}'";
        }
        else{
            $query = "SELECT user_ID, email, role FROM users WHERE email='{$username}' AND password='{$password}'";
        }
        $login_data = $baseObject->query("",$query);

	if (count($login_data) != 0) {
            
		$_SESSION['signed_in'] = 1;
		$_SESSION['ses_user_signed_in'] = $baseObject->encrypt($login_data[0]['user_ID']);
		$_SESSION['ses_user_role'] = $login_data[0]['role'];
		
		if (isset($_POST['remember_user'])) $baseObject->set_cookie("ivra_cookie", $login_data[0]['email'], "86400 * 30");

	$login_data = $baseObject->query("UPDATE","UPDATE users SET login_time=now() WHERE email = '{$login_data[0]['email']}'");
	
	header("Location:naslovna");
	} else {
		
		$loginMessage = "Greška kod logiranja.";
	}

}

?>
