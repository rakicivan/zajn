<?php
include_once '../classes/university.class.php';
include_once '../classes/app.class.php';
$city  = filter_input(INPUT_POST,"city",FILTER_SANITIZE_NUMBER_INT);

$universityObject = new University();
$appObject = new App();
$result = $appObject->convertArray($universityObject->getUniversities($city),array("id","text"),array("university_ID","name"));

header("Content-type:application/json");
echo json_encode($result);