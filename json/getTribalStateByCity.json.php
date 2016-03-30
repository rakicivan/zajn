<?php
include "../classes/tribalState.class.php";
include_once '../classes/app.class.php';

$tribalStateObject = new TribalState();
$appObject = new App();
$city = filter_input(INPUT_POST,"city",FILTER_SANITIZE_NUMBER_INT);

$array = $tribalStateObject->getTribalStateByCity($city);
$result = $appObject->convertArray($array,array("id","text"),array("tribal_state_ID","name"));

header("Content-type:application/json");
echo json_encode($result);

