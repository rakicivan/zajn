<?php
include_once 'classes/base.class.php';

class Profile{
    private $baseObject;

    public function __construct()
    {
            $this->baseObject = new Base();
    }
    
    public function get_user_info($user_id){
//        echo "<br>ID prije decrypta: ".$user_id;
        $_user_id = intval($this->baseObject->decrypt($user_id));
//        echo "<br>ID poslije decrypta: ".$_user_id;
        $data = $this->baseObject->query("","SELECT users.*,cities.name AS cityName, colleges.name AS collegeName, dorms.name AS dormName, subjects.name AS subjectName, types_of_study.name AS tosName, universities.name AS universitieName, users.profile_picture AS user_avatar FROM `users` LEFT JOIN cities ON cities.city_ID = users.city LEFT JOIN colleges ON colleges.college_ID = users.college LEFT JOIN dorms ON dorms.dorm_ID = users.dorm LEFT JOIN subjects ON subjects.subject_ID = users.subject LEFT JOIN types_of_study ON types_of_study.type_of_study_ID = users.type_of_study LEFT JOIN universities ON universities.university_ID = users.university WHERE users.user_ID = '".$_user_id."'");
        
        for($i = 0;$i < count($data); $i++){
            
            $data[$i]['user_ID'] = $this->baseObject->encrypt($data[$i]['user_ID']);
        }
//        echo '<br>';
//        print_r($data);
        if($data){
            return $data[0];            
        }
    }
}
