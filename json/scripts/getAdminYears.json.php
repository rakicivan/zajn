<?php
	session_start();
	define('json', 1);

	include_once '../../classes/scripts/scripts.class.php';

	$baseObject = new Base();
	$scriptsObject = new Scripts();

	$selected_subject  = filter_input( INPUT_POST,"selected_subject", FILTER_SANITIZE_STRING);

	$selected_subject = $baseObject->decrypt($selected_subject);
	$selected_subject = (int) $selected_subject;

	$yearsOfStudy =  $scriptsObject->getYearsOfStudy($selected_subject);
	$object['yearsOfStudy'] = (int)$yearsOfStudy; 

	header("Content-type:application/json");
	echo json_encode($object);
?>
