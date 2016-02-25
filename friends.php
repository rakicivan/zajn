<?php
session_start();
require_once 'twig_core.php';
include_once 'classes/base.class.php';

$template = $twig->loadTemplate("friends.twig");

//if(empty($_SESSION['ses_user_signed_in'])) {header('Location: login.php');}


echo $template->render(array(
    
));
