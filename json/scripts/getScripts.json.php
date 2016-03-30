<?php
	header("Content-type:application/json");

	session_start();
	define('json', 1);

	include_once '../../classes/scripts/scripts.class.php';

	$baseObject = new Base();
	$scriptsObject = new Scripts();

	$limit = filter_input(INPUT_POST,"limit",FILTER_SANITIZE_STRING);
	$limit  = (int)$baseObject->decrypt($limit);

	$start = 0;
	if(isset($_POST['b']))
		$start = filter_input(INPUT_POST,"b",FILTER_SANITIZE_NUMBER_INT);

	if($start < 0)
		$start = 0;
	else if($start > 1000)
		$start = 1000;

	if($limit < 1)
		$limit = 1;
	else if($limit > 100)
		$limit = 100;

	$course_ID = filter_input(INPUT_POST,"course_ID",FILTER_SANITIZE_STRING);
	$course_ID  = (int)$baseObject->decrypt($course_ID);

	$courses = $scriptsObject->getScripts($limit, $start, $course_ID);
	$courses['number_of_scripts'] = $scriptsObject->getScriptsNumber($course_ID);

	echo json_encode($courses);