<?php
session_start();
require_once 'twig_core.php';
include_once 'classes/base.class.php';

$baseObject = new Base();

$template = $twig->loadTemplate("404.twig");

echo $template->render(array(
    "base_url"=> $baseObject->getBaseUrl()
));