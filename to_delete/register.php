<?php
require_once 'twig_core.php';
session_start();
include_once 'classes/validation.class.php';
include_once 'classes/city.class.php';
include_once 'classes/user.class.php';
include_once 'classes/app.class.php';


$messages = array();
$validationObject = new Validation();
$cityObject = new City();
$userObject = new User();
$appObject = new App();

if(!empty($_POST))
{
    $registration_type = filter_input(INPUT_POST,"register_type");
    if($registration_type == "1"){require 'register.student.php';}
    else{require 'register.company.php';}
}

$cities = $cityObject->getCities();

$template = $twig->loadTemplate("registration.twig");

echo $template->render(array(
    "cities" => $cities,
    "universities" => array(),
    "colleges" => array(),
    "study_types" => array(),
    "subjects" => array(),
    "years" => array(),
    "dorms" => array(),
    "messages" => $messages
));
?>

        

