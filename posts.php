<?php
session_start();

include_once 'classes/base.class.php';
include_once 'classes/post.class.php';

$baseObject = new Base();
$postObject = new Post();

$user_id = $_SESSION['ses_user_signed_in'];

$json_msg = "";

// sprema novi post i vraća podatke
$post_submit  = filter_input(INPUT_POST,"post_submit",FILTER_SANITIZE_STRING);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['post_submit'])){
    $json_msg = "";
    $post_textarea = filter_input(INPUT_POST,"post_textarea",FILTER_SANITIZE_STRING);

    $json_msg = $baseObject->query("INSERT","INSERT INTO `posts` (`text`, `author`, `time`) VALUES ('{$post_textarea}', '{$user_id}', NOW())");

    if(is_int($json_msg)){

        $json_msg = $baseObject->query("", "SELECT users.name AS author_name, users.surname AS author_surname, users.profile_picture AS user_avatar, post_ID, text, time, likes FROM `posts` JOIN users on users.user_ID = posts.author WHERE post_ID = '{$json_msg}'");

        for($i = 0;$i < count($json_msg); $i++){

            $json_msg[$i]['post_ID'] = $baseObject->encrypt($json_msg[$i]['post_ID']);
        }
    }
}

$get_comments  = filter_input(INPUT_POST,"get_comments",FILTER_SANITIZE_STRING);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['get_comments'])){
    
        $json_msg = "";
	$post_id_crypted = filter_input(INPUT_POST,"id",FILTER_SANITIZE_STRING);
        $post_id = $baseObject->decrypt($post_id_crypted);
	$json_msg = $baseObject->query("", "SELECT comments.*, users.name AS author_name, users.surname AS author_surname, users.profile_picture AS user_avatar FROM `comments` JOIN users ON users.user_ID = comments.author WHERE comments.post = '".$post_id."'");

        for($i = 0;$i < count($json_msg); $i++){

            $json_msg[$i]['comment_ID'] = $baseObject->encrypt($json_msg[$i]['comment_ID']);
        }
}

$comment_submit  = filter_input(INPUT_POST,"comment_submit",FILTER_SANITIZE_STRING);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['comment_submit'])){

    $json_msg = "";
    $comment_textarea = filter_input(INPUT_POST,"comment_textarea",FILTER_SANITIZE_STRING);

    $post_id_crypted = filter_input(INPUT_POST,"id",FILTER_SANITIZE_STRING);
    $post_id = $baseObject->decrypt($post_id_crypted);
    $json_msg = $baseObject->query("INSERT","INSERT INTO `comments` (`text`, `author`, `time`, `post`) VALUES ('{$comment_textarea}', '{$user_id}', NOW(), '{$post_id}')");
    
    if(is_int($json_msg)){

        $json_msg = $baseObject->query("", "SELECT users.profile_picture AS user_avatar, users.name AS author_name, users.surname AS author_surname, comment_ID, text, time, likes FROM `comments` JOIN users on users.user_ID = comments.author WHERE comment_ID = {$json_msg}");
        for($i = 0;$i < count($json_msg); $i++){

            $json_msg[$i]['comment_ID'] = $baseObject->encrypt($json_msg[$i]['comment_ID']);
        }
    }
}

// briše post
$del_post  = filter_input(INPUT_POST,"del_post",FILTER_SANITIZE_STRING);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['del_post'])){
    $json_msg = "";
    $post_id_crypted = filter_input(INPUT_POST,"id",FILTER_SANITIZE_STRING);
    $post_id = $baseObject->decrypt($post_id_crypted);
    $json_msg = $baseObject->query("DEL", "DELETE FROM `posts` WHERE `posts`.`post_ID` = '".$post_id."'");
}

// briše komentar
$del_comm  = filter_input(INPUT_POST,"del_comm",FILTER_SANITIZE_STRING);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['del_comm'])){
    $json_msg = "";
    $comm_id_crypted = filter_input(INPUT_POST,"id",FILTER_SANITIZE_STRING);
    $comm_id = $baseObject->decrypt($comm_id_crypted);
    $json_msg = $baseObject->query("DEL", "DELETE FROM `comments` WHERE `comments`.`comment_ID` = '".$comm_id."'");
}

// load more posts
$load_more  = filter_input(INPUT_POST,"load_more",FILTER_SANITIZE_STRING);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['load_more'])){
    $json_msg = "";
    $limit = filter_input(INPUT_POST,"page_l",FILTER_SANITIZE_STRING);
    $offset = filter_input(INPUT_POST,"page_of",FILTER_SANITIZE_STRING);

    $json_msg = $postObject->get_wall_posts($user_id, $limit, $offset);
}
header("Content-type:application/json");
echo json_encode($json_msg);

//$city  = filter_input(INPUT_POST,"city",FILTER_SANITIZE_STRING);