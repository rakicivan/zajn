<?php
session_start();
$user_id = $_SESSION["ses_user_signed_in"];    
include_once '../classes/user.class.php';

$userObject = new User();
$result = $userObject->getFriendRequests($user_id);

$sum = count($result["array"]);
$array = array();
for($i = 0; $i < $sum && $i < 5; $i++){
    array_push($array,$result["array"][$i]);
}


header("Content-type:application/json");
echo json_encode(array("number"=>$sum,"array" =>$array));

