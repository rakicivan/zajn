<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
?>
<html>
    <head>
        <title>JAVASCRIPT upload</title>
        <meta charset="utf-8" />
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="../css/bootstrap.min.css"/>
        <link rel="stylesheet" href="files/bootstrap_upload/css/fileinput.min.css" />
        <link rel="stylesheet" href="files/Croppie-2.0.1/croppie.css" />
        <style>
            .file-drop-zone{
                height:50%;
            }
        </style>
    </head>
    <body>
        <div id="content">
            <div id="profile">
                <div id="profile header">
                    <div id="profile_image">
                        <img alt="profile" src="#" style="height:100px;width:100px" />
                        <div style="display:none;margin-left:-110px;margin-top:20px;vertical-align: bottom;"><button id="btn_uploadInit">Change image</button></div>
                    </div>
                    <div id="profile_name">
                        <span>Ime i prezime</span>
                    </div>
                </div>
            </div>
        </div>
        <div id="popup_container" style="display:none;z-index: 1000;width:100%;height:100%;background-color: rgba(0,0,0,0.8);position:absolute;top:0%;left:0%;">
            <div id="popup" style="background-color: white;border-radius: 7px;width:500px; height:500px;position: absolute;top:10%;left:30%;">
                <div>
                    <h3 style="display: inline-block">Image upload</h3>
                    <span id="popup_close" class="glyphicon glyphicon-remove" style="padding:5px;font-size: large;"></span>
                </div>
                <hr/>
                <div id="popup_content">
                  
                    <div id="popup_uploadSection">
                        <input id="uploader" type="file" class="file" data-preview-file-type="text"/>
                    </div>
                    <div id="popup_crop">
                        <button class="basic-result">Izreži</button>
                    </div>
                    <div style="display: none;" id="popup_display">
                        <h3>Je li ovo uredu?</h3>
                        <div>
                            <img  id="uploadedImage" src="#" alt="#" />
                        </div>
                        <div>
                            <button>Spremi</button>
                            <button>Poništi i ponovni pokušaj</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <script src="../js/jquery-2.2.0.min.js"></script>
        <script src="../js/bootstrap.min.js"></script>
        <script src="files/bootstrap_upload/js/fileinput.min.js"></script>
        <script src="files/bootstrap_upload/js/fileinput_locale_uk.js"></script>
        <script src="files/Croppie-2.0.1/croppie.min.js"></script>
        <script src="test_upload.js"></script>
    </body>
</html>
