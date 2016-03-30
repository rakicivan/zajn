<?php
session_start();
$friend_id = filter_input(INPUT_POST,"id");
$user_id = $_SESSION["ses_user_signed_in"];

include_once '../classes/user.class.php';

$userObject = new User();
$result = $userObject->removeFriendship($user_id,$friend_id);

header("Content-type:application/json");
echo json_encode($result);

