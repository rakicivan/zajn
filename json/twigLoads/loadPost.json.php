<?php
function getBaseUrl($withoutURL = false) 
{
	// output: /myproject/index.php
	$currentPath = $_SERVER['PHP_SELF']; 
	
	// output: Array ( [dirname] => /myproject [basename] => index.php [extension] => php [filename] => index ) 
	$pathInfo = pathinfo($currentPath); 
	
	// output: localhost
	$hostName = $_SERVER['HTTP_HOST']; 
	
	// output: http://
    $protocol = strtolower(substr($_SERVER["SERVER_PROTOCOL"],0,5))=='https://'?'https://':'http://';
	
	// return: http://localhost/myproject/
	
    if($withoutURL) return $pathInfo['dirname'];
    else return $protocol.$hostName.$pathInfo['dirname'];
}

$name = filter_input(INPUT_POST,"template",FILTER_SANITIZE_STRING);
if(isset($_POST["params"])){$params = $_POST["params"];}
else{$params["array"] = array();}

$params['user_avatar'] = $params['user_avatar'];

require '../../twig_core/vendor/twig/twig/lib/Twig/Autoloader.php';

Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('../../twig_files/templates');

$twig = new Twig_Environment($loader,array(
      "cache" => false, 
));

$template = $twig->loadTemplate("post.twig");
$rendered = $template->render($params);

header("Content-type:application/json");
echo json_encode($rendered);
?>
