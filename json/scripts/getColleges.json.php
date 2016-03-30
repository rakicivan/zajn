<?php
	session_start();
	define('json', 1);

	include_once '../../classes/scripts/scripts.class.php';

	$baseObject = new Base();
	$scriptsObject = new Scripts();

	$selected_univerity  = filter_input( INPUT_POST,"selected_univerity", FILTER_SANITIZE_STRING);

	$colleges = $scriptsObject->getColleges( $baseObject->decrypt($selected_univerity) );

	if($colleges['number'] > 0) {
		echo '<option disabled selected>Odaberite fakultet</option>';
		for($i = 0; $i < $colleges['number']; $i++) {
			echo '<option value = "'.$colleges['array'][$i]['college_ID'].'">'.$colleges['array'][$i]['name'].'</option>';
		}
	}
	else {
		echo '<option disabled>Ovaj univerzitet nema fakulteta</option>';
	}