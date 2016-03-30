<?php

include "../classes/tribalState.class.php";

$tribalStateObject = new TribalState();
$tribal_state = filter_input(INPUT_POST,"tribal_state",FILTER_SANITIZE_NUMBER_INT);

$postal_code = $tribalStateObject->getTribalStateCode($tribal_state);

header("Content-type:application/json");
echo json_encode($postal_code);