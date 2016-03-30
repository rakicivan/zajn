<?php
session_start();
$adding_id = filter_input(INPUT_POST,"id");
$user_id = $_SESSION["ses_user_signed_in"];
$add = filter_input(INPUT_POST,"add");

include_once '../classes/user.class.php';

$userObject = new User();
if($add == 1) {$result = $userObject->acceptFriendRequest($adding_id,$user_id);}
else if($add == 0) {$result = $userObject->declineFriendRequest($adding_id,$user_id);}

header("Content-type:application/json");
echo json_encode($result);

