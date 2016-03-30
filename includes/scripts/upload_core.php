<?php
$idx = $_POST["data"];
$rand = rand(100,9999);
$rand2 = rand(1,90);
$uploaddir = 'UploadedStuff/Scripts'; 

////////////////
$exttest = basename($_FILES['uploadfile']['name']);
$oldname = basename($_FILES['uploadfile']['name']);

$parts=explode(".",$exttest);
$ext = $parts[count($parts)-1];
///////////////////
$fullxx = $rand.'-'.$rand2.md5(rand(10000,100000));
$full = $rand.'-'.$rand2.md5(rand(10000,100000)).'.'.$ext;
$file = $uploaddir.$full;


if (move_uploaded_file($_FILES['uploadfile']['tmp_name'], $file)) { 
  //echo "Image has been successfuly uploaded!"; 
} else {

}

$size = filesize($file);

$size = $size/1024;



?>
