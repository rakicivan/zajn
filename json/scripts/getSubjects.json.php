<?php
	session_start();
	define('json', 1);

	include_once '../../classes/scripts/scripts.class.php';

	$baseObject = new Base();
	$scriptsObject = new Scripts();

	$selected_college  = filter_input(INPUT_POST, "selected_college", FILTER_SANITIZE_STRING);
	$selected_college = (int)$baseObject->decrypt($selected_college);

	$colleges = $scriptsObject->getSubjects( $selected_college );

	if($colleges['number'] > 0) {
		echo '<option disabled selected>Odaberite smjer</option>';
		for($i = 0; $i < $colleges['number']; $i++) {
			echo '<option value = "'.$colleges['array'][$i]['subject_ID'].'">'.$colleges['array'][$i]['name'].'</option>';
		}
	}
	else {
		echo '<option disabled>Ovaj fakultet nema smjerova</option>';
	}