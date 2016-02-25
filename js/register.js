//<editor-fold desc="Student registration">
var city_select = $("#registerCity");
var university_select = $("#registerUniversity");
var college_select = $("#registerCollege");
var study_type_select = $("#registerStudyType");
var subject_select = $("#registerSubject");
var study_years_select = $("#registerYears");
var homecity_select = $("#registerHomecity");
var dorm_select = $("#registerDorm");

if($("#btnStep1"))
 $("#btnStep1").click(function(){
    if(VALIDATION.isEmpty($("#id").val())) VALIDATION.setWrong($("#id"),$("#idMessage"),"Polje je obavezno!");
    else {VALIDATION.validateUniqueID();}
    
    if(VALIDATION.isEmpty($("#mobile").val())) VALIDATION.setWrong($("#mobile"),$("#mobileMessage"),"Polje je obavezno!");
    else if(!VALIDATION.validateMobile($("#mobile").val())) VALIDATION.setWrong($("#mobile"),$("#mobileMessage"),"Broj mobitela je neisplarnovg formata.");
    
    if($(".wrong").length > 0)
    {
        if(!VALIDATION.isPartOneFinished()) 
        {
            $("#btnStep1").attr("disabled","disabled");
        }
        return;
    }
    
    $("#register_step1").toggle();
    $("#register_step2").toggle();
    $("#student_type").toggle();
    initializeDataConnection();
});
if($("#btnStep2"))$("#btnStep2").click(function(){
    $("#register_step2").toggle();
    $("#register_step3").toggle();
});

var redovni = document.getElementsByName("full_time_student").item(0);
var vanredni = document.getElementsByName("full_time_student").item(1);

if(vanredni && redovni)vanredni.checked = redovni.checked = false;

if(redovni)
    redovni.addEventListener("change",function(){
    $("#register_step1").show();
    $("#id").attr("placeholder","Unesi broj x-ice");
},false);
if(vanredni)vanredni.addEventListener("change",function(){
    $("#register_step1").show();
    $("#id").attr("placeholder","Unesi broj indeksa");
},false);

function initializeDataConnection()
{
    disableSelect(university_select);
    disableSelect(college_select);
    disableInput($("#email"));
    disableSelect(study_type_select);
    disableSelect(subject_select);
    disableSelect(study_years_select);
    disableSelect(homecity_select);
    disableSelect(dorm_select);
    
    $(city_select).change(function(){
        if($(city_select).val()===-1) 
        {
            disableSelect(university_select);
        }
        else 
        {
            REGISTER.getColleges();
            REGISTER.getUniversities();
            enableSelect(university_select);
        }
        disableSelect(college_select);
        disableInput($("#email"));
        disableSelect(study_type_select);
        disableSelect(subject_select);
        disableSelect(study_years_select);
        disableSelect(homecity_select);
        disableSelect(dorm_select);
        VALIDATION.validatePartTWO();
    });
    
    $(university_select).change(function(){
        if($(university_select).val() === -1) 
        {
            disableSelect(college_select);
        }
        else
        {
            REGISTER.getColleges();
        }
        disableInput($("#email"));
        disableSelect(study_type_select);
        disableSelect(subject_select);
        disableSelect(study_years_select);
        disableSelect(homecity_select);
        disableSelect(dorm_select);
        VALIDATION.validatePartTWO();
    });
    
    $(college_select).change(function(){
        if($(college_select).val()===-1) 
        {
            disableInput($("#email"));
        }
        else 
        {
            enableInput($("#email"));
            REGISTER.getTypesOfStudy();
        }
        disableSelect(study_type_select);
        disableSelect(subject_select);
        disableSelect(study_years_select);
        disableSelect(homecity_select);
        disableSelect(dorm_select);
        VALIDATION.validatePartTWO();
    });
    
    $("#email").blur(function(){
        if($(this).val() === "")
        {
            disableSelect(study_type_select);
           
        }
        else
        {
            if($(this).val() === "") return; 
   
            if(VALIDATION.validateEmail(REGISTER.getSelectedCollegeDomain(college_select),$(this).val())) VALIDATION.setCorrect($(this),$("#emailMessage"));                     
            else VALIDATION.setWrong($(this),$("#emailMessage"),"E-mail adresa nije ispravna.");                                                                                                                                                                                                                            
            if($("#email").attr("class")==="correct")
            {
                enableSelect(study_type_select);
            }
               enableSelect(study_type_select);
        }
        disableSelect(subject_select);
        disableSelect(study_years_select);
        disableSelect(homecity_select);
        disableSelect(dorm_select);
        VALIDATION.validatePartTWO();
    });
    
    $(study_type_select).change(function(){
        if($(study_type_select).val()===-1)
        {
            disableSelect(subject_select);       
        }
        else 
        {
            REGISTER.getSubjects();
        }
        disableSelect(study_years_select);
        disableSelect(homecity_select);
        disableSelect(dorm_select);
        VALIDATION.validatePartTWO();
    });
    
    $(subject_select).change(function(){
        if($(subject_select).val()===-1)
        {
            disableSelect(study_years_select);
        }
        else {
            REGISTER.getYears();
        }
        disableSelect(homecity_select);
        disableSelect(dorm_select);
        VALIDATION.validatePartTWO();
    });
    
    $(study_years_select).change(function(){
        if($(study_years_select).val()===-1)
        {
            disableSelect(homecity_select);
        }
        else 
        {
            enableSelect(homecity_select);
        }
        disableSelect(dorm_select);
        VALIDATION.validatePartTWO();
    });
    
    $(homecity_select).change(function(){
        if($(homecity_select).val()===-1)
        {
            disableSelect(dorm_select);
        }
        else {
            REGISTER.getDorms();
        }
        VALIDATION.validatePartTWO();
    });
    
}

function disableSelect(select)
{
    $(select).attr("disabled","disabled");
    $(select).val(-1);
}

function enableSelect(select)
{
    $(select).removeAttr("disabled");
    $(select).val(-1);
}

function enableInput(input)
{
    $(input).removeAttr("disabled");
    $(input).val("");
    $(input).removeClass("wrong correct");
}

function disableInput(input)
{
    $(input).attr("disabled","disabled");
    $(input).val("");
    $(input).removeClass("wrong correct");
}

function getData_ajax(url, data, successFunction, errorFunction, method)
{
    $.ajax({
        url: url,
        type: method,
        datatype: "json",
        contenttype: "application/json",
        data: data,
        success: successFunction,
        error: errorFunction
    });
}

function whenGetData_ajax(url, data, method)
{
    return $.ajax({
        url: url,
        type: method,
        datatype: "json",
        contenttype: "application/json",
        data: data
    });
}



var VALIDATION  = VALIDATION || {
     full_time_student: false,
     isFullTimeStudent: function()
     {
         if(redovni.checked === true) this.full_time_student = true;
         else this.full_time_student = false;
         return this.full_time_student;
     },
     validateXica: function(value)
     {
         var output = false;
         if(value.substr(0,6)==="601983" && value.length === 19 && /^[0-9]{19}$/.test(value))
         {
             if(value[7]==="1") output = true;
             else output = false;
         }
         else output = false;
         
         return output;
     },
     validateMobile:function(value){
         var output  = false;
         if(/^[0-9]{5,15}$/.test(value))
         {
             output = true;
         }
         else output = false;
         return output;
     },
     setCorrect: function(element, messageElement)
     {
         $(element).addClass("correct");
         $(messageElement).html("");
     },
     setWrong: function(element, messageElement, text)
     {
         $(element).addClass("wrong");
         $(messageElement).html(text);
     },
     reset: function(element, messageElement)
     {
         $(element).removeClass("correct wrong");
         $(messageElement).html("");
     },
     isEmpty: function(value)
     {
         return value === "";
     },
     isPartOneFinished: function(){
         var output = false;
         if($("#id").val() !== "" && $("#id").attr("class") === "correct") output = true;
         
         if(output && $("#mobile").val() !== "" && $("#mobile").attr("class") === "correct") output = true;
         else output = false;
         
         return output;
     },
     validateEmail: function(allowed_domain, value){
         var emailArray = value.split("@");
         if(emailArray[1] != allowed_domain) return false;
         else
         {
             if(/^[A-Za-z-_0-9]+$/.test(emailArray[0])) return true;
             else return false;
         }
     },
     validateIndex: function(value)
     {
         if(/^[A-Z0-9-\/]{1,20}$/.test(value)) return true;
         else return false;
     },
     isPartTwoFinished: function(){
         var output = true;
         if($(city_select).val() === -1) output = false;
         if($(university_select).val() === -1) output = false;
         if($(college_select).val() === -1) output = false;
         if($.trim($("#email").val()).length === 0) output = false;
         if($(study_type_select).val() === -1) output = false;
         if($(subject_select).val() === -1) output = false;
         if($(study_years_select).val() === -1) output = false;
         return output;
     },
     validatePartTWO: function()
     {
         if(VALIDATION.isPartTwoFinished())$("#btnStep2").removeAttr("disabled");
         else $("#btnStep2").attr("disabled","disabled");
     },
     validateName: function(value){
         var pattern = /^[A-ZČĆŽŠĐ]{1}[a-zšđčćž]{1,50}$/;
         if(pattern.test(value)) return true;
         else return false;
     },
     validateSecret: function(value)
     {
         var pattern = /^[A-ZČĆŽŠĐa-zšđčćž]{1,50}$/;
         if(pattern.test(value)) return true;
         else return false;
     },
     validatePassword: function(value)
     {
         if(/^[A-Za-z0-9 _\-!$%&\/()=?*@[\];:~°\{\}]{1,20}$/.test(value)) return true;
         else return false;
     },
     validatePasswordLetters:function(value){
         if(/[a-zA-Z]+/.test(value)) return true;
         else return false;
     },
     validatePasswordNumbers: function(value){
         if(/[0-9]{2,}/.test(value)) return true;
         else return false;
     },
     isFinalPartFinished: function()
     {                 
         if($("#birthDate").val()==="")VALIDATION.setWrong($("#birthDate"),$("#birthDateMessage"),"Datum je obavezno polje.");
         else if(!VALIDATION.validateDate($("#birthDateReal").val()))VALIDATION.setWrong($("#birthDate"),$("#birthDateMessage"),"Datum nije ispravnog formata.");
         
         if($("#gender").val()==="-1")VALIDATION.setWrong($("#gender"),$("#genderMessage"),"Spol je obavezno polje.");
         
         if($("#name").val()==="")VALIDATION.setWrong($("#name"),$("#nameMessage"),"Ime je obavezno polje.");
         else if(!VALIDATION.validateName($("#name").val())) VALIDATION.setWrong($("#name"),$("#nameMessage"),"Ime je pogrešnog formata");
         
         if($("#surname").val()==="")VALIDATION.setWrong($("#surname"),$("#surnameMessage"),"Prezime je obavezno polje.");
         else if(!VALIDATION.validateName($("#surname").val())) VALIDATION.setWrong($("#surname"),$("#surnameMessage"),"Prezime je pogrešnog formata");
         
         if($("#secret").val()==="")VALIDATION.setWrong($("#secret"),$("#secretMessage"),"Tajna riječ je obavezno polje.");
         else if(!VALIDATION.validateSecret($("#secret").val()))VALIDATION.setWrong($("#secret"),$("#secretMessage"),"Tajna riječ je pogrešnog formata. Dozvoljena je samo jedna riječ bez razmaka.");
         
         if($("#password").val()==="")VALIDATION.setWrong($("#password"),$("#passwordMessage"),"Lozinka je obavezno polje.");
         else if(!VALIDATION.validatePassword($("#password").val()))VALIDATION.setWrong($("#password"),$("#passwordMessage"),"Lozinka je pogrešnog formata. Ne koristite hrvatske znakove.");
         else if(!VALIDATION.validatePasswordLetters($("#password").val()))VALIDATION.setWrong($("#password"),$("#passwordMessage"),"Lozinka mora sadržavati barem jedno slovo.");
         else if(!VALIDATION.validatePasswordNumbers($("#password").val()))VALIDATION.setWrong($("#password"),$("#passwordMessage"),"Lozinka mora sadržavati barem dva broja.");
         
         if($("#confirmation").val()==="")VALIDATION.setWrong($("#confirmation"),$("#confirmationMessage"),"Provjera lozinke je obavezno polje.");
         else if(!VALIDATION.validatePassword($("#confirmation").val()))VALIDATION.setWrong($("#confirmation"),$("#confirmationMessage"),"Provjera lozinke je pogrešnog formata. Ne koristite hrvatske znakove.");
         else if(!VALIDATION.validatePasswordLetters($("#confirmation").val()))VALIDATION.setWrong($("#confirmation"),$("#confirmationMessage"),"Potvrda lozinke mora sadržavati barem jedno slovo.");
         else if(!VALIDATION.validatePasswordNumbers($("#confirmation").val()))VALIDATION.setWrong($("#confirmation"),$("#confirmationMessage"),"Potvrda lozinke mora sadržavati barem dva broja.");
         
         if($("#password").val() != $("#confirmation").val() && (VALIDATION.validatePassword($("#password").val()) && VALIDATION.validatePassword($("#confirmation").val()) ))
         {
             VALIDATION.setWrong($("#password"),$("#passwordMessage"),"Lozinka i potvrda se ne poklapaju.");
             VALIDATION.setWrong($("#confirmation"),$("#confirmationMessage"),"");
         }
         
         if($("#conditions:checked").length === 0)VALIDATION.setWrong($("#conditions"),$("#conditionsMessage"),"Uvjeti moraju biti prihvaćeni prije registracije.");
     },
     validateUniqueID: function(){
        if(VALIDATION.isFullTimeStudent() && VALIDATION.validateXica($("#id").val())) VALIDATION.setCorrect($("#id"),$("#idMessage"));
        else if(VALIDATION.isFullTimeStudent() && !VALIDATION.validateXica($("#id").val()))VALIDATION.setWrong($("#id"),$("#idMessage"),"Broj x-ice je neispravan. Pokušajte ponovno.");
    
        if(!VALIDATION.isFullTimeStudent() && VALIDATION.validateIndex($("#id").val())) VALIDATION.setCorrect($("#id"),$("#idMessage"));
        else if(!VALIDATION.isFullTimeStudent() && !VALIDATION.validateXica($("#id").val()))VALIDATION.setWrong($("#id"),$("#idMessage"),"Broj indeksa je neispravan. Pokušajte ponovno.");
        
        REGISTER.doesIdExists("users","unique_ID",$("#id").val());
        
        
    },
    validateDate: function(value)
    {
        if(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) return true;
        else return true;
    },
    validateCompanyName: function(value){
        if(/^[0-9 A-ZČĆŽŠĐa-zčćžšđ.,\-@]{1,100}$/.test(value)) return true;
        else return false;
    },
    validateCompanyOIB: function(value){
        if(/^[0-9]{11}$/.test(value)) return true;
        else return false;
    },
    validateCompanyAddress: function(value){
        if(/^[0-9 A-ZČĆŽŠĐa-zčćžšđ.,\-_@()]{1,150}$/.test(value)) return true;
        else return false;
    },
    CheckOIB: function(oib) {
    oib = oib.toString();
    if (oib.length != 11) return false;

    var b = parseInt(oib, 10);
    if (isNaN(b)) return false;

    var a = 10;
    for (var i = 0; i < 10; i++) {
        a = a + parseInt(oib.substr(i, 1), 10);
        a = a % 10;
        if (a == 0) a = 10;
        a *= 2;
        a = a % 11;
    }
    var kontrolni = 11 - a;
    if (kontrolni == 10) kontrolni = 0;

    return kontrolni == parseInt(oib.substr(10, 1));
    },
    checkCompanyPart1: function(){
        var output = true;
        if($(".wrong").length > 0) output = false;
        else
        {
            if($("#registerCompanyName").val() == "") output = false;
            if($("#registerCompanyID").val() == "") output = false;
            if($("#registerCompanyCity").val() == -1) output = false;
            if($("#registerCompanyAddress").val() == "") output = false;
        }
        if(output == true) $("#btnRegisterCompanyStep1").removeAttr("disabled");
        else $("#btnRegisterCompanyStep1").attr("disabled", "disabled");
    },
    finalCheckCompanyPart1: function()
    {
        if($(".wrong").length > 0) return;
        else
        {
            VALIDATION.reset($("#registerCompanyName"),$("#registerCompanyNameMessage"));
            VALIDATION.reset($("#registerCompanyID"),$("#registerCompanyIDMessage"));
            VALIDATION.reset($("#registerCompanyAddress"),$("#registerCompanyAddressMessage"));
            
            if($("#registerCompanyName").val()==="")
                VALIDATION.setWrong($("#registerCompanyName"),$("#registerCompanyNameMessage"),"Ime tvrtke je obavezno");
            else
            {
                if(!VALIDATION.validateCompanyName($("#registerCompanyName").val()))
                    VALIDATION.setWrong($("#registerCompanyName"),$("#registerCompanyNameMessage"),"Ime tvrtke je obavezno");
                 
            }
            
            if($("#registerCompanyID").val()==="")VALIDATION.setWrong($("#registerCompanyID"),$("#registerCompanyIDMessage"),"OIB tvrtke je obavezan.");
            else
            {
                if(!VALIDATION.validateCompanyOIB($("#registerCompanyID").val())) VALIDATION.setWrong($("#registerCompanyID"),$("#registerCompanyIDMessage"),"OIB tvrtke nije ispravnog formata.");
                else
                {
                    if(!VALIDATION.CheckOIB($("#registerCompanyID").val())) VALIDATION.setWrong($("#registerCompanyID"),$("#registerCompanyIDMessage"),"OIB tvrtke nije valjan.");
                }
            }
           if(!$("#registerCompanyID").hasClass("wrong")) 
               $.when(whenGetData_ajax("json/doesExists.json.php",{table:"companies",column:"unique_ID",value:$("#registerCompanyID").val()},"post")).done(function(data){
                   if(data) VALIDATION.setWrong($("#registerCompanyID"),$("#registerCompanyIDMessage"),"OIB tvrtke već postoji u bazi. U slučaju greške kontaktirajte administratora.");
                   if($("#registerCompanyCity").val() == -1)VALIDATION.setWrong($("#registerCompanyCity"),$("#registerCompanyCityMessage"),"Sjedište tvrtke mora biti odabrano.");
                   
                   if($("#registerCompanyAddress").val() == "")VALIDATION.setWrong($("#registerCompanyAddress"),$("#registerCompanyAddressMessage"),"Adresa je obavezna.");
                   else if(!VALIDATION.validateCompanyAddress($("#registerCompanyAddress").val())){VALIDATION.setWrong($("#registerCompanyAddress"),$("#registerCompanyAddressMessage"),"Adresa je neispravnog formata.");


                   if($(".wrong").length != 0 && $("#registerCompanyCity") == -1)
                   {
                       return;
                   }
               }
               });
           
        }
    },
    checkCompanyPart2: function(){
        var output = true;
        
        if($(".wrong").length > 0) output = false;
        else{
            if($("#registerCompanyEmail").val()==="")output = false;
            else if(!VALIDATION.validateCompanyEmail($("#registerCompanyEmail").val())) output = false;
            
            if($("#registerCompanyPhone").val()==="") output = false;
            else if(!VALIDATION.validateCompanyNumberFax($("#registerCompanyPhone").val())) output = false;
            
            if($("#registerCompanyPerson").val()==="")output = false;
            else if(!VALIDATION.validateCompanyContactPerson($("#registerCompanyPerson").val())) output = false;
            
            if($("#registerCompanyPostalCode").val() === "") output = false;
            else if(!VALIDATION.validateCompanyPostalCode($("#registerCompanyPostalCode").val())) output = false;
            else{
                $.when(whenGetData_ajax("json/getPostalCode.json.php",{tribal_state:$("#registerCompanyTribalState").val()},"post")).done(function(data){
                  var postal_code = data;
            var inserted_code =$("#registerCompanyPostalCode").val();
            if(postal_code.substr(0,2) != inserted_code.substr(0,2)) output = false;
            
                if(output == true)$("#btnRegisterCompanyStep2").removeAttr("disabled");
                else $("#btnRegisterCompanyStep2").attr("disabled","disabled");
                });
            }
        }
        if(output == true)$("#btnRegisterCompanyStep2").removeAttr("disabled");
        else $("#btnRegisterCompanyStep2").attr("disabled","disabled");
    },
    validateCompanyEmail: function(value){
        if(/^[0-9A-Za-z \.\-_]{1,65}@{1}[0.9A-Za-z\.\-_]{1,250}\.{1}[A-Za-z\.\-_]{1,5}$/.test(value)) return true;
        else return false;
    },
    validateCompanyPostalCode:function(value){
        if(/^[0-9]{5}$/.test(value)) return true;
        else return false;
    },
    validateCompanyNumberFax:function(value)
    {
        if(/^[0-9\-\/ \+()]{5,30}$/.test(value)) return true;
        else return false;
    },
    validateCompanyContactPerson:function(value){
        if(/^[A-ZŽČĆŠĐa-zčćžšđ \-]{3,200}$/.test(value)) return true;
        else return false;
    },
    finalCheckCompanyPart2:function(){
            if($("#registerCompanyEmail").val()==="")VALIDATION.setWrong($("#registerCompanyEmail"),$("#registerCompanyEmailMessage"),"E-mail tvrtke je obavezan.");
            else if(!VALIDATION.validateCompanyEmail($("#registerCompanyEmail").val()))VALIDATION.setWrong($("#registerCompanyEmail"),$("#registerCompanyEmailMessage"),"E-mail tvrtke je pogrešno zapisan.");
            
            if($("#registerCompanyPhone").val()==="")VALIDATION.setWrong($("#registerCompanyPhone"),$("#registerCompanyPhoneMessage"),"Broj telefona je obavezan.");
            else if(!VALIDATION.validateCompanyNumberFax($("#registerCompanyPhone").val())) VALIDATION.setWrong($("#registerCompanyPhone"),$("#registerCompanyPhoneMessage"),"Broj telefona nije ispravnog formata.");
            
            if($("#registerCompanyPerson").val()==="")VALIDATION.setWrong($("#registerCompanyPerson"),$("#registerCompanyPersonMessage"),"Kontakt osobe je obavezan");
            else if(!VALIDATION.validateCompanyContactPerson($("#registerCompanyPerson").val())) VALIDATION.setWrong($("#registerCompanyPerson"),$("#registerCompanyPersonMessage"),"Kontakt osobe nije ispravnog formata.");

            if($("#registerCompanyPostalCode").val() === "") VALIDATION.setWrong($("#registerCompanyPostalCode"),$("#registerCompanyPostalCodeMessage"),"Poštanski broj je obavezan.");
            else if(!VALIDATION.validateCompanyPostalCode($("#registerCompanyPostalCode").val()))VALIDATION.setWrong($("#registerCompanyPostalCode"),$("#registerCompanyPostalCodeMessage"),"Poštanski broj je krivog formata.");
            else{
                $.when(whenGetData_ajax("json/getPostalCode.json.php",{tribal_state:$("#registerCompanyTribalState").val()},"post")).done(function(data){
                  var postal_code = data;
            var inserted_code =$("#registerCompanyPostalCode").val();
            if(postal_code.substr(0,2) != inserted_code.substr(0,2)) VALIDATION.setWrong($("#registerCompanyPostalCode"),$("#registerCompanyPostalCodeMessage"),"Poštanski broj nije valjan za navedenu županiju.");
               
               if($(".wrong").length > 0)
               {
                   return;
               }
               else
               {
                   $("#registerCompanyStep2").hide();
                    $("#registerCompanyStep3").show();
               }
                });
            }
            if($(".wrong").length > 0) return;
            else
            {
                $("#registerCompanyStep2").hide();
                $("#registerCompanyStep3").show();
            }
        },
        checkCompanyPart3:function(){
            var output = true;
            if($(".wrong").length > 0) output = false;
            else
            {
                if($("#registerCompanyPassword").val() === "") output = false;
                else if(!VALIDATION.validatePassword($("#registerCompanyPassword").val())) output = false;
                
                if($("#registerCompanyConfirmation").val() === "") output = false;
                else if(!VALIDATION.validatePassword($("#registerCompanyConfirmation").val())) output = false;
                alert($("#registerCompanyConditions:checked").length + "|"+ $("#registerCompanyConditions").is(":checked").length);
               if($("#registerCompanyConditions:checked").length === 1) output = true;
               else output = false;
            }
            if(output == true) $("#btnRegisterCompany").removeAttr("disabled");
            else $("#btnRegisterCompany").attr("disabled","disabled");
        },
        btnRegisterCompany: function(){
            VALIDATION.reset($("#registerCompanyPassword"),$("#registerCompanyPasswordMessage"));
            VALIDATION.reset($("#registerCompanyConfirmation"),$("#registerCompanyConfirmationMessage"));
            VALIDATION.reset($("#registerCompanyConditions"),$("#registerCompanyConditionsMessage"));
            
            if($("#registerCompanyPassword").val() === "") VALIDATION.setWrong($("#registerCompanyPassword"),$("#registerCompanyPasswordMessage"),"Lozinka je obavezna.");
            else if(!VALIDATION.validatePassword($("#registerCompanyPassword").val())) VALIDATION.setWrong($("#registerCompanyPassword"),$("#registerCompanyPasswordMessage"),"Lozinka nije u ispravnom formatu. Ne koristite hrvatske znakove.");
            else if(!VALIDATION.validatePasswordLetters($("#registerCompanyPassword").val()))VALIDATION.setWrong($("#registerCompanyPassword"),$("#registerCompanyPasswordMessage"),"Lozinka mora sadržavati barem jedno slovo.");
         else if(!VALIDATION.validatePasswordNumbers($("#registerCompanyPassword").val()))VALIDATION.setWrong($("#registerCompanyPassword"),$("#registerCompanyPasswordMessage"),"Lozinka mora sadržavati barem dva broja.");
                
                if($("#registerCompanyConfirmation").val() === "")VALIDATION.setWrong($("#registerCompanyConfirmation"),$("#registerCompanyConfirmationMessage"),"Potvrda lozinke je obavezna.");
                else if(!VALIDATION.validatePassword($("#registerCompanyConfirmation").val()))VALIDATION.setWrong($("#registerCompanyConfirmation"),$("#registerCompanyConfirmationMessage"),"Potvrda lozinke nije u ispravnom formatu. Ne koristite hrvatske znakove.");
                else if(!VALIDATION.validatePasswordLetters($("#registerCompanyConfirmation").val()))VALIDATION.setWrong($("#registerCompanyConfirmation"),$("#registerCompanyConfirmationMessage"),"Potvrda lozinke mora sadržavati barem jedno slovo.");
         else if(!VALIDATION.validatePasswordNumbers($("#registerCompanyConfirmation").val()))VALIDATION.setWrong($("#registerCompanyConfirmation"),$("#registerCompanyConfirmationMessage"),"Potvrda lozinke mora sadržavati barem dva broja.");
         
               if($(".wrong").length == 0)
               {
                   if($("#registerCompanyPassword").val()!=$("#registerCompanyConfirmation").val())
                   {
                       VALIDATION.setWrong($("#registerCompanyPassword"),$("#registerCompanyPasswordMessage"),"Lozinka i potvrda lozinke se ne poklapaju.");
                       VALIDATION.setWrong($("#registerCompanyConfirmation"),$("#registerCompanyConfirmationMessage"),"");
                   }
               }
               if($("#registerCompanyConditions:checked").length != 1) VALIDATION.setWrong($("#registerCompanyConditions"),$("#registerCompanyConditionsMessage"),"Potrebno je potvrditi uvjete korištenja.");
         
        if($(".wrong").length == 0 && $("#registerCompanyConditions:checked").length === 1)  
            $("#frmRegister").submit();
            
        }
 };

var REGISTER = REGISTER || {
    emailDomain: new Array(),
    maxYears: new Array(),
    getSelectedCollegeDomain: function(select)
    {
        var selected_college = $(select).val();
        for(var i = 0; i < this.emailDomain.length; i++)
        {
            if(selected_college === this.emailDomain[i].college_ID)
            {
                return this.emailDomain[i].college_domain;
            }
        }
    },
    getSelectedSubjectYears: function(select){
        var selected = $(select).val();
        for(var i = 0; i < this.maxYears.length; i++)
        {
            if(selected === this.maxYears[i].subject_ID)
            {
                return this.maxYears[i].max_years;
            }
        }
    },
    getColleges: function()
    {
        var object = this;
        var city = $("#registerCity").val();
        var university = $("#registerUniversity").val();
        getData_ajax("json/getColleges.json.php",{city: city, university:university},colleges,errorFunction,"post");
        function colleges(data)
        {
            $("#registerCollege").empty();
            var first = "<option value=-1>Fakultet</option>";
            $("#registerCollege").append(first);
            
            var html = "";
            data.forEach(function(college){
                html += "<option value="+college.college_ID+">"+college.name+"</option>";
                object.emailDomain.push({college_ID: college.college_ID, college_domain: college.email_domain});
            });
            $("#registerCollege").append(html);
            enableSelect(college_select);
        }
        
        function errorFunction(error)
        {
            console.log(error.responseText);
            alert("Ajax error occured.");
        }
    },
    getTypesOfStudy: function(){
        var college = $(college_select).val();
        if(college === -1) return;
        
        
        getData_ajax("json/getTypesOfStudy.json.php",{college: college},typesOfStudy,errorFunction,"post");
        function typesOfStudy(data)
        {
            $("#registerStudyType").empty();
            var first = "<option value=-1>Vrsta studija</option>";
            $("#registerStudyType").append(first);
            
            var html = "";
            data.forEach(function(type){
                html += "<option value="+type.type_of_study_ID+">"+type.name+"</option>";
            });
            $("#registerStudyType").append(html);
        }
        
        
        function errorFunction(error)
        {
            console.log(error.responseText);
            alert("Ajax error occured.");
        }
    },
    getSubjects: function(){
        var college = $(college_select).val();
        var type_of_study = $(study_type_select).val();
        var object = this;
        getData_ajax("json/getSubjects.json.php",{college: college, type: type_of_study},subject,errorFunction,"post");
        
        function subject(data)
        {
            $(subject_select).empty();
            var first = "<option value=-1>Smjer</option>";
            $(subject_select).append(first);
            
            var html = "";
            data.forEach(function(subject){
                html += "<option value="+subject.subject_ID+">"+subject.name+"</option>";
                object.maxYears.push({subject_ID: subject.subject_ID, max_years:subject.max_years});
            });
            $(subject_select).append(html);
            enableSelect(subject_select);
        }
        
        function errorFunction(error)
        {
            console.log(error.responseText);
            alert("Ajax error occured.");
        }
    },
    getYears: function(){
        var maxYears = this.getSelectedSubjectYears($(subject_select));
        
         $(study_years_select).empty();
         var first = "<option value=-1>Godina studija</option>";
         $(study_years_select).append(first);
        
        var html = "";
        for(var i = 1; i <= maxYears; i++)
        {
            html += "<option id="+i+">"+i+". godina </option>";
        }
        $(study_years_select).append(html);
        enableSelect(study_years_select);
    },
    getDorms: function(){
        var city = $(city_select).val();
        
        getData_ajax("json/getDorms.json.php",{city: city},dorms,errorFunction,"post");
        
        function dorms(data){
             $(dorm_select).empty();
            var first = "<option value=-1>Studentski dom</option>";
            $(dorm_select).append(first);
            
            var html = "";
            data.forEach(function(dorm){
                html += "<option value="+dorm.dorm_ID+">"+dorm.name+"</option>";
            });
            $(dorm_select).append(html);
            enableSelect(dorm_select);
        }
        
        function errorFunction(error)
        {
            console.log(error.responseText);
            alert("Ajax error occured.");
        }
    },
    getUniversities: function()
    {
        var city = $(city_select).val();
        
        getData_ajax("json/getUniversities.json.php",{city:city},universities,errorFunction,"post");
        
        function universities(data)
        {
             $(university_select).empty();
            var first = "<option value=-1>Visoko učilište</option>";
            $(university_select).append(first);
            console.log(data);
            var html = "";
            data.forEach(function(university){
                html += "<option value="+university.university_ID+">"+university.name+"</option>";
            });
            $(university_select).append(html);
            enableSelect(university_select);
        }
        
        function errorFunction(error)
        {
            console.log(error.responseText);
            alert("Ajax error occured.");
        }
    },
    doesIdExists: function(table, column, value){
        getData_ajax("json/doesExists.json.php",{table:table, column:column, value:value}, xica, errorFunction, "post");
        
        function xica(data)
        {
            if(data == 1)
            {
                VALIDATION.reset($("#id"),$("#idMessage"));
                VALIDATION.setWrong($("#id"),$("#idMessage"),"ID studenta već postoji u bazi.");
            }
            else
            {
                VALIDATION.setCorrect($("#id"),$("#idMessage"));
            }
        }
        
        function errorFunction(error)
        {
            console.log(error.responseText);
            alert("Ajax error occured.");
        }
    },
    doesIOBExists: function(value){
        var table = "companies";
        var column = "unique_ID";
        
        getData_ajax("json/doesExists.json.php",{table:table, column:column, value:value}, oib, errorFunction, "post");
        
        function oib(data){
            VALIDATION.reset($("#registerCompanyID"),$("#registerCompanyIDMessage"));
            if(data) VALIDATION.setWrong($("#registerCompanyID"),$("#registerCompanyIDMessage"),"OIB tvrtke već postoji u bazi. U slučaju greške kontaktirajte administratora.");
            else VALIDATION.setCorrect($("#registerCompanyID"),$("#registerCompanyIDMessage")); 
            
            VALIDATION.checkCompanyPart1();
          
        }
        function errorFunction(error)
        {
            console.log(error.responseText);
            alert("Ajax error occured.");
        }
    }
    
};

$("#id").blur(function(){
    if($(this).val() === "") return; 
    
    VALIDATION.validateUniqueID();
    
    if(VALIDATION.isPartOneFinished()) $("#btnStep1").removeAttr("disabled");
    else $("#btnStep1").attr("disabled","disabled");
});

$("#id").focus(function(){
    VALIDATION.reset($(this), $("#idMessage"));
});


$("#mobile").blur(function(){
   if($(this).val() === "") return; 
   if(VALIDATION.validateMobile($(this).val())) VALIDATION.setCorrect($(this),$("#mobileMessage"));
   else VALIDATION.setWrong($(this),$("#mobileMessage"),"Broj mobitela je neispravan.");
   
   if(VALIDATION.isPartOneFinished()) $("#btnStep1").removeAttr("disabled");
   else $("#btnStep1").attr("disabled","disabled");
});

$("#mobile").focus(function(){
    VALIDATION.reset($(this), $("#mobileMessage"));
});


$("#email").focus(function(){
    VALIDATION.reset($(this), $("#emailMessage"));
});

$("#name").blur(function(){
    if($(this).val() === "") return; 
    if(VALIDATION.validateName($(this).val()))VALIDATION.setCorrect($(this),$("#nameMessage"));
    else VALIDATION.setWrong($(this),$("#nameMessage"),"Ime je neispravno.");
});

$("#name").focus(function(){
    VALIDATION.reset($(this), $("#nameMessage"));
});

$("#surname").blur(function(){
    if($(this).val() === "") return; 
    if(VALIDATION.validateName($(this).val()))VALIDATION.setCorrect($(this),$("#surnameMessage"));
    else VALIDATION.setWrong($(this),$("#surnameMessage"),"Prezime je neispravno.");
});

$("#surname").focus(function(){
    VALIDATION.reset($(this), $("#surnameMessage"));
});

$("#secret").blur(function(){
    if($(this).val() === "") return; 
    if(VALIDATION.validateSecret($(this).val()))VALIDATION.setCorrect($(this),$("#secretMessage"));
    else VALIDATION.setWrong($(this),$("#secretMessage"),"Tajna riječ je neispravna.");
});

$("#secret").focus(function(){
    VALIDATION.reset($(this), $("#secretMessage"));
});

$("#password").blur(function(){
    if($(this).val() === "") return; 
    
    if(VALIDATION.validatePassword($(this).val()))VALIDATION.setCorrect($(this),$("#passwordMessage"));
    else VALIDATION.setWrong($(this),$("#passwordMessage"),"Lozinka je neispravna. Molimo ne koristiti hrvatske znakove.");
    
    if(!$("#password").hasClass("wrong") && !VALIDATION.validatePasswordLetters($("#password").val())){ VALIDATION.reset($("#password")
    ,$("#passwordMessage"));
        VALIDATION.setWrong($("#password")
    ,$("#passwordMessage"),"Lozinka mora sadržavati barem jedno slovo.");
}
    else if(!$("#password").hasClass("wrong") && VALIDATION.validatePasswordLetters($("#password").val()))VALIDATION.setCorrect($("#password"),$("#passwordMessage"));
    
    if(!$("#password").hasClass("wrong") && !VALIDATION.validatePasswordNumbers($("#password").val()))
    {
        VALIDATION.reset($("#password")
    ,$("#passwordMessage"));
        VALIDATION.setWrong($("#password")
    ,$("#passwordMessage"),"Lozinka mora sadržavati barem dva broja.");
}
    else if(!$("#password").hasClass("wrong") && VALIDATION.validatePasswordNumbers($("#password").val()))VALIDATION.setCorrect($("#password"),$("#passwordMessage"));
});

$("#password").focus(function(){
    VALIDATION.reset($(this), $("#passwordMessage"));
});

$("#confirmation").blur(function(){
    if($(this).val() === "") return; 
    if(VALIDATION.validatePassword($(this).val()))VALIDATION.setCorrect($(this),$("#confirmationMessage"));
    else VALIDATION.setWrong($(this),$("#confirmationMessage"),"Potvrda lozinke je neispravna. Molimo ne koristiti hrvatske znakove.");
    
    if(!$(this).hasClass("wrong") && !VALIDATION.validatePasswordLetters($(this).val()))
    {
        VALIDATION.reset($("#confirmation")
    ,$("#confirmationMessage"));
        VALIDATION.setWrong($(this)
    ,$("#confirmationMessage"),"Potvrda lozinke mora sadržavati barem jedno slovo.");
}
    else if(!$(this).hasClass("wrong") && VALIDATION.validatePasswordLetters($(this).val()))VALIDATION.setCorrect($(this),$("#confirmationMessage"));
    
    if(!$(this).hasClass("wrong") && !VALIDATION.validatePasswordNumbers($(this).val()))
    {
        VALIDATION.reset($("#confirmation")
    ,$("#confirmationMessage"));
        VALIDATION.setWrong($(this)
    ,$("#confirmationMessage"),"Potvrda lozinke mora sadržavati barem dva broja.");
    }
    else if(!$(this).hasClass("wrong") && VALIDATION.validatePasswordNumbers($(this).val()))VALIDATION.setCorrect($(this),$("#confirmationMessage"));
});

$("#confirmation").focus(function(){
    VALIDATION.reset($(this), $("#confirmationMessage"));
});

$("#frmRegister").keyup(function(e){
    if(e.which === 13)
    {
        return;
    }
});

$("#btnRegister").click(function(e){
    
    VALIDATION.reset($("#birthDate"), $("#birthDateMessage"));
    VALIDATION.reset($("#gender"), $("#genderMessage"));
    VALIDATION.reset($("#name"), $("#nameMessage"));
    VALIDATION.reset($("#surname"), $("#surnameMessage"));
    VALIDATION.reset($("#secret"), $("#secretMessage"));
    VALIDATION.reset($("#password"), $("#passwordMessage"));
    VALIDATION.reset($("#confirmation"), $("#confirmationMessage"));
    VALIDATION.reset($("#conditions"), $("#conditionsMessage"));
    
    
    VALIDATION.isFinalPartFinished();
    if($(".wrong").length === 0) $("#frmRegister").submit();
});

$("#frmRegister").submit(function(e){
    if($(".wrong").length > 0) e.preventDefault();
});

$("#birthDate").datepicker({
    dateFormat: "dd.mm.yy.",
    altFormat: "yy-mm-dd",
    altField: "#birthDateReal",
    firstDay: 1,
    monthNames:["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studenti","Prosinac"],
    dayNamesMin:["Ned","Pon","Uto","Sri","Čet","Pet","Sub"],
    minDate:"-80y",
    maxDate:"-16y",
    changeYear: true,
    changeMonth: false,
    nextText: "Sljedeći",
    prevText: "Prethodni",
    yearRange:"-80:-16"
});


$("#birthDate").focus(function(){
    VALIDATION.reset($(this),$("#birthDateMessage"));
});

$("#gender").focus(function(){
    VALIDATION.reset($(this),$("#genderMessage"));
});

$("#conditions").focus(function(){
    VALIDATION.reset($(this),$("#conditionsMessage"));
});

//</editor-fold>

if($("#register_type_company"))
    $("#register_type_company").click(function(){
        if($("#register_type_company").is(":checked"))
        {
            $("#student_registration").hide();
            $("#company_registration").show();
            $("#registerCompanyStep1").show();
        }
    });

if($("#register_type_student"))
    $("#register_type_student").click(function(){
        if($("#register_type_student").is(":checked"))
        {
            $("#student_registration").show();
            $("#company_registration").hide();
            $("#registerCompanyStep1").hide();
            $("#registerCompanyStep2").hide();
            $("#registerCompanyStep3").hide();
        }     
    });


$("#registerCompanyName").blur(function(){
    if($(this).val() === "") {
        VALIDATION.checkCompanyPart1();
        return;
    }
    
    if(VALIDATION.validateCompanyName($(this).val())) VALIDATION.setCorrect($(this),$("#registerCompanyNameMessage"));
    else VALIDATION.setWrong($(this),$("#registerCompanyNameMessage"),"Ime tvrtke koristi zabranjene znakove.");
    
    VALIDATION.checkCompanyPart1();
});

$("#registerCompanyName").focus(function(){
    VALIDATION.reset($(this),$("#registerCompanyNameMessage"));
});

$("#registerCompanyID").blur(function(){
    if($(this).val() === "") 
    {
        VALIDATION.checkCompanyPart1();
        return;
    }
    
    if(VALIDATION.validateCompanyOIB($(this).val()))
    {
        if(!VALIDATION.CheckOIB($(this).val()))
            VALIDATION.setWrong($(this),$("#registerCompanyIDMessage"),"OIB tvrtke nije valjan.");
        else REGISTER.doesIOBExists($(this).val());
    }
    else VALIDATION.setWrong($(this),$("#registerCompanyIDMessage"),"OIB tvrtke nije ispravnog formata.");
    
    
});

$("#registerCompanyID").focus(function(){
    VALIDATION.reset($(this),$("#registerCompanyIDMessage"));
});

$("#registerCompanyAddress").blur(function(){
    if($(this).val() === "")
    {
        VALIDATION.checkCompanyPart1();
        return;
    }
    
    if(VALIDATION.validateCompanyAddress($(this).val()))VALIDATION.setCorrect($(this),$("#registerCompanyAddressMessage"));
    else VALIDATION.setWrong($(this),$("#registerCompanyAddressMessage"),"Adresa tvrtke sadrži zabranjene znakove.");
   
   VALIDATION.checkCompanyPart1();
    
});

$("#registerCompanyAddress").focus(function(){
     VALIDATION.reset($(this),$("#registerCompanyAddressMessage"));
});

$("#registerCompanyCity").change(function(){
    VALIDATION.checkCompanyPart1();
    
    getData_ajax("json/getTribalStateByCity.json.php",{city:$("#registerCompanyCity").val()},getTribalState, errorFunction, "post");
    
    function getTribalState(data)
    {
        $("#registerCompanyTribalState").empty();
        var html = "";
        data.forEach(function(tribal_state){
            html += "<option value='"+tribal_state.tribal_state_ID+"'>"+tribal_state.name+"</option>";
        });
        $("#registerCompanyTribalState").html(html);
    }
    function errorFunction(error)
    {
        console.log(error.responseText);
        alert("Ajax error occured.");
    }
});

if($("#btnRegisterCompanyStep1"))
    $("#btnRegisterCompanyStep1").click(function(e){
        VALIDATION.finalCheckCompanyPart1();
        if($(".wrong").length != 0 && $("#registerCompanyCity") == -1)
        {
            return;
        }
        
        $("#registerCompanyStep1").hide();
        $("#registerCompanyStep2").show();
    });

$("#registerCompanyPostalCode").blur(function(){
    
    if($(this).val()==""){
        VALIDATION.checkCompanyPart2();
        return;
    }
    
    if(VALIDATION.validateCompanyPostalCode($(this).val())){
        getData_ajax("json/getPostalCode.json.php",{tribal_state:$("#registerCompanyTribalState").val()},getPostalCode, errorFunction, "post");
        
        function getPostalCode(data)
        {
            var postal_code = data;
            var inserted_code =$("#registerCompanyPostalCode").val();
            if(postal_code.substr(0,2)===inserted_code.substr(0,2)){
                VALIDATION.setCorrect($("#registerCompanyPostalCode"),$("#registerCompanyPostalCodeMessage"));
            }
            else VALIDATION.setWrong($("#registerCompanyPostalCode"),$("#registerCompanyPostalCodeMessage"),"Poštanski broj ne odgovara.");
            VALIDATION.checkCompanyPart2();
        }
        
        function errorFunction(error)
        {
            console.log(error.responseText);
            alert("Ajax error occured.");
        }
        
    }
    else {
        VALIDATION.setWrong($(this), $("#registerCompanyPostalCodeMessage"),"Poštanski broj nije valjan. Unesite broj bez razmaka. (npr. XXXXX)");         VALIDATION.checkCompanyPart2();
    }
   
});

$("#registerCompanyPostalCode").focus(function(){
    VALIDATION.reset($(this),$("#registerCompanyPostalCodeMessage"));
});

$("#registerCompanyEmail").blur(function(){
    if($(this).val() === "") {
        VALIDATION.checkCompanyPart2();
        return;
    }
    
    if(VALIDATION.validateCompanyEmail($(this).val()))
    {
        VALIDATION.setCorrect($(this),$("#registerCompanyEmailMessage"));
    }
    else VALIDATION.setWrong($(this),$("#registerCompanyEmailMessage"),"E-mail adresa nije ispravnog formata.");
    
    VALIDATION.checkCompanyPart2();
});

$("#registerCompanyEmail").focus(function(){
    VALIDATION.reset($(this),$("#registerCompanyEmailMessage"));
});

$("#registerCompanyPhone").blur(function(){
    if($(this).val() === "") {
        VALIDATION.checkCompanyPart2();
        return;
    }
    
    if(VALIDATION.validateCompanyNumberFax($(this).val()))
    {
        VALIDATION.setCorrect($(this),$("#registerCompanyPhoneMessage"));
    }
    else VALIDATION.setWrong($(this),$("#registerCompanyPhoneMessage"),"Broj telefona nije ispravnog formata.");
    
    VALIDATION.checkCompanyPart2();
});

$("#registerCompanyPhone").focus(function(){
     VALIDATION.reset($(this),$("#registerCompanyPhoneMessage"));
});

$("#registerCompanyFax").blur(function(){
    if($(this).val() === "") {
        VALIDATION.checkCompanyPart2();
        return;
    }
    
    if(VALIDATION.validateCompanyNumberFax($(this).val()))
    {
        VALIDATION.setCorrect($(this),$("#registerCompanyFaxMessage"));
    }
    else VALIDATION.setWrong($(this),$("#registerCompanyFaxMessage"),"Broj faksa nije ispravnog formata.");
    VALIDATION.checkCompanyPart2();
});

$("#registerCompanyFax").focus(function(){
     VALIDATION.reset($(this),$("#registerCompanyFaxMessage"));
});

$("#registerCompanyPerson").blur(function(){
    if($(this).val() === "") {
        VALIDATION.checkCompanyPart2();
        return;
    }
    
    if(VALIDATION.validateCompanyContactPerson($(this).val()))
    {
        VALIDATION.setCorrect($(this),$("#registerCompanyPersonMessage"));
    }
    else VALIDATION.setWrong($(this),$("#registerCompanyPersonMessage"),"Ime i prezime kontakt osobe nije ispravnog formata.");
    
    VALIDATION.checkCompanyPart2();
});

$("#registerCompanyPerson").focus(function(){
    VALIDATION.reset($(this),$("#registerCompanyPersonMessage"));
});

$("#btnRegisterCompanyStep2").click(function(){
    if($(".wrong").length > 0) return;
    VALIDATION.finalCheckCompanyPart2();
});

$("#registerCompanyPassword").blur(function(){
    if($(this).val()===""){
        VALIDATION.checkCompanyPart3();
        return;
    }
    
    if(VALIDATION.validatePassword($(this).val()))
    {
        VALIDATION.setCorrect($(this),$("#registerCompanyPasswordMessage"));
    }
    else VALIDATION.setWrong($(this),$("#registerCompanyPasswordMessage"),"Lozinka nije ispravnog formata. NE koristite hrvatske znakove.");
    
    if(!$("#registerCompanyPassword").hasClass("wrong") && !VALIDATION.validatePasswordLetters($("#registerCompanyPassword").val()))
    {
        VALIDATION.reset($(this)
    ,$("#registerCompanyPasswordMessage"));
        VALIDATION.setWrong($("#registerCompanyPassword")
    ,$("#registerCompanyPasswordMessage"),"Lozinka mora sadržavati barem jedno slovo.");
}
    else if(!$("#registerCompanyPassword").hasClass("wrong") && VALIDATION.validatePasswordLetters($("#registerCompanyPassword").val()))VALIDATION.setCorrect($("#registerCompanyPassword"),$("#registerCompanyPasswordMessage"));
    
    if(!$("#registerCompanyPassword").hasClass("wrong") && !VALIDATION.validatePasswordNumbers($("#registerCompanyPassword").val()))
    {
        VALIDATION.reset($(this)
    ,$("#registerCompanyPasswordMessage"));
        VALIDATION.setWrong($("#registerCompanyPassword")
    ,$("#registerCompanyPasswordMessage"),"Lozinka mora sadržavati barem dva broja.");
    }
    else if(!$("#registerCompanyPassword").hasClass("wrong") && VALIDATION.validatePasswordNumbers($("#registerCompanyPassword").val()))VALIDATION.setCorrect($("#registerCompanyPassword"),$("#registerCompanyPasswordMessage"));
    
    VALIDATION.checkCompanyPart3();
});


$("#registerCompanyConfirmation").focus(function(){
    VALIDATION.reset($(this),$("#registerCompanyConfirmationMessage"));
});

$("#registerCompanyConfirmation").blur(function(){
    if($(this).val()===""){
        VALIDATION.checkCompanyPart3();
        return;
    }
    
    if(VALIDATION.validatePassword($(this).val()))
    {
        VALIDATION.setCorrect($(this),$("#registerCompanyConfirmationMessage"));
    }
    else VALIDATION.setWrong($(this),$("#registerCompanyConfirmationMessage"),"Potvrda lozinke nije ispravnog formata. NE koristite hrvatske znakove.");
    
    if(!$(this).hasClass("wrong") && !VALIDATION.validatePasswordLetters($(this).val()))
    {
        VALIDATION.reset($(this)
    ,$("#registerCompanyConfirmationMessage"));
        VALIDATION.setWrong($(this)
    ,$("#registerCompanyConfirmationMessage"),"Potvrda lozinke mora sadržavati barem jedno slovo.");
}
    else if(!$(this).hasClass("wrong") && VALIDATION.validatePasswordLetters($(this).val()))
        VALIDATION.setCorrect($(this),$("#registerCompanyConfirmationMessage"));
    
    if(!$(this).hasClass("wrong") && !VALIDATION.validatePasswordNumbers($(this).val()))
    {
        VALIDATION.reset($(this)
    ,$("#registerCompanyConfirmationMessage"));
        VALIDATION.setWrong($(this)
    ,$("#registerCompanyConfirmationMessage"),"Potvrda lozinke mora sadržavati barem dva broja.");
    }
    else if(!$(this).hasClass("wrong") && VALIDATION.validatePasswordNumbers($(this).val()))VALIDATION.setCorrect($(this),$("#registerCompanyConfirmationMessage"));
    VALIDATION.checkCompanyPart3();
});


$("#registerCompanyPassword").focus(function(){
    VALIDATION.reset($(this),$("#registerCompanyPasswordMessage"));
});

$("#btnRegisterCompany").click(function(){
    VALIDATION.btnRegisterCompany();        
});

$("#registerCompanyConditions").change(function(){
    VALIDATION.checkCompanyPart3();
});

$("#btnRegisterCompany").keyup(function(e){
    if(e.which === 13) return;
});


$("#btnGenerate").click(function(){
    TWIG.getTemplate("greeting.twig",{content:"text"},function(data){
        $("#twigTest").append(data);
    });
});