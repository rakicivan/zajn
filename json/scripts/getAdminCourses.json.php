<?php
/*
    'student_year' => $_yearsOfStudy,
    'courses' => $courses = $scriptObject->getCourses($year, $semester, $first_course),
    'scripts' => $loaded_scripts = $scriptObject->getScripts($limit, 0, $first_course),
    'scripts_limit' => $limit,
selected_subject
*/
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

	$junk = null;

	$courses = $scriptsObject->getCourses(1 /*year*/, 1 /*semester*/, $junk, $selected_subject);
	
	$object['courses'] = $courses; 
	$object['number'] = count($courses); 
	//$object['scriptsNumber'] = $scriptsObject->getScriptsNumbercount( $baseObject->decrypt($courses[0]['course_ID']) );

	header("Content-type:application/json");
	echo json_encode($object);
?>
