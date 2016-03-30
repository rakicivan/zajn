<?php //
session_start();

include_once '../classes/base.class.php';
include_once '../classes/post.class.php';

$baseObject = new Base();
$postObject = new Post();

$json_msg = "";

// sprema novi post i vraća podatke
$post_submit  = filter_input(INPUT_POST,"post_submit",FILTER_SANITIZE_STRING);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['post_submit'])){
    $user_id = $baseObject->decrypt($_SESSION['ses_user_signed_in']);
    
    $result = $baseObject->query('', 'SELECT `time` FROM `posts` WHERE `author` = \''.$user_id.'\' ORDER BY `post_ID` DESC LIMIT 1');

    if(count($result) <= 0 || strtotime($result[0]['time']) < (time()-5)) {
        $json_msg = "";
        $post_textarea = filter_input(INPUT_POST,"post_textarea",FILTER_SANITIZE_FULL_SPECIAL_CHARS);

        $json_msg = $baseObject->query("INSERT","INSERT INTO `posts` (`text`, `author`, `time`) VALUES ('{$post_textarea}', '{$user_id}', NOW())");

        if(is_int($json_msg)){

            $json_msg = $baseObject->query("", "SELECT users.name AS author_name, users.surname AS author_surname, users.profile_picture AS user_avatar, post_ID, text, time, likes FROM `posts` JOIN users on users.user_ID = posts.author WHERE post_ID = '{$json_msg}'");

            for($i = 0;$i < count($json_msg); $i++){
                
                $numb_of_comms = $baseObject->query("", "SELECT count(*) AS count FROM `comments` WHERE comments.post =".$json_msg[$i]['post_ID']);
                $json_msg[$i]['numb_of_comms'] = $numb_of_comms[0]['count'];
                
                $json_msg[$i]['post_ID'] = $baseObject->encrypt($json_msg[$i]['post_ID']);
                $json_msg[$i]['user_ID'] = $baseObject->encrypt($user_id);
            }
        }
    }
    else {
        $json_msg = -1;
    }
}

// dohvati komentare
$get_comments  = filter_input(INPUT_POST,"get_comments",FILTER_SANITIZE_STRING);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['get_comments'])){
    
        $json_msg = "";
    $post_id_crypted = filter_input(INPUT_POST,"id",FILTER_SANITIZE_SPECIAL_CHARS);
        $post_id = $baseObject->decrypt($post_id_crypted);
    $json_msg = $baseObject->query("", "SELECT comments.*, users.name AS author_name, users.user_ID, users.surname AS author_surname, users.profile_picture AS user_avatar FROM `comments` JOIN users ON users.user_ID = comments.author WHERE comments.post = '".$post_id."'");

        for($i = 0;$i < count($json_msg); $i++){
            
            $json_msg[$i]['user_ID'] = $baseObject->encrypt($json_msg[$i]['user_ID']);
            $json_msg[$i]['comment_ID'] = $baseObject->encrypt($json_msg[$i]['comment_ID']);
        }
}

// spremi kontar
$comment_submit  = filter_input(INPUT_POST,"comment_submit",FILTER_SANITIZE_STRING);
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['comment_submit'])){
    $user_id = $baseObject->decrypt($_SESSION['ses_user_signed_in']);
    $post_id_crypted = filter_input(INPUT_POST,"id",FILTER_SANITIZE_STRING);
    $post_id = $baseObject->decrypt($post_id_crypted); 

    $result = $baseObject->query('', 'SELECT `time` FROM `comments` WHERE `author` = \''.$user_id.'\' AND `post` = \''.$post_id.'\' ORDER BY `comment_ID` DESC LIMIT 1');

    if(count($result) <= 0 || strtotime($result[0]['time']) < (time()-5)) {
        $json_msg = "";
        $comment_textarea = filter_input(INPUT_POST,"comment_textarea",FILTER_SANITIZE_SPECIAL_CHARS);

        $author_id = filter_input(INPUT_POST,"author_id",FILTER_SANITIZE_STRING);

        $author_id = $baseObject->decrypt($author_id);

        $json_msg = $baseObject->query("INSERT","INSERT INTO `comments` (`text`, `author`, `time`, `post`) VALUES ('{$comment_textarea}', '{$user_id}', NOW(), '{$post_id}')");
        
        if(is_int($json_msg)){
            //$user_id = $baseObject->decrypt($user_id);

            if($user_id != $author_id) {
                $baseObject->query("INSERT","INSERT INTO `notifications` (`owner`, `sender`, `link_target`, `received_at`,  `seen`, `notification_type`) VALUES ('{$author_id}', '{$user_id}', '{$json_msg}', NOW(), '0', '0')");    
            }

            $json_msg = $baseObject->query("", "SELECT users.profile_picture AS user_avatar, users.name AS author_name, users.surname AS author_surname, comment_ID, text, time, likes FROM `comments` JOIN users on users.user_ID = comments.author WHERE comment_ID = {$json_msg}");

            for($i = 0;$i < count($json_msg); $i++){

                $json_msg[$i]['comment_ID'] = $baseObject->encrypt($json_msg[$i]['comment_ID']);
            }
        }
    }
    else {
        $json_msg = -1;
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

    if(isset($_POST['profile_ID'])) {
        $ProfileID = filter_input(INPUT_POST,"profile_ID",FILTER_SANITIZE_STRING);
        $json_msg = $postObject->get_profile_posts($ProfileID, $limit, $offset);
    }
    else 
        $json_msg = $postObject->get_wall_posts($_SESSION['ses_user_signed_in'], $limit, $offset);
}
header("Content-type:application/json");
echo json_encode($json_msg);