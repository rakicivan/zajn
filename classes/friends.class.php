<?php
include_once 'base.class.php';

class Friends{
    private $baseObject;

    public function __construct()
    {
            $this->baseObject = new Base();
    }
    
    public function get_ppl_u_may_know($user_id, $limit, $offset){
        
        $_user_id = intval($this->baseObject->decrypt($user_id));
        $_limit = intval($limit);
        $_offset = intval($offset);
        $data = $this->baseObject->query("","SELECT users.user_ID, users.profile_picture AS user_avatar, users.name, users.surname FROM users WHERE college = (SELECT users.college FROM users WHERE users.user_ID = ".$_user_id.") AND users.user_ID <> ".$_user_id." AND users.user_ID NOT IN (SELECT friends.owner FROM friends WHERE friends.friend = ".$_user_id." UNION SELECT friends.friend FROM friends WHERE friends.owner = ".$_user_id.") ORDER BY RAND() LIMIT ".$_limit." OFFSET ".$_offset);
        
        if(empty($data)){
            $data = $this->baseObject->query("","SELECT users.user_ID, users.profile_picture AS user_avatar, users.name, users.surname FROM users WHERE city = (SELECT users.city FROM users WHERE users.user_ID = ".$_user_id.") AND users.user_ID <> ".$_user_id." AND users.user_ID NOT IN (SELECT friends.owner FROM friends WHERE friends.friend = ".$_user_id." UNION SELECT friends.friend FROM friends WHERE friends.owner = ".$_user_id.") ORDER BY RAND() LIMIT ".$_limit." OFFSET ".$_offset);
        }
        for($i = 0;$i < count($data); $i++){
            
            $data[$i]['user_ID'] = $this->baseObject->encrypt($data[$i]['user_ID']);
        }
        
        return $data;
    }
    
    public function get_friends($user_id, $limit, $offset){
        
        $_user_id = intval($this->baseObject->decrypt($user_id));
        $_limit = intval($limit);
        $_offset = intval($offset);
        $data = $this->baseObject->query("","SELECT owner.user_ID, owner.name, owner.surname, owner.profile_picture AS user_avatar FROM friends JOIN users AS owner ON owner.user_ID = friends.friend WHERE friends.owner = $_user_id AND friends.pending = 0 AND friends.blocked <> 1 UNION SELECT friend.user_ID, friend.name, friend.surname, friend.profile_picture AS user_avatar FROM friends JOIN users AS friend ON friend.user_ID = friends.owner WHERE friends.friend = $_user_id AND friends.pending = 0 AND friends.blocked <> 1");
        
        for($i = 0;$i < count($data); $i++){
            
            $data[$i]['user_ID'] = $this->baseObject->encrypt($data[$i]['user_ID']);
        }
        return $data;
    }
}
