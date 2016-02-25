<?php

include "../classes/register.class.php";

$registerObject = new Register();
$tribal_state = filter_input(INPUT_POST,"tribal_state",FILTER_SANITIZE_NUMBER_INT);

$postal_code = $registerObject->getTribalStateCode($tribal_state);

header("Content-type:application/json");
echo json_encode($postal_code);