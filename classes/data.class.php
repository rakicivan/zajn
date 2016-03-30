<?php
class Data {
	static function get($datastr) {
		if(isset($_POST[$datastr])) return $_POST[$datastr];
		else if(isset($_GET[$datastr])) return $_GET[$datastr];
		else return false;
	}
}
?>