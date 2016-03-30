<?php
include_once '../classes/college.class.php';
include_once '../classes/app.class.php';
$college  = filter_input(INPUT_POST,"college",FILTER_SANITIZE_NUMBER_INT);

$collegeObject = new College();
$appObject = new App();
$array = $collegeObject->getTypeStudy($college);
$result = $appObject->convertArray($array,array("id","text"),array("type_of_study_ID","name"));

header("Content-type:application/json");
echo json_encode($result);

