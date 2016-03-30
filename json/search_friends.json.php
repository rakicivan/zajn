<?php
session_start();

include_once '../classes/base.class.php';

$baseObject = new Base();

$user_id = intval($baseObject->decrypt($_SESSION['ses_user_signed_in']));

$json_msg = "";

// dodavanje frenda
$search_user  = filter_input(INPUT_POST,"search_user",FILTER_SANITIZE_STRING);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['search_user'])){
    
    $json_msg = "";
    $search_user_input = filter_input(INPUT_POST,"search_user_input",FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    
    $data = $baseObject->query("", "SELECT users.user_ID, users.name, users.surname, users.profile_picture FROM users WHERE CONCAT(users.name, ' ', users.surname) LIKE '%$search_user_input%' LIMIT 5");
    for($i = 0;$i < count($data); $i++){
            
        $data[$i]['user_ID'] = $baseObject->encrypt($data[$i]['user_ID']);
    }
    $json_msg = $data;
}

header("Content-type:application/json");
echo json_encode($json_msg);