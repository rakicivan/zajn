var APP = APP;
var VALIDATION = VALIDATION;
var TWIG = TWIG;
var REGISTER = REGISTER || {
    id: $("#id"),
    idMessage: $("#idMessage"),
    phone: $("#mobile"),
    phoneMessage: $("#mobileMessage"),
    birthDate: $("#birthDate"),
    birthDateMessage: $("#birthDateMessage"),
    birthDateReal: $("#birthDateReal"),
    name: $("#name"),
    nameMessage: $("#nameMessage"),
    surname: $("#surname"),
    gender: $("#gender"),
    genderMessage: $("#genderMessage"),
    surnameMessage: $("#surnameMessage"),
    secret: $("#secret"),
    secretMessage:$("#secretMessage"),
    password: $("#studentPassword"),
    passwordMessage: $("#passwordMessage"),
    confirmation: $("#confirmation"),
    confirmationMessage: $("#confirmationMessage"),
    studentConditions: $("#conditions"),
    studentConditionsMessage: $("#conditionsMessage"),
    frmRegister: $("#frmRegister"),
    btnRegisterStudent: $("#btnRegister"),
    selectCityStudent: $("#registerCity"),
    selectUniversity: $("#registerUniversity"),
    selectCollege: $("#registerCollege"),
    selectStudyType:$("#registerStudyType"),
    selectSubject: $("#registerSubject"),
    selectYears: $("#registerYears"),
    selectHomecity: $("#registerHomecity"),
    selectDorm: $("#registerDorm"),
    studentEmail: $("#email"),
    studentEmailMessage: $("#emailMessage"),
    btnStudentPart1: $("#btnStep1"),
    btnStudentPart2: $("#btnStep2"),
    studentType: $("#student_type"),
    frmStudentRegisterStep1: $("#register_step1"),
    frmStudentRegisterStep2: $("#register_step2"),
    frmStudentRegisterStep3: $("#register_step3"),
    emailDomain: new Array(),
    maxYears: new Array(),
    companyName:$("#registerCompanyName"),
    companyNameMessage:$("#registerCompanyNameMessage"),
    registerTypeCompany:$("#register_type_company"),
    registerTypeStudent:$("#register_type_student"),
    frmCompanyRegisterStep1:$("#registerCompanyStep1"),
    frmCompanyRegisterStep2:$("#registerCompanyStep2"),
    frmCompanyRegisterStep3:$("#registerCompanyStep3"),
    companyRegistrationPart:$("#company_registration"),
    studentRegistrationPart:$("#student_registration"),
    registerCompanyID:$("#registerCompanyID"),
    registerCompanyIDMessage:$("#registerCompanyIDMessage"),
    registerCompanyAddress:$("#registerCompanyAddress"),
    registerCompanyAddressMessage:$("#registerCompanyAddressMessage"),
    registerCompanyCity:$("#registerCompanyCity"),
    registerCompanyCityMessage:$("#registerCompanyCityMessage"),
    registerCompanyTribalState:$("#registerCompanyTribalState"),
    btnRegisterCompanyStep1:$("#btnRegisterCompanyStep1"),
    btnRegisterCompanyStep2:$("#btnRegisterCompanyStep2"),
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
            if(selected === this.maxYears[i].id)
            {
                return this.maxYears[i].years;
            }
        }
    },
    getColleges: function()
    {
        var city = $(REGISTER.selectCityStudent).val();
        var university = $(REGISTER.selectUniversity).val();
        APP.getData_ajax("json/getColleges.json.php",{city: city, university:university},colleges,errorFunction,"post");
        function colleges(data)
        {          
            REGISTER.emailDomain = new Array();
            data.forEach(function(college){
                REGISTER.emailDomain.push({"college_ID":college.id, "college_domain":college.domain});
            });
            
            $(REGISTER.selectCollege).empty();
            APP.showDataInSelect(data,$(REGISTER.selectCollege),"Fakultet");
            APP.enableSelect(REGISTER.selectCollege);
        }
        
        function errorFunction(error)
        {
            console.log(error.responseText);
            alert("Ajax error occured.");
        }
    },
    getTypesOfStudy: function(){
        var college = $(REGISTER.selectCollege).val();
        if(college === -1) return;
        
        
        APP.getData_ajax("json/getTypesOfStudy.json.php",{college: college},typesOfStudy,errorFunction,"post");
        function typesOfStudy(data)
        {       
            $(REGISTER.selectStudyType).empty();
            APP.showDataInSelect(data,$(REGISTER.selectStudyType),"Vrsta studija");
            APP.enableSelect(REGISTER.selectStudyType);
        }
        
        
        function errorFunction(error)
        {
            console.log(error.responseText);
            alert("Ajax error occured.");
        }
    },
    getSubjects: function(){
        var college = $(REGISTER.selectCollege).val();
        var type_of_study = $(REGISTER.selectStudyType).val();
        APP.getData_ajax("json/getSubjects.json.php",{college: college, type: type_of_study},subject,errorFunction,"post");
        
        function subject(data)
        {   
            REGISTER.maxYears = new Array();
            data.forEach(function(subject){
                REGISTER.maxYears.push({"id":subject.id,"years":subject.years});
            });
            
            $(REGISTER.selectSubject).empty();
            APP.showDataInSelect(data,$(REGISTER.selectSubject),"Smjer");
            APP.enableSelect(REGISTER.selectSubject);
            
        }
        
        function errorFunction(error)
        {
            console.log(error.responseText);
            alert("Ajax error occured.");
        }
    },
    getYears: function(){
        var maxYears = this.getSelectedSubjectYears(REGISTER.selectSubject);   
        var data = new Array();
        for(var i = 1; i <= maxYears; i++)
        {
            data.push({"id":i,"text":i+". godina"});
        }
                
        $(REGISTER.selectYears).empty();
        APP.showDataInSelect(data,$(REGISTER.selectYears),"Godina studija");
        APP.enableSelect(REGISTER.selectYears);
    },
    getDorms: function(){
        var city = $(REGISTER.selectCityStudent).val();
        
        APP.getData_ajax("json/getDorms.json.php",{city: city},dorms,errorFunction,"post");
        
        function dorms(data){
            $(REGISTER.selectDorm).empty();
            APP.showDataInSelect(data,$(REGISTER.selectDorm),"Studentski dom");
            APP.enableSelect(REGISTER.selectDorm);
        }
        
        function errorFunction(error)
        {
            console.log(error.responseText);
            alert("Ajax error occured.");
        }
    },
    getUniversities: function()
    {
        var city = $(REGISTER.selectCityStudent).val();
        APP.getData_ajax("json/getUniversities.json.php",{city:city},universities,errorFunction,"post");
        
        function universities(data)
        {
            $(REGISTER.selectUniversity).empty();
            APP.showDataInSelect(data,$(REGISTER.selectUniversity),"Visoko učilište");
            APP.enableSelect(REGISTER.selectUniversity);
        }
        
        function errorFunction(error)
        {
            console.log(error.responseText);
            alert("Ajax error occured.");
        }
    },
    doesIdExists: function(table, column, value, event){
        APP.getData_ajax("json/doesExists.json.php",{table:table, column:column, value:value}, xica, errorFunction, "post");
        
        function xica(data)
        {
            VALIDATION.reset($(REGISTER.id),$(REGISTER.idMessage));
            if(data == 1)
            {
                VALIDATION.setWrong($(REGISTER.id),$(REGISTER.idMessage),"ID studenta već postoji u bazi.");
            }
            else
            {
                VALIDATION.setCorrect($(REGISTER.id),$(REGISTER.idMessage));
                if(event === ""){
                    if(VALIDATION.isPartOneFinished()) $(REGISTER.studentPart1).removeAttr("disabled");
                    else $(REGISTER.studentPart1).attr("disabled","disabled");
                }
                else if(event === "click"){
                    $(REGISTER.frmStudentRegisterStep1).toggle();
                    $(REGISTER.frmStudentRegisterStep2).toggle();
                    $(REGISTER.studentType).toggle();
                    initializeDataConnection(); 
                }
                
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
        
        APP.getData_ajax("json/doesExists.json.php",{table:table, column:column, value:value}, oib, errorFunction, "post");
        
        function oib(data){
            VALIDATION.reset($(REGISTER.registerCompanyID),$(REGISTER.registerCompanyIDMessage));
            if(data) VALIDATION.setWrong($(REGISTER.registerCompanyID),$(REGISTER.registerCompanyIDMessage),"OIB tvrtke već postoji u bazi. U slučaju greške kontaktirajte administratora.");
            else VALIDATION.setCorrect($(REGISTER.registerCompanyID),$(REGISTER.registerCompanyIDMessage)); 
            
            VALIDATION.checkCompanyPart1();
          
        }
        function errorFunction(error)
        {
            console.log(error.responseText);
            alert("Ajax error occured.");
        }
    }
    
};
//<editor-fold desc="StudentRegistration">
 $(REGISTER.btnStudentPart1).click(function(){
    if(VALIDATION.isEmpty($(REGISTER.id).val())) VALIDATION.setWrong($(REGISTER.id),$(REGISTER.idMessage),"Polje je obavezno!");
    else {VALIDATION.validateUniqueID();}
    
    if(VALIDATION.isEmpty($(REGISTER.phone).val())) VALIDATION.setWrong($(REGISTER.phone),$(REGISTER.phoneMessage),"Polje je obavezno!");
    else if(!VALIDATION.validateMobile($(REGISTER.phone).val())) VALIDATION.setWrong($(REGISTER.phone),$(REGISTER.phoneMessage),"Broj mobitela je neispravnog formata.");
    
    if($(".wrong").length > 0)
    {
        $(REGISTER.btnStudentPart1).attr("disabled","disabled");
        return;
    }
    else
    {
        REGISTER.doesIdExists("users","unique_ID",$(this).val(),"click");
    }    
});
$(REGISTER.btnStudentPart2).click(function(){
    if(!VALIDATION.isPartTwoFinished()) 
    {
       return;  
    }
    
    VALIDATION.reset($(REGISTER.studentEmail),$(REGISTER.studentEmailMessage));
    
    APP.getData_ajax("json/doesExists.json.php",{table:"users",column:"email",value:$(REGISTER.studentEmail).val()},function(data){
        if(data == 1){
            VALIDATION.setWrong($(REGISTER.studentEmail),$(REGISTER.studentEmailMessage),"E-mail već postoji. Prijavite se ili pokušajte ponovno.");
        }
        else
        {
            $(REGISTER.frmStudentRegisterStep2).toggle();
            $(REGISTER.frmStudentRegisterStep3).toggle();
        }
    },function(error){
        console.log(error.responseText);
        alert("Error occured ajax");
    }, "post");
});

var redovni = document.getElementsByName("full_time_student").item(0);
var vanredni = document.getElementsByName("full_time_student").item(1);

if(vanredni && redovni)vanredni.checked = redovni.checked = false;

if(redovni)
    redovni.addEventListener("change",function(){
    $(REGISTER.frmStudentRegisterStep1).show();
    $(REGISTER.id).attr("placeholder","Unesi broj x-ice");
},false);
if(vanredni)vanredni.addEventListener("change",function(){
    
     $(REGISTER.frmStudentRegisterStep1).show();
    $(REGISTER.id).attr("placeholder","Unesi JMBAG");
},false);

function initializeDataConnection()
{
    APP.disableSelect(REGISTER.selectUniversity);
    APP.disableSelect(REGISTER.selectCollege);
    APP.disableInput(REGISTER.studentEmail);
    APP.disableSelect(REGISTER.selectStudyType);
    APP.disableSelect(REGISTER.selectSubject);
    APP.disableSelect(REGISTER.selectYears);
    APP.disableSelect(REGISTER.selectHomecity);
    APP.disableSelect(REGISTER.selectDorm);
    
    $(REGISTER.selectCityStudent).change(function(){
        if($(REGISTER.selectCityStudent).val()===-1) 
        {
            APP.disableSelect(REGISTER.selectUniversity);
            APP.disableSelect(REGISTER.selectCollege);
        }
        else 
        {
            REGISTER.getColleges();
            REGISTER.getUniversities();
        }
        APP.disableSelect(REGISTER.selectCollege);
        APP.disableInput(REGISTER.studentEmail);
        APP.disableSelect(REGISTER.selectStudyType);
        APP.disableSelect(REGISTER.selectSubject);
        APP.disableSelect(REGISTER.selectYears);
        APP.disableSelect(REGISTER.selectHomecity);
        APP.disableSelect(REGISTER.selectDorm);
        VALIDATION.validatePartTWO();
    });
    
    $(REGISTER.selectUniversity).change(function(){
        if($(REGISTER.selectUniversity).val() === -1) 
        {
            APP.disableSelect(REGISTER.selectCollege);
        }
        else
        {
            REGISTER.getColleges();
        }
        APP.disableInput(REGISTER.studentEmail);
        APP.disableSelect(REGISTER.selectStudyType);
        APP.disableSelect(REGISTER.selectSubject);
        APP.disableSelect(REGISTER.selectYears);
        APP.disableSelect(REGISTER.selectHomecity);
        APP.disableSelect(REGISTER.selectDorm);
        VALIDATION.validatePartTWO();
    });
    
    $(REGISTER.selectCollege).change(function(){
        if($(REGISTER.selectCollege).val()===-1) 
        {
            APP.disableInput(REGISTER.studentEmail);
        }
        else 
        {
            APP.enableInput(REGISTER.studentEmail);
            REGISTER.getTypesOfStudy();
        }
        APP.disableSelect(REGISTER.selectStudyType);
        APP.disableSelect(REGISTER.selectSubject);
        APP.disableSelect(REGISTER.selectYears);
        APP.disableSelect(REGISTER.selectHomecity);
        APP.disableSelect(REGISTER.selectDorm);
        VALIDATION.validatePartTWO();
    });
        
    function eventEmailValidation(){
        VALIDATION.reset($(REGISTER.studentEmail),$(REGISTER.studentEmailMessage));
        if($(this).val() === "")
        {
            APP.disableSelect(REGISTER.selectStudyType);
            APP.disableSelect(REGISTER.selectSubject);
            APP.disableSelect(REGISTER.selectYears);
            APP.disableSelect(REGISTER.selectHomecity);
            APP.disableSelect(REGISTER.selectDorm);
        }
        else
        { 
            if(VALIDATION.validateEmail(REGISTER.getSelectedCollegeDomain(REGISTER.selectCollege),$(this).val())) {
                APP.getData_ajax("json/doesExists.json.php",{table:"users",column:"email",value:$(REGISTER.studentEmail).val()},function(data){
                    if(data == 1){
                        VALIDATION.setWrong($(REGISTER.studentEmail),$(REGISTER.studentEmailMessage),"E-mail već postoji. Prijavite se ili pokušajte ponovno.");
                    }
                    else
                    {
                        VALIDATION.setCorrect($(REGISTER.studentEmail),$(REGISTER.studentEmailMessage));    
                        if($(REGISTER.studentEmail).attr("class")==="correct")
                        {
                            APP.enableSelect(REGISTER.selectStudyType);
                        }
                        VALIDATION.validatePartTWO();
                    }
                },function(error){
                    console.log(error.responseText);
                    alert("Error occured ajax");
                }, "post");
                                 
            }
            else VALIDATION.setWrong($(this),$(REGISTER.studentEmailMessage),"E-mail adresa nije ispravna.");                                                                                                                                
        }  
        VALIDATION.validatePartTWO();
    }
    $(REGISTER.studentEmail).keyup(eventEmailValidation);
    $(REGISTER.studentEmail).blur(eventEmailValidation);
    
    $(REGISTER.selectStudyType).change(function(){
        if($(this).val()===-1)
        {
            APP.disableSelect(REGISTER.selectSubject);       
        }
        else 
        {
            REGISTER.getSubjects();
        }
        APP.disableSelect(REGISTER.selectYears);
        APP.disableSelect(REGISTER.selectHomecity);
        APP.disableSelect(REGISTER.selectDorm);
        VALIDATION.validatePartTWO();
    });
    
    $(REGISTER.selectSubject).change(function(){
        if($(this).val()===-1)
        {
            APP.disableSelect(REGISTER.selectYears);
        }
        else {
            REGISTER.getYears();
        }
        APP.disableSelect(REGISTER.selectHomecity);
        APP.disableSelect(REGISTER.selectDorm);
        VALIDATION.validatePartTWO();
    });
    
    $(REGISTER.selectYears).change(function(){
        if($(this).val()===-1)
        {
            APP.disableSelect(REGISTER.selectHomecity);
        }
        else 
        {
            APP.enableSelect(REGISTER.selectHomecity);
        }
        APP.disableSelect(REGISTER.selectDorm);
        VALIDATION.validatePartTWO();
    });
    
    $(REGISTER.selectHomecity).change(function(){
        if($(this).val()===-1)
        {
            APP.disableSelect(REGISTER.selectDorm);
        }
        else {
            REGISTER.getDorms();
        }
        VALIDATION.validatePartTWO();
    });
    
}
function eventValidateID()
{
    if($(this).val() === "") 
    {
        VALIDATION.reset($(this),$(REGISTER.idMessage));
        return;
    } 
    
    VALIDATION.validateUniqueID();
    if(!$(this).hasClass("wrong"))
    {
        REGISTER.doesIdExists("users","unique_ID",$(this).val(),"");
    }
    else{
        if(VALIDATION.isPartOneFinished()) $(REGISTER.btnStudentPart1).removeAttr("disabled");
        else $(REGISTER.btnStudentPart1).attr("disabled","disabled");
    }    
    
}
$(REGISTER.id).keyup(eventValidateID);
$(REGISTER.id).blur(eventValidateID);

$(REGISTER.id).focus(function(){
    VALIDATION.reset($(this), $(REGISTER.idMessage));
});

function eventPhoneValidation(){
    if($(this).val() === ""){
        VALIDATION.reset($(this), $(REGISTER.phoneMessage));
        return;
   } 
   var currentInput = $(this);
   if(!VALIDATION.validateMobile($(this).val())){
       VALIDATION.setWrong($(this),$(REGISTER.phoneMessage),"Broj mobitela nije ispravan.");
       if(VALIDATION.isPartOneFinished()) $(REGISTER.btnStudentPart1).removeAttr("disabled");
       else $(REGISTER.btnStudentPart1).attr("disabled","disabled");
   } 
   else{
       APP.getData_ajax("json/doesExists.json.php",{table:"users",column:"mobile_number",value:$(this).val()},function(data){
           if(data){
               VALIDATION.setWrong($(currentInput),$(REGISTER.phoneMessage),"Broj mobitela postoji u bazi.");
               if(VALIDATION.isPartOneFinished()) $(REGISTER.btnStudentPart1).removeAttr("disabled");
               else $(REGISTER.btnStudentPart1).attr("disabled","disabled");
           }
           else{
                VALIDATION.setCorrect($(currentInput),$(REGISTER.phoneMessage));
                if(VALIDATION.isPartOneFinished()) $(REGISTER.btnStudentPart1).removeAttr("disabled");
                else $(REGISTER.btnStudentPart1).attr("disabled","disabled");
           }
       },function(error){
           console.log(error.responseText);
           alert("phone checking ajax error");
       },"post");
   }
   
}

$(REGISTER.phone).keyup(eventPhoneValidation);
$(REGISTER.phone).blur(eventPhoneValidation);

$(REGISTER.phone).focus(function(){
    VALIDATION.reset($(this), $(REGISTER.phoneMessage));
});


$(REGISTER.studentEmail).focus(function(){
    VALIDATION.reset($(this), $(REGISTER.studentEmailMessage));
});


function eventStudentNameValidation(){
    if($(this).val() === "")
    {
        VALIDATION.reset($(this), $(REGISTER.nameMessage));
        return;
    } 
    var inserted_name = $(this).val();
    var name_array = inserted_name.split(" ");
    while(name_array.indexOf("") != -1){
        name_array.splice(name_array.indexOf(""),1);
    }
    for(var  i = 0; i<name_array.length; i++){
        if(!VALIDATION.validateName(name_array[i])){
            VALIDATION.setWrong($(this),$(REGISTER.nameMessage),"Ime je neispravno.");
            return;
        }
        if(i == name_array.length-1){
            VALIDATION.setCorrect($(this),$(REGISTER.nameMessage));
        }
    }
}
$(REGISTER.name).keyup(eventStudentNameValidation);
$(REGISTER.name).blur(eventStudentNameValidation);


$(REGISTER.name).focus(function(){
    VALIDATION.reset($(this), $(REGISTER.nameMessage));
});

function eventStudentSurnameValidation(){
    if($(this).val() === ""){
        VALIDATION.reset($(this), $(REGISTER.surnameMessage));
        return;
    } 
    
    var inserted_name = $(this).val();
    var name_array = inserted_name.split(" ");
    while(name_array.indexOf("") != -1){
        name_array.splice(name_array.indexOf(""),1);
    }
    for(var  i = 0; i<name_array.length; i++){
        if(!VALIDATION.validateName(name_array[i])){
            VALIDATION.setWrong($(this),$(REGISTER.nameMessage),"Prezime je neispravno.");
            return;
        }
        if(i == name_array.length-1){
            VALIDATION.setCorrect($(this),$(REGISTER.nameMessage));
        }
    }
}
$(REGISTER.surname).keyup(eventStudentSurnameValidation);
$(REGISTER.surname).blur(eventStudentSurnameValidation);

$(REGISTER.surname).focus(function(){
    VALIDATION.reset($(this), $(REGISTER.surnameMessage));
});

function eventSecretValidation(){
    if($(this).val() === "") {
        VALIDATION.reset($(this), $(REGISTER.secretMessage));
        return;
    } 
    if(VALIDATION.validateSecret($(this).val()))VALIDATION.setCorrect($(this),$(REGISTER.secretMessage));
    else VALIDATION.setWrong($(this),$(REGISTER.secretMessage),"Tajna riječ je neispravna.");
}
$(REGISTER.secret).keyup(eventSecretValidation);
$(REGISTER.secret).blur(eventSecretValidation);

$(REGISTER.secret).focus(function(){
    VALIDATION.reset($(this), $(REGISTER.secretMessage));
});

function eventStudentPasswordValidation(){
    if($(this).val() === "") 
    {
        VALIDATION.reset($(this), $(REGISTER.passwordMessage));
        return;
    } 
    VALIDATION.reset($(this), $(REGISTER.passwordMessage));
    if(VALIDATION.validatePassword($(this).val())){
        if(!VALIDATION.validatePasswordLetters($(this).val())){ 
            VALIDATION.setWrong($(this), $(REGISTER.passwordMessage),"Lozinka mora sadržavati barem jedno slovo.");
        }
        else if(!VALIDATION.validatePasswordNumbers($(this).val())){
            VALIDATION.setWrong($(this), $(REGISTER.passwordMessage),"Lozinka mora sadržavati barem dva broja.");
        }
        else{
            VALIDATION.setCorrect($(this),$(REGISTER.passwordMessage));
        }
    }
    else VALIDATION.setWrong($(this),$(REGISTER.passwordMessage),"Lozinka je neispravna. Molimo ne koristiti hrvatske znakove.");
}
$(REGISTER.password).keyup(eventStudentPasswordValidation);
$(REGISTER.password).blur(eventStudentPasswordValidation);

$(REGISTER.password).focus(function(){
    VALIDATION.reset($(this), $(REGISTER.passwordMessage));
});

function eventStudentConfirmationValidation(){
    VALIDATION.reset($(this), $(REGISTER.confirmationMessage));
    if($(this).val()===$(REGISTER.password).val())VALIDATION.setCorrect($(this),$(REGISTER.confirmationMessage));
    else VALIDATION.setWrong($(this),$(REGISTER.confirmationMessage),"Lozinka i potvrda lozinke se ne poklapaju.");
}
$(REGISTER.confirmation).keyup(eventStudentConfirmationValidation);
$(REGISTER.confirmation).blur(eventStudentConfirmationValidation);

$(REGISTER.confirmation).focus(function(){
    VALIDATION.reset($(this), $(REGISTER.confirmationMessage));
});

$(REGISTER.frmRegister).keyup(function(e){
    if(e.which === 13)
    {
        return;
    }
});

$(REGISTER.btnRegisterStudent).click(function(e){

    VALIDATION.reset($(REGISTER.birthDate), $(REGISTER.birthDateMessage));
    VALIDATION.reset($(REGISTER.gender), $(REGISTER.genderMessage));
    VALIDATION.reset($(REGISTER.name), $(REGISTER.nameMessage));
    VALIDATION.reset($(REGISTER.surname), $(REGISTER.surnameMessage));
    VALIDATION.reset($(REGISTER.secret), $(REGISTER.surnameMessage));
    VALIDATION.reset($(REGISTER.password), $(REGISTER.passwordMessage));
    VALIDATION.reset($(REGISTER.confirmation), $(REGISTER.confirmationMessage));
    VALIDATION.reset($(REGISTER.studentConditions), $(REGISTER.studentConditionsMessage));
    
    
    VALIDATION.isFinalPartFinished();
    if($(".wrong").length === 0) $(REGISTER.frmRegister).submit();
});

$(REGISTER.frmRegister).submit(function(e){
    if($(".wrong").length > 0) e.preventDefault();
});

$(REGISTER.birthDate).datepicker({
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


$(REGISTER.birthDate).focus(function(){
    VALIDATION.reset($(this),$(REGISTER.birthDateMessage));
});

$(REGISTER.gender).focus(function(){
    VALIDATION.reset($(this),$(REGISTER.genderMessage));
});

$(REGISTER.studentConditions).focus(function(){
    VALIDATION.reset($(this),$(REGISTER.studentConditionsMessage));
});

//</editor-fold>

    $(REGISTER.registerTypeCompany).click(function(){
        if($(REGISTER.registerTypeCompany).is(":checked"))
        {
            $(REGISTER.studentRegistrationPart).hide();
            $(REGISTER.companyRegistrationPart).show();
            $(REGISTER.frmCompanyRegisterStep1).show();
        }
    });

    $(REGISTER.registerTypeStudent).click(function(){
        if($(REGISTER.registerTypeStudent).is(":checked"))
        {
            $(REGISTER.studentRegistrationPart).show();
            $(REGISTER.companyRegistrationPart).hide();
            $(REGISTER.frmCompanyRegisterStep1).hide();
            $(REGISTER.frmCompanyRegisterStep2).hide();
            $(REGISTER.frmCompanyRegisterStep3).hide();
        }     
    });

function eventCompanyNameValidation(){
    if($(this).val() === "") {
        VALIDATION.checkCompanyPart1();
        return;
    }
    
    if(VALIDATION.validateCompanyName($(this).val())) VALIDATION.setCorrect($(this),$(REGISTER.companyNameMessage));
    else VALIDATION.setWrong($(this),$(REGISTER.companyNameMessage),"Ime tvrtke koristi zabranjene znakove.");
    
    VALIDATION.checkCompanyPart1();
}
$(REGISTER.companyName).blur(eventCompanyNameValidation);
$(REGISTER.companyName).keyup(eventCompanyNameValidation);

$(REGISTER.companyName).focus(function(){
    VALIDATION.reset($(this),$(REGISTER.companyNameMessage));
});


function eventCompanyIDValidation(){
    if($(this).val() === "") 
    {
        VALIDATION.checkCompanyPart1();
        return;
    }
    
    if(VALIDATION.validateCompanyOIB($(this).val()))
    {
        if(!VALIDATION.CheckOIB($(this).val()))
            VALIDATION.setWrong($(this),$(REGISTER.registerCompanyIDMessage),"OIB tvrtke nije valjan.");
        else REGISTER.doesIOBExists($(this).val());
    }
    else VALIDATION.setWrong($(this),$(REGISTER.registerCompanyIDMessage),"OIB tvrtke nije ispravnog formata.");
}
$(REGISTER.registerCompanyID).blur(eventCompanyIDValidation);
$(REGISTER.registerCompanyID).keyup(eventCompanyIDValidation);

$(REGISTER.registerCompanyID).focus(function(){
    VALIDATION.reset($(this),$(REGISTER.registerCompanyIDMessage));
});

function eventCompanyAddress(){
    if($(this).val() === "")
    {
        VALIDATION.checkCompanyPart1();
        return;
    }
    
    if(VALIDATION.validateCompanyAddress($(this).val()))VALIDATION.setCorrect($(this),$(REGISTER.registerCompanyAddressMessage));
    else VALIDATION.setWrong($(this),$(REGISTER.registerCompanyAddressMessage),"Adresa tvrtke sadrži zabranjene znakove.");
   
    VALIDATION.checkCompanyPart1();
}
$(REGISTER.registerCompanyAddress).blur(eventCompanyAddress);
$(REGISTER.registerCompanyAddress).keyup(eventCompanyAddress);

$(REGISTER.registerCompanyAddress).focus(function(){
     VALIDATION.reset($(this),$(REGISTER.registerCompanyAddressMessage));
});

$(REGISTER.registerCompanyCity).change(function(){
    VALIDATION.checkCompanyPart1();
    
    APP.getData_ajax("json/getTribalStateByCity.json.php",{city:$(this).val()},getTribalState, errorFunction, "post");
    
    function getTribalState(data)
    {
        $(REGISTER.registerCompanyTribalState).empty();
        var html = "";
        data.forEach(function(tribal_state){
            html += "<option value='"+tribal_state.id+"'>"+tribal_state.text+"</option>";
        });
        $(REGISTER.registerCompanyTribalState).html(html);
    }
    function errorFunction(error)
    {
        console.log(error.responseText);
        alert("Ajax error occured.");
    }
});

$(REGISTER.registerCompanyCity).focus(function(){
    VALIDATION.reset($(this),$(REGISTER.registerCompanyCityMessage));
});

    $(REGISTER.btnRegisterCompanyStep1).click(function(e){
        VALIDATION.finalCheckCompanyPart1(); //ovo završiti
        if($(".wrong").length != 0 && $(REGISTER.registerCompanyCity).val() == -1)
        {
            return;
        }
        
        $(REGISTER.frmCompanyRegisterStep1).hide();
        $(REGISTER.frmCompanyRegisterStep2).show();
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

