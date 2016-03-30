<?php
session_start();
require_once 'twig_core.php';
include_once 'classes/base.class.php';
include_once 'classes/profile.class.php';
include_once 'classes/friends.class.php';
include_once 'classes/user.class.php';

$template = $twig->loadTemplate("notifications_page.twig");

if(empty($_SESSION['ses_user_signed_in'])) {header('Location: ulaz');}

$baseObject = new Base();
$profileObject = new Profile();
$friendsObject = new Friends();
$userObject = new User();

$user_id = $_SESSION['ses_user_signed_in'];
$limit = 10;
$offset = 0;
$pumk_limit = 5;  //peple you may know limit

$requests_i_sent = $userObject->getFriendRequestsISent();


$requests_for_me = $userObject->getFriendRequestForMe();


echo $template->render(array(
    "base_url"=> $baseObject->getBaseUrl(), 
    "get_user_info"=>$profileObject->get_user_info($user_id),
    "get_ppl_u_may_know"=>$friendsObject->get_ppl_u_may_know($user_id, $pumk_limit, $offset),
    
    "notifications" =>  $userObject->getNotifications_all($user_id,20),
));