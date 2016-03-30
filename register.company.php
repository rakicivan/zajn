<?php

$companyName = filter_input(INPUT_POST,"registerCompanyName",513);
$companyID = filter_input(INPUT_POST,"registerCompanyID",513);
$companyCity = filter_input(INPUT_POST,"registerCompanyCity",519);
$companyAddress = filter_input(INPUT_POST,"registerCompanyAddress",513);
$companyPostalCode = filter_input(INPUT_POST,"registerCompanyPostalCode",513);
$companyTribalState = filter_input(INPUT_POST,"registerCompanyTribalState",519);
$companyEmail = filter_input(INPUT_POST,"registerCompanyEmail",513);
$companyPhone = filter_input(INPUT_POST,"registerCompanyPhone",513);
$companyFax = filter_input(INPUT_POST,"registerCompanyFax",513); 
$companyPerson = filter_input(INPUT_POST,"registerCompanyPerson",513);
$companyPassword = filter_input(INPUT_POST,"registerCompanyPassword",513);
$companyConfirmation = filter_input(INPUT_POST,"registerCompanyConfirmation",513);  
$companyConditions = filter_input(INPUT_POST,"registerCompanyConditions");

$output = $validationObject->companyName($companyName,true);
if(!empty($output)){array_push($messages, $output);}

$output = $validationObject->companyOIB($companyID,true);
if(!empty($output)){array_push($messages, $output);}

$output = $validationObject->companyAddress($companyAddress,true);
if(!empty($output)){array_push($messages, $output);}

$output = $validationObject->companyPostalCode($companyPostalCode,true);
if(!empty($output)){array_push($messages, $output);}

$output = $validationObject->companyEmail($companyEmail,true);
if(!empty($output)){array_push($messages, $output);}

$output = $validationObject->companyNumberFax($companyPhone,"phone",true);
if(!empty($output)){array_push($messages, $output);}

$output = $validationObject->companyNumberFax($companyFax,"fax",false);
if(!empty($output)){array_push($messages, $output);}

$output = $validationObject->companyPerson($companyPerson,true);
if(!empty($output)){array_push($messages, $output);}

$output = $validationObject->password($companyPassword,"password",true);
if(!empty($output)){array_push($messages, $output);}

$output = $validationObject->password($companyConfirmation,"confirmation",true);
if(!empty($output)){array_push($messages, $output);}

if(count($messages)==0)
{
   $result = $companyObject->registerCompany($companyName, $companyID, $companyCity, $companyAddress, $companyPostalCode, $companyTribalState, $companyEmail, $companyPhone, $companyFax, $companyPerson, $companyPassword);

   if($result == 0)
   {
       array_push($messages,"Neuspješna registracija, pokušajte ponovo.");
   }
    else {
        array_push($messages,"Uspješna registracija. Prijavite se.");
    }
}
?>