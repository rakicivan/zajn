<?php
include_once '../classes/college.class.php';
include_once '../classes/app.class.php';
$city  = filter_input(INPUT_POST,"city",FILTER_SANITIZE_NUMBER_INT);
$university = filter_input(INPUT_POST,"university",FILTER_SANITIZE_NUMBER_INT);

$collegeObject = new College();
$appObject = new App();
$array = $collegeObject->getColleges($city, $university);
$result = $appObject->convertArray($array,array("id","text","domain"),array("college_ID","name","email_domain"));

header("Content-type:application/json");
echo json_encode($result);