var TWIG = TWIG;
var APP = APP || {
    
    disableSelect: function(select){
        
        $(select).attr("disabled","disabled");
        $(select).val(-1);
    },
    
    enableSelect: function(select){
        
        $(select).removeAttr("disabled");
        $(select).val(-1);
    },
    
    enableInput: function(input){
   
        $(input).removeAttr("disabled");
        $(input).val("");
        $(input).removeClass("wrong correct");
    },
    
    disableInput: function(input){
        
        $(input).attr("disabled","disabled");
        $(input).val("");
        $(input).removeClass("wrong correct");
    },
    
    getData_ajax: function(url, data, successFunction, errorFunction, method){
        
        $.ajax({
            url: url,
            type: method,
            datatype: "json",
            contenttype: "application/json",
            data: data,
            success: successFunction,
            error: errorFunction,
            global:true
        });
    },
    
    whenGetData_ajax: function(url, data, method){
        
        return $.ajax({
            url: url,
            type: method,
            datatype: "json",
            contenttype: "application/json",
            data: data
        });
    },
    showDataInSelect: function(data, where, select_text)
    {
        $(where).empty();
        var first = "<option value=-1>"+select_text+"</option>";
        $(where).append(first);

        TWIG.getTemplate("json/loadTwigSelectRegistration.json.php","registration.select.options.twig",{array:data},"post",function(data){
            $(where).append(data);
        });
    }
    
};


$(document).ajaxStart(function(e){
    Offline.check();
    $(e.target).addClass("wait");
    $(e.target).attr("disabled","disabled");
}).ajaxStop(function(e){
    $(e.target).removeClass("wait"); 
    $(e.target).removeAttr("disabled");
});

Offline.options = {
    checkOnLoad: false,
    interceptRequests: true,
    reconnect: false,
    requests: true
};

$(document).ready(function() {
    var script_bar_Open = false;
    $("#script_menu").click(function() {
       if(script_bar_Open) $("#script_menu ul").stop().slideUp(500), script_bar_Open = false;
       else $("#script_menu ul").stop().slideDown(500), script_bar_Open = true;
    });
});