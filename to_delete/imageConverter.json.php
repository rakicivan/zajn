<?php

function base64_to_png($base64_string, $output_file){
//    $ifp = fopen($output_file, "wb");
//    $data = explode(",",$base64_string);
//    
//    fwrite($ifp, base64_decode($data[1]));
//    fclose($ifp);
       $data = explode(",",$base64_string);
       $decoded_string = base64_decode($data[1]);
       file_put_contents($output_file,$decoded_string);
}

$base64_string = $_POST["encoded"];
$output_file = $_POST["filename"];

base64_to_png($base64_string, $output_file);

header("Content-type:application/json");
echo json_encode(1);