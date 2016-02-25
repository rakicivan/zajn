<?php
include_once 'classes/base.class.php';
include_once 'classes/login.class.php';

session_start();
if (isset($_SESSION['signed_in'])) header("Location:index.php");

$message = "";
$baseObject = new Base();

$login_submit = filter_input(INPUT_POST,"login_submit",FILTER_SANITIZE_STRING);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $post_submit == ""){

	$username = filter_input(INPUT_POST,"username",FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST,"password",FILTER_SANITIZE_STRING);
		
	$login_data = $baseObject->query("","SELECT user_ID, email, role FROM users WHERE email='{$username}' AND password='{$password}'");

	if (count($login_data) != 0) {

		$_SESSION['signed_in'] = 1;
		$_SESSION['ses_user_signed_in'] = $login_data[0]['user_ID'];
		$_SESSION['ses_user_role'] = $login_data[0]['role'];
		
		if (isset($_POST['remember_user'])) $baseObject->set_cookie("ivra_cookie", $login_data[0]['email'], "86400 * 30");

	$login_data = $baseObject->query("UPDATE","UPDATE users SET login_time=now() WHERE email = '{$login_data[0]['email']}'");
	
	header("Location: index.php");
	} else {
		
		$message = "Gre�ka kod logiranja.";
	}

}

//Base::unset_cookie("ivra_cookie");

$remember = "";
if(isset($_COOKIE['ivra_cookie'])) $remember = $_COOKIE['ivra_cookie'];

?>

<!DOCTYPE html>
<html>
	<head>

	    <title>Prijava</title>
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/base.css">
        <script src="js/bootstrap.min.js"></script>
	    <meta property="Title" content="Prijava">
	    <meta charset="UTF-8">
        <style>
            body, html{
                margin:0;
                padding:0;
                height: 100%;
                width: 100%;
            }
            body{
                background: url('page_imgs/bg.jpg') no-repeat center center fixed;
            }
        </style>
	</head>
	<body>
        <div class="login_page">
        <div class="login_form">
        <img class="formLogo" src="page_imgs/mini_logo_v2_2.png" alt="logo">
		<form method="POST" action="login.php" name="login">
                    <div>
                        <input type="radio" name="login_type" checked="checked" /> <b>Student</b>
                        <input type="radio" name="login_type" /> <b>Tvrtka</b>
                    </div>
                    <hr class="formLine"/>
                    <div class="formInput"><label for="username"></label><input type="text" class="loginBox" id="username" name="username" placeholder="E-mail ili broj mobitela" autofocus="autofocus" required="" value="<?php echo $remember ?>">
		            <label for="password"></label><input type="password" class="loginBox" id="password" name="password" placeholder="Lozinka" required=""/><br/>
		            <label for="remember">Zapamti me</label>&nbsp;<input type="checkbox" name="remember_user" <?php if(!Base::check_cookie()) echo 'disabled="disabled"'; ?> /> <br />
		            <button type="submit" class="btn btn-primary btn-lg active" name="login_submit">Prijava</button>
                    </div>
		</form>

	    <!--Registriraj se <a href="register.php">ovdje</a>-->
	    <div><?php echo $message."</br>";  
	    			//print_r($_SESSION);
	    			$baseObject->debug_cookie('ivra_cookie'); ?></div>

      </div>
      </div>
	</body>
</html>