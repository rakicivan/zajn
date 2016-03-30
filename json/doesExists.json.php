<?php
include_once '../classes/validation.class.php';
$table = filter_input(INPUT_POST,"table",FILTER_SANITIZE_STRING);
$column = filter_input(INPUT_POST,"column",FILTER_SANITIZE_STRING);
$value = filter_input(INPUT_POST,"value");

$validationObject = new Validation();
$result = $validationObject->doesExists($table, $column, $value);

header("Content-type:application/json");
echo json_encode($result);
