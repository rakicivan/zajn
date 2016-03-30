<?php
session_start();

include_once '../classes/base.class.php';

$baseObject = new Base();

$user_id = intval($baseObject->decrypt($_SESSION['ses_user_signed_in']));

$json_msg = "";

// dodavanje frenda
$add_user  = filter_input(INPUT_POST,"add_user",FILTER_SANITIZE_STRING);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['add_user'])){
    
    $json_msg = "";
    $add_user_id = filter_input(INPUT_POST,"add_user_id",FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $add_user_id = intval($baseObject->decrypt($add_user_id));
    
    $check = $baseObject->query("", "SELECT * FROM `friends` WHERE owner = '$user_id' AND friend = '$add_user_id' OR owner = '$add_user_id' AND friend = '$user_id'");
    if(empty($check)){
        $json_msg = $baseObject->query("INSERT","INSERT INTO `friends` (`owner`, `friend`, `time`,`pending`) VALUES ('$user_id','$add_user_id', NOW(),1)");

        if(is_int($json_msg)){

            $json_msg = 1;
        }
    } else {
        $json_msg = 0;
    }
}

// brisanje frenda
$dell_user  = filter_input(INPUT_POST,"dell_user",FILTER_SANITIZE_STRING);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['dell_user'])){
    
    $json_msg = "";
    $dell_user_id = filter_input(INPUT_POST,"dell_user_id",FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $dell_user_id = intval($baseObject->decrypt($dell_user_id));
    
    $check = $baseObject->query("", "SELECT * FROM `friends` WHERE owner = '$user_id' AND friend = '$dell_user_id' OR owner = '$dell_user_id' AND friend = '$user_id'");
    if(!empty($check)){
        $data = $baseObject->query("DEL","DELETE FROM `friends` WHERE (`friends`.`owner` = '$user_id' AND `friends`.`friend` = '$dell_user_id') OR (`friends`.`owner` = '$dell_user_id' AND `friends`.`friend` = '$user_id')");
        
        if(is_int($data)){
            
            $json_msg = $data;
        }
    } else {
        
        // check failed
        $json_msg = 2;
    }
}

header("Content-type:application/json");
echo json_encode($json_msg);
