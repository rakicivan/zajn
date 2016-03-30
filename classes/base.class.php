<?php

class Base
{
    const host = "localhost";
    //const user = "ivrahr_snet";
    const user = "root";
    const database = "ivrahr_studentsnetwork";
    //const password = "SO(PINqM1psJ";
    const password = "";
    private $connection;
    private $last_id;
    
    private function connect()
    {
        $this->connection = mysqli_connect(self::host,self::user,self::password,self::database);
        $this->connection->set_charset("utf8");
    }

    private function displayError()
    {
        echo mysqli_error($this->connection);
    }
    
    private function disconnect()
    {
        mysqli_close($this->connection);   
    }
    
    // $command služi za provjeru da li je update ili ne da se za sad riješimo onog errora
    // dodajte "UPDATE"/"INSERT" samo kod UPDATE/INSERT query-a, za ostale može ostati samo ""
    // npr. $baseObject->query("UPDATE", "UPDATE....")
    // ili $baseObject->query("", "SELECT....");
    public function query($command, $query)
    {
        $this->connect();
        $result = $this->connection->query($query);
        $this->last_id = mysqli_insert_id($this->connection);
        $aff_rows = $this->connection->affected_rows;
        echo $this->displayError();
        $this->disconnect();
        if($command == "UPDATE" || $command == "INSERT" || $command == "DEL"){
            if($result == 1){
               if($command == "INSERT") {return $this->last_id;}
               else {return $result;}
       // if($command == "UPDATE" || $command == "INSERT"){
       //     if($result == "true"){
       //         return $this->last_id;
       //     }else{
       //         return $result;
            }
        }
        elseif ($command == "DEL") {
            return $aff_rows;
        }
        else return $this->getResults($result);
    }
    
    public function getResults($results)
    {
        $array = array();
    
        while($rows = $results->fetch_assoc())
        {
            array_push($array,$rows);   
        }       
        return $array;
    }

    public function check_cookie(){

        setcookie("ivra_cookie_test","test", time() + 500);

        if(!isset($_COOKIE['ivra_cookie_test']))
            return false;
        else
            return true;
    }

    public function set_cookie($name, $data, $time){

        setcookie($name, $data, time() + ($time),"","", true, true);        
    }

    public function unset_cookie($name){

        setcookie($name, "", time() - 3600);
    }

    public function debug_cookie($name){

        if(Base::check_cookie() && isset($_COOKIE[$name])) {
            return "</br>Debug cookie name: ". $name .", value: ".$_COOKIE[$name];
        }
        else{
            return "</br>Debug cookie name: ". $name ." doesn't exist.";
        }
    }

    public function encrypt($data){

        $key = pack("H*", "bcb04b7e103a0cd8b54763051cef08bc55abe029faebae5e1d417e2ffb2a00a3");
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_ECB);
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
        $crypt_text = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $data, MCRYPT_MODE_ECB, $iv);
//        $crypttext = pack("h" ,$crypt_text);
        return bin2hex($crypt_text);
    }
    
    public function decrypt($data){
        
//        echo "<br>strlen(id): ".strlen($data)."; desired lenght 32!";
        if(strlen($data) === 0 || strlen($data) < 32){
            return 0;
        }else{
            $crypted_data = hex2bin($data);
            $key = pack("H*", "bcb04b7e103a0cd8b54763051cef08bc55abe029faebae5e1d417e2ffb2a00a3");
            $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_ECB);
            $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
            $decrypttext = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $crypted_data, MCRYPT_MODE_ECB, $iv);
            return $decrypttext;
        }
    }
    public function getBaseUrl($withoutURL = false) 
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
}
