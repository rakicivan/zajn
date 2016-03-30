<?php
if(defined('json'))
    include_once '../../classes/base.class.php';
else 
    include_once 'classes/base.class.php';

const month_of_summer_semester = 2;
const day_of_summer_semester = 10; 

class Scripts {
    private $baseObject;
    
    public function __construct() {
        $this->baseObject = new Base();
    }

    public function getYearOfStudy() {
        if(isset($_SESSION['ses_user_college_year'])) 
            return $_SESSION['ses_user_college_year'];
        else {
            $id = intval($this->baseObject->decrypt($_SESSION['ses_user_signed_in']));
            $query = "select college_year from users where user_ID = '{$id}' LIMIT 1";
            $result = $this->baseObject->query("SELECT", $query);
            if(count($result) < 1)
                return -1;
            if($result[0]["college_year"] == null)
                return -1;

            $_SESSION['ses_user_college_year'] = $result[0]["college_year"];
            return $result[0]["college_year"];
        }
    }

	public function getYearsOfStudy($subject_ID = null) {
        if($subject_ID == null) {
            if(isset($_SESSION['ses_subject_study_years'])) 
                return $_SESSION['ses_subject_study_years'];
            else {
                $id = intval($this->baseObject->decrypt($_SESSION['ses_user_signed_in']));

                $query = "SELECT `subjects`.`max_years` FROM `subjects` WHERE `subjects`.`subject_ID` IN (SELECT `users`.`subject` FROM `users` WHERE `user_ID` = '{$id}') LIMIT 1";
                $result = $this->baseObject->query("SELECT", $query);

                if(count($result) < 1)
                    return -1;

                $_SESSION['ses_subject_study_years'] = $result[0]["max_years"];
                return $result[0]["max_years"];
            }
        }
        else {
            $query = "SELECT `max_years` FROM `subjects` WHERE `subject_ID` = '{$subject_ID}' LIMIT 1";
            $result = $this->baseObject->query("SELECT", $query);

            if(count($result) < 1)
                return -1;

            return $result[0]["max_years"];
        }
    }	

    public function getSubject($id = null) {
        if($id == null) {
            if(isset($_SESSION['ses_subject_id'])) 
                return $_SESSION['ses_subject_id'];
            else {
                $id = intval($this->baseObject->decrypt($_SESSION['ses_user_signed_in']));

                $query = "SELECT `subject` FROM `users` WHERE `user_ID` = '{$id}' LIMIT 1";
                $result = $this->baseObject->query("SELECT", $query);

                if(count($result) < 1)
                    return -1;

                $_SESSION['ses_subject_id'] = $result[0]["subject"];
                return $result[0]["subject"];
            }
        }
        else {
            $id = intval($this->baseObject->decrypt($id));

            $query = "SELECT `subject` FROM `users` WHERE `user_ID` = '{$id}' LIMIT 1";
            $result = $this->baseObject->query("SELECT", $query);

            if(count($result) < 1)
                return -1;

            return $result[0]["subject"];
        }
    }   

	public function getCourses($year = null, $semester = null, &$first = null, $subject_ID = null) {
	    if($subject_ID == null) {
            $id = intval($this->baseObject->decrypt($_SESSION['ses_user_signed_in']));
            $query = "SELECT `course_ID`, `name`, `semester` FROM `courses` WHERE `subject` IN (SELECT `subject_ID` FROM `subjects` WHERE `subject_ID` IN (SELECT `subject` FROM `users` WHERE `user_ID` = '{$id}')) ";
        }
        else $query = "SELECT `course_ID`, `name`, `semester` FROM `courses` WHERE `subject` = {$subject_ID} ";

	    if($year != null)
	    	$query .= "AND `year` = '{$year}'";
	    if($semester != null)
	    	$query .= "AND `semester` = '{$semester}'";

	    $result = $this->baseObject->query("SELECT", $query);

        for($i = 0; $i < count($result); $i++) {
            if($i == 0) $first = $result[$i]["course_ID"];
            $result[$i]["course_ID"] = $this->baseObject->encrypt($result[$i]["course_ID"]);
            $result[$i]["name"] = html_entity_decode($result[$i]["name"]);
        }

        return $result;
    }

    public function getScripts($limit = null, $start = null, $course_ID = null) {
	    $query = 'SELECT  `file_name`, `file_description`, `file_path`, `uploaded` FROM `scripts_files` WHERE `course_ID` = \''. $course_ID . '\' ';

	    if($limit != null) {
	    	if($start != null)
	    		$query .= ' LIMIT ' . $start . ', ' . $limit;
	    	else 
	    		$query .= ' LIMIT ' . $limit;
	    }

	    $result = $this->baseObject->query("SELECT", $query);

        for($i = 0; $i < count($result); $i++) {
            $result[$i]["file_name"] = html_entity_decode($result[$i]["file_name"]);
            $result[$i]["file_description"] = html_entity_decode($result[$i]["file_description"]);
        }

	    $object['number'] = count($result);
	    $object['array'] = $result;

	    return $object; 	
    }

    public function getScriptsNumber($course_ID) {
        $query = 'SELECT  COUNT(`script_ID`) FROM `scripts_files` WHERE `course_ID` = \''. $course_ID . '\' ';
        $result = $this->baseObject->query("SELECT", $query);
        return $result[0]['COUNT(`script_ID`)'];
    }

    public function getUniversities() {
        $query = 'SELECT university_ID, name FROM `universities`';
        $result = $this->baseObject->query("SELECT", $query);

        for($i = 0; $i < count($result); $i++) {
            $result[$i]['university_ID'] = $this->baseObject->encrypt($result[$i]['university_ID']);
        }


        $object['array'] = $result;
        $object['number'] = count($result);

        return $object;
    }

    public function getColleges($university_ID) {
        $university_ID = (int) $university_ID;

        $query = "SELECT college_ID, name FROM `colleges` WHERE university = {$university_ID}";
        $result = $this->baseObject->query("SELECT", $query);

        for($i = 0; $i < count($result); $i++) {
            $result[$i]['college_ID'] = $this->baseObject->encrypt($result[$i]['college_ID']);
        }

        $object['array'] = $result;
        $object['number'] = count($result);
        return $object;
    }

    public function getSubjects($college_ID) {
        $query = "SELECT `subject_ID`, `name` FROM `subjects` WHERE `subject_ID` IN (SELECT `subject` FROM `subject_in_college` WHERE `college` = '{$college_ID}')";
        $result = $this->baseObject->query("SELECT", $query);

        for($i = 0; $i < count($result); $i++) {
            $result[$i]['subject_ID'] = $this->baseObject->encrypt($result[$i]['subject_ID']);
        }

        $object['array'] = $result;
        $object['number'] = count($result);
        return $object;
    }

    public function deleteCourse($course_ID) {
        $result = $this->baseObject->query('DEL', 'DELETE FROM `courses` WHERE `course_ID` = \''.$course_ID.'\'');
        return $result;
    }

    public function updateCourse($course_ID, $name, $semester, $year) {
        $result = $this->baseObject->query('UPDATE', 'UPDATE `courses` SET `name`= \''.$name.'\', `semester` = \''.$semester.'\', `year` = \''.$year.'\' WHERE `course_ID`= \''.$course_ID.'\'');
        return $result;
    }

    public function addCourse($subject, $name, $year, $semester) {
        $result = $this->baseObject->query("INSERT", 'INSERT INTO `courses` (`subject`, `name`, `semester`, `year`) VALUES (\'' . $subject . '\', \'' . $name . '\',\'' . $semester . '\',\'' . $year . '\')');

        if($result > 0)
            return true;

        return false;
    }
}