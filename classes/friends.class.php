<?php
include_once 'base.class.php';

class Friends{
    private $baseObject;

    public function __construct()
    {
            $this->baseObject = new Base();
    }
    
    public function get_ppl_u_may_know($user_id, $limit, $offset){
        $_limit = intval($limit);
        $_offset = intval($offset);
        $data = $this->baseObject->query("","SELECT users.user_ID, users.profile_picture AS user_avatar, users.name, users.surname FROM users WHERE college = (SELECT users.college FROM users WHERE users.user_ID = ".$user_id.") AND users.user_ID <> ".$user_id." AND users.user_ID NOT IN (SELECT users.user_ID FROM `users` JOIN friends ON friends.owner = users.user_ID WHERE friends.owner <> ".$user_id." AND friends.friend <> ".$user_id.") ORDER BY RAND() LIMIT ".$_limit." OFFSET ".$_offset);
        for($i = 0;$i < count($data); $i++){
            
            $data[$i]['user_ID'] = $this->baseObject->encrypt($data[$i]['user_ID']);
        }
        
        return $data;
    }
}
