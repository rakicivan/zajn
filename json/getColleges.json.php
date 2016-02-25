<?php
include_once '../classes/register.class.php';
$city  = filter_input(INPUT_POST,"city",FILTER_SANITIZE_NUMBER_INT);
$university = filter_input(INPUT_POST,"university",FILTER_SANITIZE_NUMBER_INT);

$registerObject = new Register();
$result = $registerObject->getColleges($city, $university);

header("Content-type:application/json");
echo json_encode($result);