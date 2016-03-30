/* 
 IVRA - students network
Created by: IVRAdevIVAN
 */
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

function errorFunction(data){

    var data = data.responseText;
    alert("error: "+data);

}

$(document).ready(function(){
    
    $('[data-toggle="tooltip"]').tooltip({ container: 'body' });
    
    $('body').on('click', '.add_user_btn',function (event) {
        
        var object = $(this);
        var user_id = object.attr("data");
        
        var data = {
            add_user: "",
            add_user_id: user_id
        };
        
        if(user_id !== ""){
            getData_ajax("json/friends.json.php", data, successFunction, errorFunction, "post");
        }
        function successFunction(data){
            
//            alert(data);
            if(data == 1){
                
                object.parent().html("Kolega je dodan");
            }
            if(data == 0){
                object.parent().html("Kolega je već dodan");
            }
        }
    });
    
    $('body').on('click', '.dell_user_btn',function (event) {
        
        var object = $(this);
        var user_id = object.attr("data");
        
        var data = {
            dell_user: "",
            dell_user_id: user_id
        };
        
        if(user_id !== ""){
            getData_ajax("json/friends.json.php", data, successFunction, errorFunction, "post");
        }
        function successFunction(data){
            
//            alert(data);
            if(data == 1){
                
                object.parent().html("Kolega je obrisan");
            }
            else if(data == 0){
                object.parent().html("Kolega je već obrisan");
            } else{
                alert("Error: pokušajte ponovo!");
            }
            if(data == 2){
                
                // zapiši u error log
                console.log("Error: Friendship doesnt exist");
            }
        }
    });
});


$("#indexPicture").mouseenter(function(){
    $("#indexPicture + .profileChanger").fadeIn("slow");
});
$(".profileChanger").mouseleave(function(){
    $("#indexPicture + .profileChanger").fadeOut();
});
$(".profileChanger").mouseenter(function(){
    $(".user_avatar > .profileChanger").css("display","block");
});
