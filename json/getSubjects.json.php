<?php
include_once '../classes/register.class.php';
$college  = filter_input(INPUT_POST,"college",FILTER_SANITIZE_NUMBER_INT);
$type = filter_input(INPUT_POST,"type",FILTER_SANITIZE_NUMBER_INT);

$registerObject = new Register();
$result = $registerObject->getSubjects($college, $type);

header("Content-type:application/json");
echo json_encode($result);

