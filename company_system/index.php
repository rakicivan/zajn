<?php
require_once 'twig_core.php';

$template = $twig->loadTemplate("index.twig");
echo $template->render(array());

