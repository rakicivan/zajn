<?php
require_once 'twig_core.php';
session_start();
include_once 'classes/register.class.php';

$messages = array();
$registerObject = new Register();


if(!empty($_POST))
{
    $registration_type = filter_input(INPUT_POST,"register_type");
    if($registration_type == "1"){
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
    $password = filter_input(INPUT_POST,"password",FILTER_SANITIZE_STRING);
    $confirmation = filter_input(INPUT_POST,"confirmation",FILTER_SANITIZE_STRING);
    $conditions = filter_input(INPUT_POST,"conditions");

    if(!empty($registerObject->checkUniqueID($full_time_student, $id, true))){array_push($messages, $registerObject->checkUniqueID($full_time_student, $id, true));}
    
if(!empty($registerObject->phoneNumber($mobile,true))){array_push($messages, $registerObject->phoneNumber($mobile,true));}

if(!empty($registerObject->email($email,$college, true))){array_push($messages, $registerObject->email($email,$college, true));}

    if(!empty($registerObject->birthdate($birthDate, true))){array_push($messages,$registerObject->birthdate($birthDate, true));}
    
    if(!empty($registerObject->gender($gender, true))){array_push($messages, $registerObject->gender($gender, true));}
    
    if(!empty($registerObject->name_surname($name, "name", true))){array_push($messages, $registerObject->name_surname($name, "name", true));}
    
    if(!empty($registerObject->name_surname($surname, "surname", true))){array_push($messages, $registerObject->name_surname($surname, "surname", true));}
    
    if(!empty($registerObject->secretWord($secret,true))){array_push($messages, $registerObject->secretWord($secret,true));}
    
if(!empty($registerObject->password($password,"password",true))){array_push($messages,$registerObject->password($password,"password",true));}

    if(!empty($registerObject->password($confirmation,"confirmation",true))){array_push($messages,$registerObject->password($confirmation,"confirmation",true));}
    
    if(!empty($registerObject->confirmPassword($password, $confirmation))){array_push($messages,$registerObject->confirmPassword($password, $confirmation));}
    
    if(!empty($registerObject->conditions($conditions))){array_push($messages,$registerObject->conditions($conditions));}
    
    if(count($messages)==0)
    {
        $message = $registerObject->registerUser($full_time_student, $id, $mobile, $city, $university, $college, $email, $study_type, $subject, $years, $homecity, $dorm, $birthDate, $gender, $name, $surname, $secret, $password);
        if(strcmp($message,"")!= 0){
                        array_push($messages, $message);                        
        }
        else{array_push($messages,"Uspješno registriran!");}
    }
  }
    else
    {
        $companyName = filter_input(INPUT_POST,"registerCompanyName",513);
        $companyID = filter_input(INPUT_POST,"registerCompanyID",513);
        $companyCity = filter_input(INPUT_POST,"registerCompanyCity",519);
        $companyAddress = filter_input(INPUT_POST,"registerCompanyAddress",513);
        $companyPostalCode = filter_input(INPUT_POST,"registerCompanyPostalCode",513);
        $companyTribalState = filter_input(INPUT_POST,"registerCompanyTribalState",519);
        $companyEmail = filter_input(INPUT_POST,"registerCompanyEmail",513);
        $companyPhone = filter_input(INPUT_POST,"registerCompanyPhone",513);
        $companyFax = filter_input(INPUT_POST,"registerCompanyFax",513); //opcionalno
        $companyPerson = filter_input(INPUT_POST,"registerCompanyPerson",513);
        $companyPassword = filter_input(INPUT_POST,"registerCompanyPassword",513);
        $companyConfirmation = filter_input(INPUT_POST,"registerCompanyConfirmation",513);  
        $companyConditions = filter_input(INPUT_POST,"registerCompanyConditions");
        
       $output = $registerObject->companyName($companyName,true);
       if(!empty($output)){array_push($messages, $output);}
       
       $output = $registerObject->companyOIB($companyID,true);
       if(!empty($output)){array_push($messages, $output);}
       
       $output = $registerObject->companyAddress($companyAddress,true);
       if(!empty($output)){array_push($messages, $output);}
       
       $output = $registerObject->companyPostalCode($companyPostalCode,true);
       if(!empty($output)){array_push($messages, $output);}
        
       $output = $registerObject->companyEmail($companyEmail,true);
       if(!empty($output)){array_push($messages, $output);}
       
       $output = $registerObject->companyNumberFax($companyPhone,"phone",true);
       if(!empty($output)){array_push($messages, $output);}
       
       $output = $registerObject->companyNumberFax($companyFax,"fax",false);
       if(!empty($output)){array_push($messages, $output);}
       
       $output = $registerObject->companyPerson($companyPerson,true);
       if(!empty($output)){array_push($messages, $output);}
       
       $output = $registerObject->password($companyPassword,"password",true);
       if(!empty($output)){array_push($messages, $output);}
       
       $output = $registerObject->password($companyConfirmation,"confirmation",true);
       if(!empty($output)){array_push($messages, $output);}
       
       if(count($messages)==0)
       {
           $result = $registerObject->registerCompany($companyName, $companyID, $companyCity, $companyAddress, $companyPostalCode, $companyTribalState, $companyEmail, $companyPhone, $companyFax, $companyPerson, $companyPassword);
           
           if($result == 0)
           {
               array_push($messages,"Neuspješna registracija, pokušajte ponovo.");
           }
            else {
                array_push($messages,"Uspješna registracija. Prijavite se.");
            }
       }
       
    }
}



$cities = $registerObject->getCities();

$template = $twig->loadTemplate("registration.twig");

echo $template->render(array(
    "cities" => $cities,
    "universities" => array(),
    "colleges" => array(),
    "study_types" => array(),
    "subjects" => array(),
    "years" => array(),
    "dorms" => array(),
    "messages" => $messages
));
?>

        

