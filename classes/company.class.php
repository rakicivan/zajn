<?php
include_once 'base.class.php';

class Company{
    
    private $baseObject;
    
    public function __construct() {
        $this->baseObject = new Base();
    }
    
    public function registerCompany($companyName, $companyID, $companyCity, $companyAddress, $companyPostalCode, $companyTribalState, $companyEmail, $companyPhone, $companyFax, $companyPerson, $companyPassword){
        if(empty($companyFax)){$companyFax = "NULL";}
        $currentDate = date("Y-m-d H:i:s",time());
        $query = "insert into companies(name,unique_ID,city,address,zip_code,tribal_state,email,phone_number,fax_number,contact_person,password,registered_at) values ('{$companyName}','{$companyID}',{$companyCity},'{$companyAddress}','{$companyPostalCode}',{$companyTribalState},'{$companyEmail}','{$companyPhone}','{$companyFax}','{$companyPerson}','{$companyPassword}','{$currentDate}')";
        $result = $this->baseObject->query("INSERT", $query);
        return $result;
    }
}
