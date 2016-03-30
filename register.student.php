<?php

$full_time_student = filter_input(INPUT_POST, "full_time_student",FILTER_SANITIZE_NUMBER_INT);
    
$id = filter_input(INPUT_POST,"id",FILTER_SANITIZE_STRING);
$mobile = filter_input(INPUT_POST,"mobile",FILTER_SANITIZE_STRING);

$city = filter_input(INPUT_POST,"registerCity",FILTER_SANITIZE_NUMBER_INT);
$university = filter_input(INPUT_POST,"registerUniversity",FILTER_SANITIZE_NUMBER_INT);
$college = filter_input(INPUT_POST,"registerCollege",FILTER_SANITIZE_NUMBER_INT);
$email = filter_input(INPUT_POST,"email",FILTER_SANITIZE_STRING);
$study_type = filter_input(INPUT_POST,"registerStudyType",FILTER_SANITIZE_NUMBER_INT);
$subject = filter_input(INPUT_POST,"registerSubject",FILTER_SANITIZE_NUMBER_INT);
$years = filter_input(INPUT_POST,"registerYears",FILTER_SANITIZE_NUMBER_INT);
$homecity = filter_input(INPUT_POST,"registerHomecity",FILTER_SANITIZE_NUMBER_INT);
$dorm = filter_input(INPUT_POST,"registerDorm",FILTER_SANITIZE_NUMBER_INT);

$birthDate = filter_input(INPUT_POST,"birthDateReal",FILTER_SANITIZE_STRING);
$gender = filter_input(INPUT_POST,"gender",FILTER_SANITIZE_STRING);
$name = filter_input(INPUT_POST,"name",FILTER_SANITIZE_STRING);
$surname = filter_input(INPUT_POST,"surname",FILTER_SANITIZE_STRING);
$secret = filter_input(INPUT_POST,"secret",FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST,"studentPassword",FILTER_SANITIZE_STRING);
$confirmation = filter_input(INPUT_POST,"confirmation",FILTER_SANITIZE_STRING);
$conditions = filter_input(INPUT_POST,"conditions");

if(!empty($validationObject->checkUniqueID($full_time_student, $id, true))){array_push($messages, $validationObject->checkUniqueID($full_time_student, $id, true));}

if(!empty($validationObject->phoneNumber($mobile,true))){array_push($messages, $validationObject->phoneNumber($mobile,true));}

if(!empty($validationObject->email($email,$college, true))){array_push($messages, $validationObject->email($email,$college, true));}

if(!empty($validationObject->birthdate($birthDate, true))){array_push($messages,$validationObject->birthdate($birthDate, true));}

if(!empty($validationObject->gender($gender, true))){array_push($messages, $validationObject->gender($gender, true));}

$name = $appObject->trimSpacesFromName($name);
if(!empty($validationObject->name_surname($name, "name", true))){array_push($messages, $validationObject->name_surname($name, "name", true));}

$surname = $appObject->trimSpacesFromName($surname);
if(!empty($validationObject->name_surname($surname, "surname", true))){array_push($messages, $validationObject->name_surname($surname, "surname", true));}

if(!empty($validationObject->secretWord($secret,true))){array_push($messages, $validationObject->secretWord($secret,true));}

if(!empty($validationObject->password($password,"password",true))){array_push($messages,$validationObject->password($password,"password",true));}

if(!empty($validationObject->password($confirmation,"confirmation",true))){array_push($messages,$validationObject->password($confirmation,"confirmation",true));}

if(!empty($validationObject->confirmPassword($password, $confirmation))){array_push($messages,$validationObject->confirmPassword($password, $confirmation));}

if(!empty($validationObject->conditions($conditions))){array_push($messages,$validationObject->conditions($conditions));}

if(count($messages)==0)
{
    $message = $userObject->registerUser($full_time_student, $id, $mobile, $city, $university, $college, $email, $study_type, $subject, $years, $homecity, $dorm, $birthDate, $gender, $name, $surname, $secret, $password);
    if(strcmp($message,"")!= 0){
                    array_push($messages, $message);                        
    }
    else{array_push($messages,"Uspješno registriran! Prijavi se! ");}
}

?>

