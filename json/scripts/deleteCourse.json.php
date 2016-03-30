<?php
	header("Content-type:application/json");

	session_start();
	define('json', 1);

	include_once '../../classes/scripts/scripts.class.php';

	$baseObject = new Base();
	$scriptsObject = new Scripts();

	$selected_course  = filter_input( INPUT_POST,"course_ID", FILTER_SANITIZE_STRING);

	$selected_course = $baseObject->decrypt($selected_course);
	$selected_course = (int) $selected_course;

	$result = $scriptsObject->deleteCourse($selected_course);

	echo json_encode($result);