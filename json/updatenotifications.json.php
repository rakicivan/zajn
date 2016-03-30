<?php
session_start();
$user_id = $_SESSION["ses_user_signed_in"];

include_once '../classes/base.class.php';

$baseObject = new Base();
$notification_ID = filter_input(INPUT_POST,"data");
$notification_ID = $baseObject->decrypt($notification_ID);
$user_id = $baseObject->decrypt($user_id);
$query = "UPDATE `notifications` SET `seen` = '1' WHERE `notification_ID` <= '{$notification_ID}' AND `seen` = '0' AND `owner` = '{$user_id}'";        
$result = $baseObject->query("UPDATE", $query);
