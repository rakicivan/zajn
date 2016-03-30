var REGISTER = REGISTER;
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
         if($(element).hasClass("wrong")) $(element).removeClass("wrong");
         
         $(element).addClass("correct");
         $(messageElement).html("");
     },
     setWrong: function(element, messageElement, text)
     {
         if($(element).hasClass("correct")) $(element).removeClass("correct");
         
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
         var output;
        
         if($(REGISTER.id).hasClass("wrong") || $(REGISTER.phone).hasClass("wrong")) output = false;
         else if($(REGISTER.id).val() === "" || $(REGISTER.phone).val() === "") output = false;
         else output = true;
         
         return output;
     },
     validateEmail: function(allowed_domain, value){
         var emailArray = value.split("@");
         if(emailArray.length < 2) return false;
         if(emailArray[1] != allowed_domain) return false;
         else
         {
             if(/^[A-Za-z-_0-9]+$/.test(emailArray[0])) return true;
             else return false;
         }
     },
     validateIndex: function(value)
     {
         if(/^[0-9]{10}$/.test(value)) return true;
         else return false;
     },
     isPartTwoFinished: function(){
         var output = true;
         if($(REGISTER.selectCityStudent).val() == -1) output = false;
         if($(REGISTER.selectUniversity).val() == -1) output = false;
         if($(REGISTER.selectCollege).val() == -1) output = false;
         if($(REGISTER.studentEmail).val() === "" || VALIDATION.validateEmail(REGISTER.getSelectedCollegeDomain($(REGISTER.selectCollege)),$(REGISTER.studentEmail).val()) === false) output = false;
         if($(REGISTER.selectStudyType).val() == -1) output = false;
         if($(REGISTER.selectSubject).val() == -1) output = false;
         if($(REGISTER.selectYears).val() == -1) output = false;
         if($(REGISTER.selectHomecity).val() == -1) output = false;
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
         if($(REGISTER.birthDate).val()==="")VALIDATION.setWrong($(REGISTER.birthDate),$(REGISTER.birthDateMessage),"Datum je obavezno polje.");
         else if(!VALIDATION.validateDate($(REGISTER.birthDateReal).val()))VALIDATION.setWrong($(REGISTER.birthDate),$(REGISTER.birthDateMessage),"Datum nije ispravnog formata.");
         
         if($(REGISTER.gender).val()==="-1")VALIDATION.setWrong($(REGISTER.gender),$(REGISTER.genderMessage),"Spol je obavezno polje.");
         
         if($(REGISTER.name).val()==="")VALIDATION.setWrong($(REGISTER.name),$(REGISTER.nameMessage),"Ime je obavezno polje.");
         else if(!VALIDATION.validateName($(REGISTER.name).val())) VALIDATION.setWrong($(REGISTER.name),$(REGISTER.nameMessage),"Ime je pogrešnog formata");
         
         if($(REGISTER.surname).val()==="")VALIDATION.setWrong($(REGISTER.surname),$(REGISTER.surnameMessage),"Prezime je obavezno polje.");
         else if(!VALIDATION.validateName($(REGISTER.surname).val())) VALIDATION.setWrong($(REGISTER.surname),$(REGISTER.surnameMessage),"Prezime je pogrešnog formata");
         
         if($(REGISTER.secret).val()==="")VALIDATION.setWrong($(REGISTER.secret),$(REGISTER.secretMessage),"Tajna riječ je obavezno polje.");
         else if(!VALIDATION.validateSecret($(REGISTER.secret).val()))VALIDATION.setWrong($(REGISTER.secret),$(REGISTER.secretMessage),"Tajna riječ je pogrešnog formata. Dozvoljena je samo jedna riječ bez razmaka.");
         
         if($(REGISTER.password).val()==="")VALIDATION.setWrong($(REGISTER.password),$(REGISTER.passwordMessage),"Lozinka je obavezno polje.");
         else if(!VALIDATION.validatePassword($(REGISTER.password).val()))VALIDATION.setWrong($(REGISTER.password),$(REGISTER.passwordMessage),"Lozinka je pogrešnog formata. Ne koristite hrvatske znakove.");
         else if(!VALIDATION.validatePasswordLetters($(REGISTER.password).val()))VALIDATION.setWrong($(REGISTER.password),$(REGISTER.passwordMessage),"Lozinka mora sadržavati barem jedno slovo.");
         else if(!VALIDATION.validatePasswordNumbers($(REGISTER.password).val()))VALIDATION.setWrong($(REGISTER.password),$(REGISTER.passwordMessage),"Lozinka mora sadržavati barem dva broja.");
         
         if($(REGISTER.password).val() !== $(REGISTER.confirmation).val())
         {
             VALIDATION.setWrong($("#confirmation"),$("#confirmationMessage"),"Lozinka i potvrda se ne poklapaju.");
         }
         
         if($("#conditions:checked").length === 0)VALIDATION.setWrong($(REGISTER.studentConditions),$(REGISTER.studentConditionsMessage),"Uvjeti moraju biti prihvaćeni prije registracije.");
     },
     validateUniqueID: function(){
        if(VALIDATION.isFullTimeStudent() && VALIDATION.validateXica($("#id").val())) VALIDATION.setCorrect($("#id"),$("#idMessage"));
        else if(VALIDATION.isFullTimeStudent() && !VALIDATION.validateXica($("#id").val()))VALIDATION.setWrong($("#id"),$("#idMessage"),"Broj x-ice je neispravan. Pokušajte ponovno.");
    
        if(!VALIDATION.isFullTimeStudent() && VALIDATION.validateIndex($("#id").val())) VALIDATION.setCorrect($("#id"),$("#idMessage"));
        else if(!VALIDATION.isFullTimeStudent() && !VALIDATION.validateIndex($("#id").val()))VALIDATION.setWrong($("#id"),$("#idMessage"),"JMBAG je neispravan. Pokušajte ponovno.");
        
        
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
            if($(REGISTER.companyName).val() == "") output = false;
            if($(REGISTER.registerCompanyID).val() == "") output = false;
            if($(REGISTER.registerCompanyCity).val() == -1) output = false;
            if($(REGISTER.registerCompanyAddress).val() == "") output = false;
        }
        if(output == true) $(REGISTER.btnRegisterCompanyStep1).removeAttr("disabled");
        else $(REGISTER.btnRegisterCompanyStep1).attr("disabled", "disabled");
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
               $.when(APP.whenGetData_ajax("json/doesExists.json.php",{table:"companies",column:"unique_ID",value:$("#registerCompanyID").val()},"post")).done(function(data){
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