<?php
include_once 'app.class.php';
class City
{
    private $appObject;
    
    public function __construct() {
        $this->appObject = new App();
    }
    
    public function getCities()
    {
        return $this->appObject->convertArray($this->appObject->getValues("select * from cities"),array("id","text"),array("city_ID","name"));
    }
}

