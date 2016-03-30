<?php
include_once '../classes/college.class.php';
include_once '../classes/app.class.php';
$college  = filter_input(INPUT_POST,"college",FILTER_SANITIZE_NUMBER_INT);
$type = filter_input(INPUT_POST,"type",FILTER_SANITIZE_NUMBER_INT);

$collegeObject = new College();
$appObject = new App();
$array = $collegeObject->getSubjects($college, $type);
$result = $appObject->convertArray($array,array("id","text","years"),array("subject_ID","name","max_years"));

header("Content-type:application/json");
echo json_encode($result);

