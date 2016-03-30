<?php
include_once 'app.class.php';
class University
{
    private $appObject;
    
    public function __construct() {
        $this->appObject = new App();
    }
    
    public function getUniversities($city)
    {
        $result = $this->appObject->getValues("select universities from cities where city_ID = {$city}");
        $uni_ids = $result[0]["universities"];
        return $this->appObject->getValues("select * from universities where university_ID in ({$uni_ids})");      
    }
}