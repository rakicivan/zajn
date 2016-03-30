<?php
require_once 'twig_core.php';
$template = $twig->loadTemplate("login.twig");




echo $template->render(array(
    "messages" => array()
));