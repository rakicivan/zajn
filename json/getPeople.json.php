<?php
include_once '../classes/register.class.php';
$friends = filter_input(INPUT_POST,"friends",FILTER_SANITIZE_NUMBER_INT);
$user = filter_input(INPUT_SESSION,"signed_in",FILTER_SANITIZE_NUMBER_INT);

header("Content-type:application/json");
echo json_encode($result);
