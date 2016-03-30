<?php
session_start();
require_once 'twig_core.php';
include_once 'classes/validation.class.php';
include_once 'classes/city.class.php';
include_once 'classes/user.class.php';
include_once 'classes/app.class.php';
include_once 'classes/company.class.php';

include_once 'classes/base.class.php';
include_once 'classes/login.class.php';

if (isset($_SESSION['signed_in'])) header("Location:index.php");

$messages = array();
$loginMessage = "";
$validationObject = new Validation();
$cityObject = new City();
$userObject = new User();
$appObject = new App();
$baseObject = new Base();

$baseObject->set_cookie("ivra_check","some value",2000000);

if(isset($_COOKIE["ivra_check"])){$loginMessage = "Cookies up!";}
else {$loginMessage = "Cookies down! :(";}

if(!empty($_POST))
{
    $isRegistration = filter_input(INPUT_POST,"isRegistration",FILTER_SANITIZE_STRING);
    if($isRegistration == "1"){include_once 'register.php';}
    else if($isRegistration == "0"){include_once 'login.php';}
    else {echo "UNKNOWN parameter";}
}
$cities = $cityObject->getCities();
$template = $twig->loadTemplate("entry.users.twig");

echo $template->render(array(
    "base_url" => $baseObject->getBaseUrl(),
    "cities" => $cities,
    "universities" => array(),
    "colleges" => array(),
    "study_types" => array(),
    "subjects" => array(),
    "years" => array(),
    "dorms" => array(),
    "messages" => $messages,
    "login_message" => $loginMessage
));
