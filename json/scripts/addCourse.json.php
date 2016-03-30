<?php
	header("Content-type:application/json");

	session_start();
	define('json', 1);

	include_once '../../classes/scripts/scripts.class.php';

	$baseObject = new Base();
	$scriptsObject = new Scripts();

	$subject = filter_input( INPUT_POST,"subject", FILTER_SANITIZE_STRING);
	$subject = (int)$baseObject->decrypt($subject);

	$name = filter_input(INPUT_POST,"name",FILTER_SANITIZE_STRING);
	$semester = filter_input(INPUT_POST,"semester",FILTER_SANITIZE_NUMBER_INT);
	$year = filter_input(INPUT_POST,"year",FILTER_SANITIZE_NUMBER_INT);

	if($semester > 2)
		$semester = 2;
	else if($semester < 0)
		$semester = 1;

	if($year > $scriptsObject->getYearsOfStudy())
		$year = 2;
	else if($year < 0)
		$year = 1;

	if($semester == 1) {
		$semester = (2*$year)-1;
	}
	else $semester *= $year;

	$result = $scriptsObject->addCourse($subject, $name, $year, $semester);

	echo json_encode($result);