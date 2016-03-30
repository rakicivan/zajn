<?php
include_once 'base.class.php';
include_once 'app.class.php';

class Validation
{
    private $allowed_email;
    private $baseObject;
    private $appObject;
    
    public function __construct() {
        $this->baseObject = new Base();
        $this->appObject = new App();
    }
    
    public function checkUniqueID($full_time_student, $value, $required)
    {
        if($required && empty($value))
        { 
            $output = "Polje broja ";
            $output .= $full_time_student ? "x-ice" : "indeksa";
            $output .= " je obavezno.";
            return $output;
        }
        if($full_time_student){ return $this->xica($value);}
    }
    
    public function xica($value)
    {
        $output = "";
        
        if(strlen($value)!=19){$output = "Unesite točan broj znamenaka x-ice.";}
        else
        {
            //601983 #1
            if($value[0] == "6" && $value[1] == "0" && $value[2] == "1" && $value[3] == "9" && $value[4] == "8" && $value[5] == "3" && $value[7] == "1")
            {
                $output = "";
            }
            else {$output = "Broj x-ice nije valjan, pokušajte ponovno.";}
        }
        return $output;
    }
    
    public function phoneNumber($value, $required)
    {
        $pattern = '/^[0-9]+$/';
        if($required && empty($value)){return "Broj mobitela je obavezan.";}
        elseif(!preg_match($pattern, $value)){return "Broj mobitela nije ispravan";}
        elseif($this->doesExists("users","mobile_number", $value)){return "Broj mobitela već postoji u bazi.";}
        return "";
    }
    
    public function email($value, $college, $required)
    {
        $this->getAllowedDomain($college);
        $emailArray = explode("@",$value);
        if($required && empty($value)){return "E-mail je obavezan.";}
        else if(!preg_match('/^[a-zA-Z0-9._-]+$/',$emailArray[0]) || strcmp($emailArray[1],$this->allowed_email)!=0){return "E-mail nije ispravno formatiran.";}
        return "";
    }
    
    public function birthdate($value, $required)
    {
        if($required && empty($value)){return "Datum rođenja je obavezan.";}
        else if(!preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/', $value))
        {
            return "Datum rođenja nije ispravnog formata!";
        }
        else
        {
            $insertedDate = date($value);
            $currentDate = date("Y-m-d", time());
            $difference = date_diff(date_create($insertedDate), date_create($currentDate),false);
            if(!($difference->y <= 60 && $difference->y >= 16))
            {
                return "Datum rođenja nije valjan.";
            }
        }
    }
    
    public function name_surname($value, $type, $required)
    {
        $addon = "";
        $nameArray = explode(" ",$value);
        
        if($required && empty($value)){$addon = " je obavezno polje.";}
        else{
            $output = true;
            for($i = 0; $i < count($nameArray); $i++)
            {
                if(!preg_match('/^[A-ZŠČĆŽĐ]{1}[a-zšđčćž ]+$/u',$nameArray[$i])){$output = false; break;}
            }
            if($output == false){$addon = " mora imati prvo veliko slovo.";}
        }
        
        if($type == "name" && !empty($addon)){$addon = "Ime".$addon;}
        else if($type == "surname" && !empty($addon)){$addon = "Prezime".$addon; }
        
        return $addon;
    }
    
    public function secretWord($value, $required)
    {
        if($required && empty($value)){return "Tajna riječ je obavezno polje.";}
        else if(strlen($value) < 3){return "Tajna riječ mora biti imati minimalno 3 znaka.";}
        else if(!preg_match('/^[a-zA-ZČĆŽŠĐčćžšđ0-9-]{1,50}$/u', $value)) {return "Tajna riječ nije ispravnog formata. Dozvoljena je samo jedna riječ bez razmaka.";}
        return "";
    }
    public function password($value,$type,$required)
    {
        $print = "";
        if($type == "password"){$print = "Lozinka";}
        else if($type == "confirmation"){$print = "Potvrda lozinke";}
        
        if($required && empty($value)){return "{$print} je obavezna.";}
        else if(strlen($value) < 6) {return "{$print} mora imati barem 6 znakova.";}
        else if(!preg_match('/^[A-Za-z0-9 _\-!$%&\/()=?*@[\];:~°\{\}]{1,20}$/',$value)){return "{$print} ima zabranjene znakove.";}
        else
        {
            if(!preg_match('/[a-zA-Z]+/',$value)){return "{$print} mora imati bar jedno slovo. (I ne koristiti hrvatske znakove.)";}
            if(!preg_match('/[0-9]{2,}/',$value)){return "{$print} mora imati bar dva broja.";}
        }
        return "";
    }
    
    public function confirmPassword($password1,$password2)
    {
        if(strcmp($password1,$password2)!=0){return "Lozinka i potvrda lozinke se ne podudaraju.";}
        return "";
    }
    
    public function getAllowedDomain($college)
    {
        if(empty($college) || $college == -1){return;}
        $results = $this->appObject->getValues("select email_domain from colleges where college_ID = {$college}");
        $this->allowed_email = $results[0]["email_domain"];
    }
    
    public function gender($value, $required)
    {
        if($required && $value == -1){return "Spol je obavezan.";}
        return "";
    }
    
    public function conditions($value)
    {
        if($value != "on"){return "Uvjeti korištenja moraju biti odabrani.";}
        return "";
    }
    
    public function doesExists($table, $column, $value)
    {
        $query = "select * from {$table} where {$column} =";
        if(is_string($value)){$query .= "'{$value}'";}
        else {$query .= "{$value}";}
        
        $result = $this->baseObject->query("SELECT", $query);
        if(count($result) == 1) {return 1;}
        else{return 0;}
    }
    
    public function CheckOIB($oib) {
	
	if ( strlen($oib) == 11 ) {
		if ( is_numeric($oib) ) {
			
			$a = 10;
			
			for ($i = 0; $i < 10; $i++) {
				
				$a = $a + intval(substr($oib, $i, 1), 10);
				$a = $a % 10;
				
				if ( $a == 0 ) { $a = 10; }
				
				$a *= 2;
				$a = $a % 11;
				
			}
			
			$kontrolni = 11 - $a;
			
			if ( $kontrolni == 10 ) { $kontrolni = 0; }
			
			return $kontrolni == intval(substr($oib, 10, 1), 10);
			
		} else {
			return false;
		}
		
	} else {
		return false;	
	}
	
    }

    public function companyName($value, $required)
    {
        if(empty($value) && $reguired ) {return "Ime tvrtke je obavezno.";}
        else if(!preg_match('/^[0-9 A-ZČĆŽŠĐa-zčćžšđ.,\-@]{1,100}$/u',$value)){return "Ime tvrtke nije valjanog formata!";}
        else {return "";}
    }

    public function companyOIB($value, $required)
    {
       if(empty($value) && $required ){return "OIB je obavezan.";}
       else if(!preg_match('/^[0-9]{11}$/', $value)){return "OIB nije ispravnog formata";}
       else if($this->doesExists("companies","unique_ID", $value)){return "OIB već postoji u bazi. Pokuštajte ponovno ili se prijavite.";}
       else{return "";}
    }

    public function companyAddress($value, $required)
    {
        if(empty($value) && $required){return "Adresa tvrtke je obavezna.";}
        else if(!preg_match('/^[0-9 A-ZČĆŽŠĐa-zčćžšđ.,\-_@()]{1,150}$/u',$value)){return "Adresa tvrtke sadrži zabranjene znakove.";}
        else{return "";}
    }

    public function companyPostalCode($value, $required)
    {
        if(empty($value) && $required){return "Poštanski broj je obavezan.";}
        else if(!preg_match('/^[0-9]{5}$/',$value)){return "Poštanski broj nije ispravnog formata. Upišite samo broj bez razmaka.";}
        else{return "";}
    }

    public function companyEmail($value, $required)
    {
        if(empty($value) && $required){return "E-mail je obavezan.";}
        else if(!preg_match('/^[0-9A-Za-z \.\-_]{1,65}@{1}[0.9A-Za-z\.\-_]{1,250}\.{1}[A-Za-z\.\-_]{1,5}$/', $value)){return "E-mail sadrži zabranjene znakove.";}
        else if($this->doesExists("companies","email", $value)){return "E-mail već postoji u bazi. Pokušajte sa novim ili se prijavite.";}
        else{return "";}
    }

    public function companyNumberFax($value,$type,$required)
    {
        $output = "";
        if(empty($value) && $required){$output = " je obavezan.";}
        else if(!empty($value) && !preg_match('/^[0-9\-\/ \+()]{5,30}$/', $value)){$output = " sadrži zabranjene znakove.";}

        if(!empty($output))
        {
            if($type == "phone"){$output = "Broj telefona".$output;}
            else if($type = "fax"){$output = "Broj faksa".$output;}
            else{$output = "UNKNOWN".$output;}
        }


        return $output;
    }

    public function companyPerson($value, $required)
    {
        if(empty($value) && $required){return "Kontakt osoba je obavezna.";}
        else if(!preg_match('/^[A-ZŽČĆŠĐa-zčćžšđ \-]{3,200}$/u', $value)){return "Kontakt osoba sadrži zabranjene znakove.";}
        else {return "";}
    }



}