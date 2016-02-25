<?php
$name = $_GET["template"];
if(isset($_GET["params"])){$params = $_GET["params"];}
else{$params = array();}

require '../twig_core/vendor/twig/twig/lib/Twig/Autoloader.php';

Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('../twig_files/templates');

$twig = new Twig_Environment($loader,array(
 // "cache" => "twig_files/compilation_cache", 
      "cache" => false, 

));

$template = $twig->loadTemplate($name);

$rendered = $template->render($params);

header("Content-type:application/json");
echo json_encode($rendered);
?>
