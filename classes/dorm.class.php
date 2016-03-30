<?php
include_once 'app.class.php';

class Dorm{
    
    private $appObject;
    
    public function __construct() {
        $this->appObject = new App();
    }
    
    public function getDorms($city)
    {
        return $this->appObject->getValues("select * from dorms where city = {$city}");
    }
    
}
