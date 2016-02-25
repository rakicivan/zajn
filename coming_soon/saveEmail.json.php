<?php

include_once '../classes/base.class.php';

$email = filter_input(INPUT_POST,"email",FILTER_SANITIZE_STRING);
$baseObject = new Base();

if(!preg_match('/^[A-Za-z_\-.0-9]{1,65}@{1}[A-Za-z_\-.0-9]{1,250}\.{1}[A-Za-z_\-.0-9]{1,5}$/',$email))
{
    $output["success"] = 0;
    $output["data"] = "E-mail nije ispravnog formata.";
}
else
{
    $result = $baseObject->query("SELECT","select email from comming_soon_subscriptions where email = '{$email}'");
    if(count($result) == 1)
    {
        $output["success"] = 0;
        $output["data"] = "E-mail adresa '{$email}' već postoji u bazi.";
    }
    else
    {
        $currentTime = date("Y-m-d H:i:s", time());

        $result = $baseObject->query("INSERT","INSERT into comming_soon_subscriptions (email, time) values ('{$email}','{$currentTime}')");
        if($result == 0)
        {
            $output["success"] = 0;
            $output["data"] = "Dogodila se pogreška prilikom spremanja. Pokušajte ponovno.";
        }
     else {
            $output["success"] = 1;
            $output["data"] = "Tvoja e-mail adresa je spremljena.";
        }
    }
    
    
}
header("Content-type:application/json");
echo json_encode($output);

