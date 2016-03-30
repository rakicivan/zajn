<?php
include_once '../classes/dorm.class.php';
include_once '../classes/app.class.php';
$city  = filter_input(INPUT_POST,"city",FILTER_SANITIZE_NUMBER_INT);

$dormObject = new Dorm();
$appObject = new App();
$array = $dormObject->getDorms($city);
$result = $appObject->convertArray($array,array("id","text"),array("dorm_ID","name"));

header("Content-type:application/json");
echo json_encode($result);

