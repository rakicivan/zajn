<?php
session_start();
require_once 'twig_core.php';
include_once 'classes/base.class.php';
include_once 'classes/post.class.php';
include_once 'classes/profile.class.php';
include_once 'classes/friends.class.php';
include_once 'classes/user.class.php';

$template = $twig->loadTemplate("pozovi_kolege.twig");

if(empty($_SESSION['ses_user_signed_in'])) {header('Location: ulaz');}

$baseObject = new Base();
$postObject = new Post();
$profileObject = new Profile();
$friendsObject = new Friends();
$userObject = new User();

$user_id = $_SESSION['ses_user_signed_in'];
$limit = 10;
$offset = 0;
$pumk_limit = 5;  //peple you may know limit

echo $template->render(array(
    "base_url"=> $baseObject->getBaseUrl(), 
    "session"=> $_SESSION,
    "debug_cookie"=> $baseObject->debug_cookie('ivra_cookie'),
    "get_wall_posts"=>$postObject->get_wall_posts($user_id, $limit, $offset),
    "get_user_info"=>$profileObject->get_user_info($user_id),
    "get_ppl_u_may_know"=>$friendsObject->get_ppl_u_may_know($user_id, $pumk_limit, $offset),
    "friend_requests" => $userObject->getFriendRequests($user_id,5),
    "user_notifications" => $userObject->getNotifications($user_id,5),
    // Scripts system (left_bar)
    "is_admin" => $userObject->isAdmin()
));