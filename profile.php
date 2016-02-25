<?php
session_start();
require_once 'twig_core.php';
include_once 'classes/base.class.php';
include_once 'classes/post.class.php';
include_once 'classes/profile.class.php';

$template = $twig->loadTemplate("profile.twig");

$baseObject = new Base();
$postObject = new Post();
$profileObject = new Profile();

$user_id = $_SESSION['ses_user_signed_in'];
$data = $baseObject->query("","select * from users where user_ID = ".$user_id);
echo $template->render(array(
    "title"=>"profile", 
    "session"=>$_SESSION,
    "debug_cookie"=> $baseObject->debug_cookie('ivra_cookie'),
    "get_posts"=>$postObject->get_posts($_SESSION['ses_user_signed_in']),
    "user_info"=>$profileObject->get_user_info($_SESSION['ses_user_signed_in'])
));













/*$template = $twig->loadTemplate("index.twig");

echo $template->render(array());*/