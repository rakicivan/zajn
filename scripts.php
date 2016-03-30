<?php
session_start();

if(empty($_SESSION['ses_user_signed_in'])) {header('Location: ulaz');}

require_once 'twig_core.php';
include_once 'classes/base.class.php';
include_once 'classes/profile.class.php';
include_once 'classes/user.class.php';
include_once 'classes/data.class.php';
include_once 'classes/scripts/scripts.class.php';

$baseObject = new Base();
$profileObject = new Profile();
$userObject = new User();
$scriptObject = new Scripts();
$dataObject = new Data();

$baseURL = $baseObject->getBaseUrl();
?>

<script type="text/javascript" src="<?php echo $baseURL; ?>/js/ajaxupload.3.5.js" ></script>

<?php
if(Data::get('s') == 'Admin') {
    if($userObject->isAdmin())
        include 'includes/scripts/admin/admin_landing.php';
    else 
        $baseObject->error("404");
}
else if(Data::get('s') == 'Courses') {
    if($userObject->isAdmin())
        include 'includes/scripts/admin/admin_courses.php';
    else 
        $baseObject->error("404");}
else {
    include 'includes/scripts/index.php';
}
?>