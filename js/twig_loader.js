var TWIG = TWIG || {
    getTemplate: function(json_url,template,parameters,type,callback){
        $.ajax({
            url:json_url,
            contenttype:"application/json",
            datatype:"json",
            method:type,
            data:{template:template,params:parameters},
            success: callback,
            error: function(error){
              //  console.log(error.responseText);
              //  alert("Twig template loading error.");
            },
            global: true
            
        });
    }
};