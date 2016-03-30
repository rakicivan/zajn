<?php
if(isset($_GET["id"])){
    include_once 'classes/base.class.php';
$baseObject = new Base();
echo $baseObject->encrypt($_GET['id']);
}

$value = " Ana                Marija ";

print_r($value);
?>
