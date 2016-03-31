<?php
include_once 'base.class.php';

class User{
    
    private $baseObject;
    
    public function __construct() {
        $this->baseObject = new Base();
    }
      
    public function registerUser($full_time_student, $id, $mobile, $city, $university, $college, $email, $study_type, $subject, $years, $homecity, $dorm,$birthDate, $gender, $name, $surname, $secret, $password)
    {
        $currentDate = date("Y-m-d H:s:i",time());
        if($dorm == -1){$dorm = "NULL";}
        $query = "INSERT INTO users(full_time_student, unique_ID, mobile_number, city, university, college, email, type_of_study, subject, college_year, home_city, dorm, birthday_date, gender, name, surname, secret_word, password, registered_at) values ({$full_time_student},'{$id}','{$mobile}',{$city},{$university},{$college},'{$email}',{$study_type},{$subject},{$years},{$homecity},{$dorm},'{$birthDate}','{$gender}','{$name}','{$surname}','{$secret}','{$password}','{$currentDate}')";
        $result = $this->baseObject->query("INSERT",$query);
        if($result != 0){return "";}
        else {return "Nesupješna registracija!";}
        
    }
    
    public function getFriendRequests($id, $limit = null){
        $raw_id = intval($this->baseObject->decrypt($id));

        $query = "select users.user_ID, users.name, users.surname from users where users.user_ID in (select friends.owner from friends where friends.friend = {$raw_id} and pending = 1)";
        if($limit != null){$query .= "limit {$limit}";}
        $result = $this->baseObject->query("SELECT", $query);
        for($i = 0; $i < count($result); $i++) {
            $result[$i]["user_ID"] = $this->baseObject->encrypt($result[$i]["user_ID"]);
            $result[$i]["req"] = $this->baseObject->encrypt(0);
        }
        $object["number"] = count($result);
        $object["array"] = $result;
        //print_r($object);
        //echo "<br>";
        //echo "<br>";
        
        return $object;
    }

    public function getNotifications_all($id, $limit = null, $from_id = null){
        $raw_id = intval($this->baseObject->decrypt($id));
        $query = "select notifications.notification_ID, notifications.sender, notifications.received_at, notifications.seen, notifications.notification_type, notifications.link_target AS post, users.name, users.surname from notifications, users where notifications.owner = {$raw_id} AND IF(notification_type = '1', users.user_ID = notifications.owner, users.user_ID = notifications.sender) ORDER BY `notifications`.`notification_ID` DESC";
        
        if($from_id != null){$query .= " offset {$from_id}, {$limit}";}
        else if($limit != null){$query .= " limit {$limit}";}

        $result = $this->baseObject->query("SELECT", $query);
        for($i = 0; $i < count($result); $i++) {
            $result[$i]["sender"] = $this->baseObject->encrypt($result[$i]["sender"]);
            $result[$i]["post"] = $this->baseObject->encrypt($result[$i]["post"]);
            $result[$i]["user_ID"] = $id;
            $result[$i]["notification_ID"] = $this->baseObject->encrypt(($result[$i]["notification_ID"]));
        }
        $object["number"] = count($result);
        $object["array"] = $result;
       
        return $object;
    }

    public function getNotifications($id, $limit = null, $from_id = null){
        $raw_id = intval($this->baseObject->decrypt($id));
        $query = "select notifications.notification_ID, notifications.sender, notifications.received_at, notifications.seen, notifications.notification_type, notifications.link_target AS post, users.name, users.surname from notifications, users where notifications.owner = {$raw_id} AND notifications.seen = 0 AND IF(notification_type = '1', users.user_ID = notifications.owner, users.user_ID = notifications.sender) ORDER BY `notifications`.`notification_ID` DESC";
        
        if($from_id != null){$query .= " offset {$from_id}, {$limit}";}
        else if($limit != null){$query .= " limit {$limit}";}

        $result = $this->baseObject->query("SELECT", $query);
        for($i = 0; $i < count($result); $i++) {
            $result[$i]["sender"] = $this->baseObject->encrypt($result[$i]["sender"]);
            $result[$i]["post"] = $this->baseObject->encrypt($result[$i]["post"]);
            $result[$i]["user_ID"] = $id;
            $result[$i]["notification_ID"] = $this->baseObject->encrypt(($result[$i]["notification_ID"]));
        }
        $object["number"] = count($result);
        $object["array"] = $result;
       
        return $object;
    }

    public function acceptFriendRequest($owner,$friend){
        $raw_owner = intval($this->baseObject->decrypt($owner));
        $raw_friend = intval($this->baseObject->decrypt($friend));
        
        $current_time = date("Y-m-d H:i:s",time());

        $this->baseObject->query("INSERT","INSERT INTO `notifications` (`owner`, `sender`, `received_at`,  `seen`, `notification_type`) VALUES ('{$raw_owner}', '{$raw_friend}', '{$current_time}', '0', '1')");

        $query = "update friends set pending=0, accepted_at='{$current_time}' where owner={$raw_owner} and friend={$raw_friend}";
        $result = $this->baseObject->query("UPDATE", $query);

        return array("returned" => $result,"id" => $this->baseObject->encrypt(1));
    }
    
    public function declineFriendRequest($owner,$friend){
        $raw_owner = intval($this->baseObject->decrypt($owner));
        $raw_friend = intval($this->baseObject->decrypt($friend));
        
        $query = "delete from friends where owner={$raw_owner} and friend={$raw_friend}";
        $result = $this->baseObject->query("UPDATE", $query);

        return $result;
    }
    
    public function answeredFriendRequest($id){
        $raw_friendID = intval($this->baseObject->decrypt($id));
        $raw_id = intval($this->baseObject->decrypt($_SESSION['ses_user_signed_in']));
//        if($raw_id == $raw_friendID){return 1;}
//        $query = "select * from friends where owner = {$raw_friendID} and friend = {$raw_id} and pending = 1";
//        $result = $this->baseObject->query("SELECT", $query);
//        if(count($result) == 1) {return 0;}
//        else {return 1;}
        
        $query = "select pending from friends where owner in ({$raw_friendID},{$raw_id}) and friend in ({$raw_friendID},{$raw_id})";
        $result = $this->baseObject->query("SELECT", $query);
        if(!$result){return 1;}
        if($result[0]["pending"] == 1){return 0;}
        else{return 1;}
    }
    
    public function areFriends($my_id,$their_id){
        $raw_my_id = intval($this->baseObject->decrypt($my_id));
        $raw_their_id = intval($this->baseObject->decrypt($their_id));
        if($raw_my_id == $raw_their_id){return 1;}
        $query = "select * from friends where owner in ({$raw_my_id},{$raw_their_id}) and friend in ({$raw_my_id},{$raw_their_id}) and pending = 0";
        $result = $this->baseObject->query("SELECT", $query);
        if(count($result) == 1){return 1;}
        else{return 0;}
    }
    
    public function didIRequestFriendship($my_id, $their_id){
        $raw_my_id = intval($this->baseObject->decrypt($my_id));
        $raw_their_id = intval($this->baseObject->decrypt($their_id));
        if($raw_my_id == $raw_their_id){return 1;}
        $query = "select * from friends where owner = {$raw_my_id} and friend = {$raw_their_id}";
        $result = $this->baseObject->query("SELECT", $query);
        if(count($result) == 1){return 1;}
        else{return 0;}
    }
    
    public function removeFriendship($my_id, $their_id){
        $raw_my_id = intval($this->baseObject->decrypt($my_id));
        $raw_their_id = intval($this->baseObject->decrypt($their_id));
        if($raw_my_id == $raw_their_id){return 1;}
        $query = "delete from friends where owner in ({$raw_my_id},{$raw_their_id}) and friend in ({$raw_my_id},{$raw_their_id})";
        $result = $this->baseObject->query("SELECT", $query);
        return $result;
    }
    
    public function getFriendRequestsISent(){
        $raw_id = intval($this->baseObject->decrypt($_SESSION['ses_user_signed_in']));
        $query = "select users.user_ID, users.name, users.surname, users.profile_picture from users where users.user_ID in (select friends.friend from friends where friends.owner = {$raw_id} and pending = 1)";
        $result = $this->baseObject->query("SELECT", $query);
        for($i = 0; $i < count($result); $i++) {
            $result[$i]["user_ID"] = $this->baseObject->encrypt($result[$i]["user_ID"]);
            
        } 
        return $result;
    }
    
    public function getFriendRequestForMe(){
        $raw_id = intval($this->baseObject->decrypt($_SESSION['ses_user_signed_in']));
        $query = "select users.user_ID, users.name, users.surname, users.profile_picture from users where users.user_ID in (select friends.owner from friends where friends.friend = {$raw_id} and pending = 1)";
        $result = $this->baseObject->query("SELECT", $query);
        for($i = 0; $i < count($result); $i++) {
            $result[$i]["user_ID"] = $this->baseObject->encrypt($result[$i]["user_ID"]);
            
        }
        return $result;
    }

    public function isAdmin($id = null) {
        if($this->getRole() == 1)
            return true;
        return false;
    }

    public function getRole($id = null) {
        if($id == null) {
            if(isset($_SESSION['ses_user_role'])) 
                return $_SESSION['ses_user_role'];
            else {
                $id = intval($this->baseObject->decrypt($_SESSION['ses_user_signed_in']));

                $query = "select users.role from users where users.user_ID = '{$id}' LIMIT 1";
                $result = $this->baseObject->query("SELECT", $query);

                if(count($result) < 1)
                    return -1;

                $_SESSION['ses_user_role'] = $result[0]["role"];
                return $result[0]["role"];
            }
        }
        else {
            $id = intval($this->baseObject->decrypt($id));

            $query = "select users.role from users where users.user_ID = '{$id}' LIMIT 1";
            $result = $this->baseObject->query("SELECT", $query);

            if(count($result) < 1)
                return -1;

            return $result[0]["role"];
        }
    }
}
//        $this->baseObject->query("INSERT","INSERT INTO `notifications` (`owner`, `sender`, `received_at`,  `seen`, `notification_type`) VALUES ('{$raw_owner}', '{$raw_friend}', NOW(), '0', '1')"); 

