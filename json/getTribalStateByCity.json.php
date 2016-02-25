<?php
include "../classes/register.class.php";

$registerObject = new Register();
$city = filter_input(INPUT_POST,"city",FILTER_SANITIZE_NUMBER_INT);

$result = $registerObject->getTribalStateByCity($city);

header("Content-type:application/json");
echo json_encode($result);

