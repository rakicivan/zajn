<?php
include_once 'base.class.php';

class App
{
    private $baseObject;
    
    public function __construct() {
        $this->baseObject = new Base();
    }
    
    public function getValues($query)
    {
        $results = $this->baseObject->query("SELECT",$query);      
        return $results;
    }
    

    public function showMessage($value)
    {
        if(is_array($value))
        {
            foreach ($value as $message) {
                echo $message;
            }
        }
        else 
        {
            echo $value;
        }
    }
    
    /***
     * Function converts given array keys into new ones.
     * @target - array of array keys we want
     * @default - array of array keys we have
     */
    public function convertArray($array,$target,$default)
    {
        $newArray = array();
        
        /*foreach ($array as $element) {
            $newSubarray["id"] = $element[$defaultID];
            $newSubarray["text"] = $element[$defaultText];
            array_push($newArray,$newSubarray);
        
        }*/
        
        for ($i = 0; $i < count($array); $i++)
        {
            $newSubarray = array();
            for($j = 0; $j < count($default); $j++)
            {
                $newSubarray[$target[$j]] = $array[$i][$default[$j]];
            }
            array_push($newArray,$newSubarray);
        }
        
        
        return $newArray;   
    }
    
    public function trimSpacesFromName($value){
        $array = explode(" ",$value);
        $number = count($array);
        for($i = 0; $i < $number; $i++){
            if(empty($array[$i])){unset($array[$i]);}
        }
        $new_value = implode($array," ");
        return $new_value;
    }
}

