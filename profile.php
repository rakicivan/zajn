<?php
session_start();

require_once 'twig_core.php';
include_once 'classes/base.class.php';
include_once 'classes/post.class.php';
include_once 'classes/profile.class.php';
include_once 'classes/friends.class.php';
include_once 'classes/user.class.php';

if(empty($_SESSION['ses_user_signed_in'])) {
    header('Location: ulaz');
}

// provjera da li je $_GET["friends"] postavljen i da li postoji
if(isset($_GET["friends"]) && $_GET["friends"] == 1){
    // ako postoji, pretpostavljamo da korisnik želi vidjeti listu prijatelja
    $template = $twig->loadTemplate("profile_friends.twig");
    
}  
else if(isset($_GET["post"])) {
    // ako postoji, pretpostavljamo da korisnik želi vidjeti listu prijatelja
    $template = $twig->loadTemplate("profile_post.twig");    
}
else {
    // ako ne postoji, pretpostavljamo da je korisnik na profilu
    $template = $twig->loadTemplate("profile.twig");    
}

$baseObject = new Base();
$postObject = new Post();
$profileObject = new Profile();
$friendsObject = new Friends();
$userObject = new User();

if(isset($_GET["req"])){
    $req = $baseObject->decrypt($_GET["req"]);
}
else{
    $req = "";
    
}

// provjera da li je $_GET["id"] postavljen i da li postoji
if(!isset($_GET["id"]) || $_GET["id"] == ""){
    
    // ako ne postoji, zapisuje ID iz sesije
    $user_id = $_SESSION['ses_user_signed_in'];
}  else {
    // ako postoji zapisuje se $_GET["id"]
    //$user_id = $_GET["id"];
    $user_id = filter_input(INPUT_GET,"id",FILTER_SANITIZE_STRING);
    define("ProfilPage", $user_id);
    echo '
    <script>
        $(document).ready(function(){
            viewed_User = "'.$user_id.'";
        });
    </script>';
}

// limit koliko postova će se prikazati na početku
$limit = 10;
$pumk_limit = 5;  //peple you may know limit
$friend_list_limit = 6;

// odtupanje za limit
$offset = 0;

// provjera da li je korisnik na svom ili profilu svog kolege
if($user_id != $_SESSION['ses_user_signed_in']){
    $not_my_profile = 1;
} else {
    $not_my_profile = 0;    
}

// provjera da li je ID validan ili ne, ako nije korisnik se rediracta na 404
$user_info = $profileObject->get_user_info($user_id);

if(empty($user_info) || $user_info == 0){
    header("Location: ".$baseObject->getBaseUrl()."/404");  
} else {
    if(isset($_GET['post'])) {
        $post_id = $_GET["post"];
        //$baseObject->alert(''.$post_id.'\n'.$baseObject->decrypt($user_id).'');
        // twig template array
        echo $template->render(array(
            "base_url"=> $baseObject->getBaseUrl(),
            "get_wall_posts"=>$postObject->get_profile_post($user_id, $post_id)
        ));
    }
    else {
        // twig template array
        echo $template->render(array(
            "base_url"=> $baseObject->getBaseUrl(),
            "not_my_profile"=>$not_my_profile,
            "get_wall_posts"=>$postObject->get_profile_posts($user_id, $limit, $offset),
            "get_user_info"=>$user_info,
            "get_friends"=>$friendsObject->get_friends($user_id, $friend_list_limit, $offset),
            "get_ppl_u_may_know"=>$friendsObject->get_ppl_u_may_know($user_id, $pumk_limit, $offset),
            "answered_request" => $userObject->answeredFriendRequest($user_id),
            "friend_requests" => $userObject->getFriendRequests($_SESSION['ses_user_signed_in'],5),
            "areFriends" => $userObject->areFriends($_SESSION['ses_user_signed_in'],$user_id),
            "profileID" => $user_id,
            "did_i_request_friendship" => $userObject->didIRequestFriendship($_SESSION['ses_user_signed_in'],$user_id),
            "user_notifications" => $userObject->getNotifications($_SESSION['ses_user_signed_in'],5)
        ));
    }
}

echo '<script> baseUrl = "'.$baseObject->getBaseUrl().'"; </script>';