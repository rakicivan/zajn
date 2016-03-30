<?php
$name = filter_input(INPUT_POST,"template",FILTER_SANITIZE_STRING);
if(isset($_POST["params"])){$params = $_POST["params"];}
else{$params["array"] = array();}


require '../twig_core/vendor/twig/twig/lib/Twig/Autoloader.php';

Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('../twig_files/templates');

$twig = new Twig_Environment($loader,array(
 // "cache" => "twig_files/compilation_cache", 
      "cache" => false, 

));

$template = $twig->loadTemplate($name);

$rendered = $template->render(array("array" => $params["array"]));

header("Content-type:application/json");
echo json_encode($rendered);
?>
