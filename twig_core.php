<?php

require './twig_core/vendor/twig/twig/lib/Twig/Autoloader.php';

Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem('twig_files/templates');

$twig = new Twig_Environment($loader,array(
 // "cache" => "twig_files/compilation_cache", 
      "cache" => false, 

));

?>
