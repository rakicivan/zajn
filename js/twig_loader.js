var TWIG = TWIG || {
    getTemplate: function(template,parameters,callback){
        $.ajax({
            url:"json/loadTwig.json.php",
            contenttype:"application/json",
            datatype:"json",
            data:{template:template,params:parameters},
            success: callback,
            error: function(error){
                console.log(error.responseText);
                alert("Twig template loading error.");
            }
            
        });
    }
};