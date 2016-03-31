<?php
include_once 'base.class.php';

class Post{

	private $baseObject;

	public function __construct()
	{
		$this->baseObject = new Base();
	}

    public function get_wall_posts($user_id, $limit, $offset){
        
        $_user_id = (int)$this->baseObject->decrypt($user_id);
        $_limit = (int)$limit;
        $_offset = (int)$offset;

        $query = "SELECT users.user_ID, users.name AS author_name, users.surname AS author_surname, posts.post_ID, posts.text, posts.time, posts.likes, users.profile_picture AS user_avatar FROM posts JOIN users on users.user_ID = posts.author WHERE author= '".$_user_id."' UNION SELECT users.user_ID, users.name AS author_name, users.surname AS author_surname, posts.post_ID, posts.text, posts.time, posts.likes,users.profile_picture AS user_avatar FROM posts JOIN users ON users.user_ID = posts.author JOIN friends ON (posts.author = friends.owner AND friends.friend = '".$_user_id."' AND friends.pending = 0) OR (posts.author = friends.friend AND friends.owner = '".$_user_id."' AND friends.pending = 0) ORDER BY `time` DESC LIMIT ".$_limit." OFFSET ".$_offset;
    	$data = $this->baseObject->query("", $query);

        for($i = 0;$i < count($data); $i++){
            
            $numb_of_comms = $this->baseObject->query("", "SELECT count(*) AS count FROM `comments` WHERE comments.post =".$data[$i]['post_ID']);
            $data[$i]['numb_of_comms'] = $numb_of_comms[0]['count'];
            
            $data[$i]['user_ID'] = $this->baseObject->encrypt($data[$i]['user_ID']);
            $data[$i]['post_ID'] = $this->baseObject->encrypt($data[$i]['post_ID']);
            $data[$i]['text'] = html_entity_decode($data[$i]['text']);
            $data[$i]['count_posts'] = count($data);
            
        }
        return $data;
    }

    public function get_profile_posts($user_id, $limit, $offset){      
        $_checker = (int)$this->baseObject->decrypt($_SESSION['ses_user_signed_in']);
        $_user_id = (int)$this->baseObject->decrypt($user_id);

        $result = array(1);
        $data = null;

        if($_checker != $_user_id) {
            $query = "select * from friends where owner in ({$_checker},{$_user_id}) and friend in ({$_checker},{$_user_id}) and pending = 0";
            $result = $this->baseObject->query("SELECT", $query);            
        }
        echo $_user_id . "|" . $_checker;

        if(count($result) > 0) {
            $_limit = intval($limit);
            $_offset = intval($offset);

            $data = $this->baseObject->query("", "SELECT users.user_ID, users.name AS author_name, users.surname AS author_surname, posts.post_ID, posts.text, posts.time, posts.likes, users.profile_picture AS user_avatar FROM posts JOIN users on users.user_ID = posts.author WHERE author = '".$_user_id."' ORDER BY `time` DESC LIMIT ".$_limit." OFFSET ".$_offset);

            for($i = 0;$i < count($data); $i++){
                
                $numb_of_comms = $this->baseObject->query("", "SELECT count(*) AS count FROM `comments` WHERE comments.post =".$data[$i]['post_ID']);
                $data[$i]['numb_of_comms'] = $numb_of_comms[0]['count'];
                
                $data[$i]['user_ID'] = $this->baseObject->encrypt($data[$i]['user_ID']);
                $data[$i]['post_ID'] = $this->baseObject->encrypt($data[$i]['post_ID']);
                $data[$i]['text'] = html_entity_decode($data[$i]['text']);
                $data[$i]['count_posts'] = count($data);

            }            
        }
        return $data;
    }

    public function get_profile_post($user_id, $post_ID){
        
        $_user_id = intval($this->baseObject->decrypt($user_id));
        $post_ID = intval($this->baseObject->decrypt($post_ID));

        $data = $this->baseObject->query("", "SELECT users.user_ID, users.name AS author_name, users.surname AS author_surname, posts.post_ID, posts.text, posts.time, posts.likes, users.profile_picture AS user_avatar FROM posts JOIN users on users.user_ID = posts.author WHERE post_ID = '".$post_ID."' LIMIT 1");

        for($i = 0;$i < count($data); $i++){
            
            $numb_of_comms = $this->baseObject->query("", "SELECT count(*) AS count FROM `comments` WHERE comments.post =".$data[$i]['post_ID']);
            $data[$i]['numb_of_comms'] = $numb_of_comms[0]['count'];
            
            $data[$i]['user_ID'] = $this->baseObject->encrypt($data[$i]['user_ID']);
            $data[$i]['post_ID'] = $this->baseObject->encrypt($data[$i]['post_ID']);
            $data[$i]['text'] = html_entity_decode($data[$i]['text']);
            $data[$i]['count_posts'] = count($data);

        }
        return $data;
    }
}