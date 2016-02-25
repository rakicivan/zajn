<?php
include_once '../classes/register.class.php';
$city  = filter_input(INPUT_POST,"city",FILTER_SANITIZE_NUMBER_INT);

$registerObject = new Register();
$result = $registerObject->getDorms($city);

header("Content-type:application/json");
echo json_encode($result);

