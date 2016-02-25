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

$("#comingSoonEmail").blur(function(){
    var email = $("#comingSoonEmail").val();
    if(!/^[A-Za-z_\-.0-9]{1,65}@{1}[A-Za-z_\-.0-9]{1,250}\.{1}[A-Za-z_\-.0-9]{1,5}$/.test(email))
    {
        $(".alert-danger").fadeIn();
        $(".alert-danger").text("E-mail adresa nije ispravnog formata.");
       // $("#comingSoonEmail").focus();
        return;
    }
});

$("#comingSoonEmail").focus(function(){
    $(".alert").fadeOut();
});

$("#frmComingSoon").submit(function(e){
    e.preventDefault();
    if($(".alert-danger").is(":visible")) return;
    $(".alert").hide();
    var email = $("#comingSoonEmail").val();
    if(email == "")
    {
        $(".alert-danger").fadeIn();
        $(".alert-danger").text("Morate upisati e-mail adresu.");
        $("#comingSoonEmail").val("");
        return;
    }
    if(!/^[A-Za-z_\-.0-9]{1,65}@[A-Za-z_\-.0-9]{1,250}.[A-Za-z_\-.0-9]{1,5}$/.test(email))
    {
        $(".alert-danger").fadeIn();
        $(".alert-danger").text("E-mail adresa nije ispravnog formata.");
        $("#comingSoonEmail").val("");
        return;
    }
    getData_ajax("saveEmail.json.php",{email:email},coming_soon, errorFunction, "post");
    
    function coming_soon(data){
        if(data.success == 0)
        {
            $(".alert-danger").fadeIn("slow");
            $(".alert-danger").text(data.data);
            $("#comingSoonEmail").val("");
        }
        else if(data.success == 1)
        {
            $(".alert-success").fadeIn("slow");
            $(".alert-success").text(data.data);
            $("#frmComingSoon").hide();
        }
    }
    
    function errorFunction(error)
    {
        console.log(error.responseText);
        alert("An error occured");
    }
});



