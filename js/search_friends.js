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
    
    $('body').on('keyup', '#search_friends',function (event) {
        
        var object = $(this);
        var input = object.val();
        
        var data = {
            search_user: "",
            search_user_input: input
        };
        
        if(input !== ""){
            getData_ajax("json/search_friends.json.php", data, successFunction, errorFunction, "post");
        }
        else{
            $('#search_friends_dropdown').html("").css("display", "none");
        }
        function successFunction(data){
            
            var user_list = "";
            for(var i = 0; i < data.length; i++) {
                
                user_list += '<li><a href="profile.php?id='+data[i]['user_ID']+'">'+data[i]['name']+' '+data[i]['surname']+'</a></li>';
                
                if(i < data.length-1){
                    user_list += '<li role="separator" class="divider"></li>';
                }
            }
            
            $('#search_friends_dropdown').html(user_list).css("display", "block");
        }
    });
    
});