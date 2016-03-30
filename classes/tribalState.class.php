<?php
include_once 'base.class.php';

class TribalState{
    
    private $baseObject;
    
    public function __construct() {
        $this->baseObject = new Base();
    }
    
    public function getTribalStateCode($tribal_state)
    {
        $result = $this->baseObject->query("SELECT","select postal_code from tribal_states where tribal_state_ID = {$tribal_state}");
        return $result[0]["postal_code"];
    }

    public function getTribalStateByCity($city)
    {
        return $this->baseObject->query("SELECT","select tribal_states.* from tribal_states join cities on cities.tribal_state = tribal_states.tribal_state_ID and cities.city_ID = {$city}");
    }
    
}

