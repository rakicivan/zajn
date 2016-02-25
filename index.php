<?php
session_start();
require_once 'twig_core.php';
include_once 'classes/base.class.php';
include_once 'classes/post.class.php';
include_once 'classes/profile.class.php';
include_once 'classes/friends.class.php';

$template = $twig->loadTemplate("index.twig");

if(empty($_SESSION['ses_user_signed_in'])) {header('Location: login.php');}

$baseObject = new Base();
$postObject = new Post();
$profileObject = new Profile();
$friendsObject = new Friends();

$user_id = $_SESSION['ses_user_signed_in'];
$limit = 10;
$offset = 0;
$pumk_limit = 5;  //peple you may know limit
echo $template->render(array(
    "title"=>"pocetna", 
    "session"=>$_SESSION,
    "debug_cookie"=> $baseObject->debug_cookie('ivra_cookie'),
    "get_wall_posts"=>$postObject->get_wall_posts($user_id, $limit, $offset),
    "get_user_info"=>$profileObject->get_user_info($user_id),
    "get_ppl_u_may_know"=>$friendsObject->get_ppl_u_may_know($user_id, $pumk_limit, $offset)
));
