<?php

include_once 'app.class.php';
class College{
    
    private $appObject;
    
    public function __construct() {
        $this->appObject = new App();
    }
    
    public function getColleges($city, $university)
    {
        $results = $this->appObject->getValues("select * from colleges where city = '{$city}' and university = '{$university}'");
        return $results;
    }
    
    public function getTypeStudy($college)
    {
        $types_IDs = $this->appObject->getValues("select types_of_study from colleges where college_ID = {$college}");
        return $this->appObject->getValues("select * from types_of_study where type_of_study_ID IN ({$types_IDs[0]["types_of_study"]})");
    }
    
    public function getSubjects($college, $type_of_study)
    {
        return $this->appObject->getValues("select subject_ID, name, max_years from subjects JOIN subject_in_college ON subjects.subject_ID = subject_in_college.subject WHERE subject_in_college.college = {$college} AND subjects.type_of_study = {$type_of_study}");
    }
    
    public function getStudyYears($subjects)
    {
        $arrays = array();
        foreach($subjects as $subject)
        {
            $number_of_years = $subject["max_years"];
            $array = array();
            for($i = 1; $i <= $number_of_years; $i++)
            {
                $subArray["id"] = $i;
                $subArray["text"] = $i.". godina";
                array_push($array, $subArray);
            }
            $arrays[$subject["subject_ID"]] = $array;
        }
        return $arrays;
    }
    
   
    
}

