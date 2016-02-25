<?php
include_once 'base.class.php';

class Post{

	private $baseObject;

	public function __construct()
	{
		$this->baseObject = new Base();
	}

    public function get_wall_posts($user_id, $limit, $offset){
        
        $_limit = intval($limit);
        $_offset = intval($offset);
    	$data = $this->baseObject->query("", "SELECT posts.post_ID, users.name AS author_name, users.surname AS author_surname, posts.post_ID, posts.text, posts.time, posts.likes, users.profile_picture AS user_avatar FROM posts JOIN users on users.user_ID = posts.author WHERE author= '".$user_id."' UNION SELECT posts.post_ID, users.name AS author_name, users.surname AS author_surname, posts.post_ID, posts.text, posts.time, posts.likes,users.profile_picture AS user_avatar FROM posts JOIN users ON users.user_ID = posts.author JOIN friends ON posts.author = friends.owner AND friends.friend = '".$user_id."' OR posts.author = friends.friend AND friends.owner = '".$user_id."' ORDER BY `time` DESC LIMIT ".$_limit." OFFSET ".$_offset);
        for($i = 0;$i < count($data); $i++){
            
            $data[$i]['post_ID'] = $this->baseObject->encrypt($data[$i]['post_ID']);
        }
        return $data;
    }

}