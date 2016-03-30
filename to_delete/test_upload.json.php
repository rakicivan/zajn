<?php
$file_first = $_FILES["file_data"];
$file = $_FILES["file_data"]["name"];

$file_name = date("H_i_s",time())."_".$file;

move_uploaded_file($file_first["tmp_name"],"files/uploaded_files/".$file_name);

$output = array(
    "error" => "",
    "initialPreview" => array("<img src='files/uploaded_files/".$file_name."' class='file-preview-image' alt='".$file_name."' title='".$file_name."'"),
    "initialPreviewConfig" => array(
        array(
        "caption" => $file_name,
        "width" => "100px",
        "url" => "http://localhost/zavjesa/to_delete/delete_image",
        "key" => 100,
        "extra" => array("id"=>100)
        )
        ),
    "uploaded_file_path" => "files/uploaded_files/".$file_name
);


header("Content-type:application/json");
echo json_encode($output);
?>