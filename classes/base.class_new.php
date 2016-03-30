<?php
/***
 * Better understanding of PDO class: http://php.net/manual/en/class.pdo.php
 */
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
        try {
            $this->connection = new PDO("mysql:host=".self::host.";dbname=".self::database.";charset=utf8",  self::user, self::password);
        } catch (Exception $exc) {
            $this->logError($exc);     
        }        
    }

    private function logError($exc)
    {
        $output = date("=> H:i:s d.m.Y.",time())."\n";
        if(!is_string($exc)){$output .= "=> Error at line ".$exc->getLine().", file: ".$exc->getFile()."\n=> Error: ".$exc->getMessage()."";}
        else{$output .= $exc."\n";}
        $output .= "--------------------------------------------------------\n";
        file_put_contents("db_error_log.txt",$output,FILE_APPEND|FILE_TEXT);
        echo "Error occured";
    }
    
    public function getPDO()
    {
        return $this->connection;
    }
        
    private function disconnect()
    {
        unset($this->connection);
        $this->connection = null;
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
        echo $this->displayError();
        $this->disconnect();
        if($command == "UPDATE" || $command == "INSERT" || $command == "DEL"){
            if($result == "true"){
                return $this->last_id;
            }else{
                return $result;
            }
        }
        else return $this->getResults($result);
    }
    
    /***
     * $param
     */
    public function selectQuery($parameters)
    {
        $this->prevalidateParams($parameters);         
        $output = "SELECT ";
        if(isset($parameters["columnnames"])){$output .= $this->prepareColumnNames($parameters["columnnames"]);}
        else {$output .= $this->prepareColumnNames();}        
        $output .= " FROM ";        
        if(!isset($parameters["tablenames"])){$this->logError("base.class.php > selectQuery() ||-> exception: Parameter 'tablenames' MUST be defined"); return;}
        else{$output .= $this->prepareTableNames($parameters["tablenames"]);}
        $output .= $this->prepareOptionalArguments("conditions", $parameters,"WHERE");
        $output .= $this->prepareOptionalArguments("groupby", $parameters, "GROUP BY");
        
        if(isset($parameters["groupby"])){
            $output .= " GROUP BY ";
            $output .= $parameters["groupby"];
        }
        
        return $output;
    }
    
    private function prevalidateParams($parameters)
    {
        if(!is_array($parameters)){$this->logError("base.class.php > selectQuery() ||-> exception: This function MUST have parameter of type: array."); return;}
        else if(empty($parameters)){$this->logError("base.class.php > selectQuery() ||-> exception: This function MUST have parameter 'tablenames' to work properly."); return;}
    }
    
    private function prepareColumnNames($columns = null)
    {
        $output = "";
        if(!isset($columns)){$output = "*";}
        else if(is_array($columns)){$output = $this->convertArrayToString($columns,",");}
        else if(is_string($columns)){$output = $columns;}
        else {$this->logError("base.class.php > selectQuery() ||-> exception: invalid type of 'columnnames', choose array or string"); return;}
        return $output;   
    }

    private function prepareTableNames($tables)
    {
        $output = "";
        if(is_array($tables)){$output .= $this->convertArrayToString($tables,",");}
        else if(is_string($tables)){$output .= $tables;}
        else {$this->logError("base.class.php > selectQuery() ||-> exception: invalid type of 'tablenames', choose array or string"); return;}
        return $output;
    }
    
    private function prepareOptionalArguments($param_name,$parameters, $key_word)
    {
        $output = "";
        if(isset($parameters[$param_name])){
            $output .= " {$key_word} ";
            $output .= $parameters[$param_name];
        }
        return $output;
    }
    
    private function convertArrayToString($array, $delimiter)
    {
        $output = "";
        for($i = 0; $i < count($array); $i++)
        {
            $output .= $array[$i];
            if($i != count($array)-1){$output .= $delimiter;}
        }
        return $output;
    }
    
    public function getResults($results)
    {
        $array = array();
    
        while($rows = $results->fetch_array())
        {
            array_push($array,$rows);   
        }       
        return $array;
    }

    public function check_cookie(){

        setcookie("ivra_cookie_test","test", time() + 5);

        if(!isset($_COOKIE['ivra_cookie_test']))
            return false;
        else
            return true;
    }

    public function set_cookie($name, $data, $time){

        setcookie($name, $data, time() + ($time));
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
        $crypttext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $data, MCRYPT_MODE_ECB, $iv);
        return base64_encode($crypttext);
    }
    
    public function decrypt($data){
        $data = base64_decode($data);
        $key = pack("H*", "bcb04b7e103a0cd8b54763051cef08bc55abe029faebae5e1d417e2ffb2a00a3");
        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_ECB);
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
        $decrypttext = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $data, MCRYPT_MODE_ECB, $iv);
        return $decrypttext;
    }
}

class CustomQueryBuilder{
    public function __construct() {
        return $this;
    }
    
    public function select($params){
        return new SelectQueryBuilder();
    }
    
    public function delete($params){
        return new DeleteQueryBuilder();
    }
    
    public function update($params){
        return new UpdateQueryBuilder();
    }
}

class SelectQueryBuilder{
    public function from($param){
        return $this;
    }
    
    public function where($param){
        return $this;
    }
    
    public function groupBy($param){
        return $this;
    }
}

class DeleteQueryBuilder{
    public function from($param){
        return $this;
    }
    
    public function where($param){
        return $this;
    }
}

class UpdateQueryBuilder{
    public function set($param){
        return new UpdateWhereBuilder();
    }
       
}

class UpdateWhereBuilder{
    public function where($param){
        return $this;
    }
}