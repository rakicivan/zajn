<?php
    $template = $twig->loadTemplate("scripts/upload.twig");

    $user_id = $_SESSION['ses_user_signed_in'];
    $limit = 10;
    $offset = 0;
    $pumk_limit = 5;  //peple you may know limit
    echo $template->render(array(
        "base_url"=> $baseURL, 
        "session"=> $_SESSION,
        "debug_cookie"=> $baseObject->debug_cookie('ivra_cookie'),
        "get_user_info"=>$profileObject->get_user_info($user_id),
        // Scripts system (left_bar)
        "is_admin" => $userObject->isAdmin()
    ));
?>