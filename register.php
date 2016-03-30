<?php
    $registration_type = filter_input(INPUT_POST,"register_type");
    if($registration_type == "1"){require 'register.student.php';}
    else{require 'register.company.php';}
?>

        

