var APP = APP;
var TWIG = TWIG;
var FRIENDS = FRIENDS || {
    generateTemplate : function(img, name_surname, city, add, parent_id)
    {
        var outside_div = document.createElement("div");
        
        var profilePic = document.createElement("img");
        profilePic.src = img;
        profilePic.className = "friends_image";
        outside_div.appendChild(profilePic);
        
        var name_div = document.createElement("div");
        name_div.textContent = name_surname;
        outside_div.appendChild(name_div);
        
        var city_div = document.createElement("div");
        city_div.textContent = city;
        outside_div.appendChild(city_div);
        
        var button_div = document.createElement("div");
        
        var add_button = document.createElement("button");
        add_button.textContent = "ADD";
        
        button_div.appendChild(add_button);
        outside_div.appendChild(button_div);
        
        if(document.getElementById(parent_id))document.getElementById(parent_id).appendChild(outside_div);        
    },
    getNonFriends : function(){
        
        
        
        this.generateTemplate("page_imgs/default.jpg","Ime i prezime","Grad",true,"people");
    }
};

$(document).ready(function(){
    FRIENDS.getNonFriends();
});


$("body").on("click",".acceptRequest",function(event){
    var a_element = $(this).parent().siblings('a');
    APP.getData_ajax("json/addOrDeclineFriend.json.php",{id:$(this).attr("data"),add:1},successFunction,errorFunction,"post");
    var current = $(this);
    function successFunction(data){
        if(data.returned > 0){
            $(current).parent().html("<span>Dodali ste prijatelja</span>");
            var link_array = $(a_element).attr("href").split("&req=");
            $(a_element).attr("href",link_array[0]+"&req="+data.id);
            var badgeElement = $("#numFriendRequests");
            var current_number = parseInt($(badgeElement).text());
            var new_number = --current_number;
            if(new_number < 0) new_number = 0;
            if(new_number == 0){
                
                $(badgeElement).hide();
                $(badgeElement).text("");
                
            }
            else $(badgeElement).text(new_number);

            window.location.reload();
        }
        else{
            alert("Dodavanje prijatelja nije uspjelo, pokušajte ponovno.");
        }
    }
    function errorFunction(error){
//        console.log(error.responseText);
//        alert("add/decline friend ajax error");
    }
});
$("body").on("click",".declineRequest",function(event){
    APP.getData_ajax("json/addOrDeclineFriend.json.php",{id:$(this).attr("data"),add:0},successFunction,errorFunction,"post");
    var current = $(this);
    function successFunction(data){
        if(data > 0){
            var parent = $(current).parent().parent().parent();
            $(current).parent().parent().remove();
            var badgeElement = $("#numFriendRequests");
            var current_number = parseInt($(badgeElement).text());
            var new_number = --current_number;
            if(new_number < 0) new_number = 0;
            if(new_number == 0){
                
                $(badgeElement).hide();
                $(badgeElement).text("");
                $(parent).prepend("<li>Nemate zahtjeva.</li>")
            }
            else $(badgeElement).text(new_number);

            window.location.reload();
        }
        else{
            alert("Brisanje prijatelja nije uspjelo, pokušajte ponovno.");
        }
    }
    function errorFunction(error){
//        console.log(error.responseText);
//        alert("add/decline friend ajax error");
    }
});

$("body").on("click","#btnAcceptProfile",function(event){
    APP.getData_ajax("json/addOrDeclineFriend.json.php",{id:$(this).attr("data"),add:1},successFunction,errorFunction,"post");
    var current = $(this);
    function successFunction(data){
        if(data.returned > 0){
            alert("Sada ste prijatelji");
            $(current).parent().parent().hide();
            window.location.reload();
        }
        else{
            alert("Dodavanje prijatelja nije uspjelo, pokušajte ponovno.");
        }
    }
    function errorFunction(error){
//        console.log(error.responseText);
//        alert("add/decline friend ajax error");
    }
});
$("body").on("click","#btnDeclineProfile",function(event){
    APP.getData_ajax("json/addOrDeclineFriend.json.php",{id:$(this).attr("data"),add:0},successFunction,errorFunction,"post");
    var current = $(this);
    function successFunction(data){
        if(data > 0){
            alert("Otkazali ste zahtjev.");
            $(current).parent().parent().hide();
            window.location.reload();
        }
        else{
            alert("Brisanje prijatelja nije uspjelo, pokušajte ponovno.");
        }
    }
    function errorFunction(error){
//        console.log(error.responseText);
//        alert("add/decline friend ajax error");
    }
});

setInterval(function(){
     
     APP.getData_ajax("json/getFriendRequests.json.php",{},successFunction,errorFunction,"post");
     function successFunction(data){
         if(data.number > 0) $("#numFriendRequests").text(data.number);
         else $("#numFriendRequests").text("");
         TWIG.getTemplate("json/friendRequestsTWIG.json.php","friend_request.twig",{array:data.array},"post",function(data){
             $("#friendRequestDropdown").empty();
             $("#friendRequestDropdown").html(data);
             
         });
     }
     function errorFunction(error){
//         console.log(error.responseText);
//        alert("geeting friend request ajax error");
     }
},30000);



$("body").on("click","#btnAddFriendProfile",function(event){    
    APP.getData_ajax("json/friends.json.php",{add_user:"",add_user_id:$(this).attr("data")},addedFriend,errorFunction,"post");
    var current = $(this);
    function addedFriend(data){
        if(data){
            $(current).text("Otkaži zahtjev");
            $(current).addClass("btn-default");
            $(current).removeClass("btn-primary");
            $(current).attr("id","btnRemoveFriendProfile");
        }else{
            alert("Dodavanje nije uspjelo. Pokušajte ponovno.");
        }
    }
    function errorFunction(error){
//        console.log(error.responseText);
//        alert("adding friend ajax error");
    }
});

$("body").on("click","#btnRemoveFriendProfile",function(event){    
    APP.getData_ajax("json/deleteFriend.json.php",{id:$(this).attr("data")},removedFriend,errorFunction,"post");
    var current = $(this);
    function removedFriend(data){
        if(data){
            $(current).text("Dodaj za prijatelja");
            $(current).addClass("btn-primary");
            $(current).removeClass("btn-default");
            $(current).attr("id","btnAddFriendProfile");
            window.location.reload();
        }else{
            alert("Brisanje nije uspjelo. Pokušajte ponovno.");
        }
    }
    function errorFunction(error){
//        console.log(error.responseText);
//        alert("removing friend ajax error");
    }
});

$("body").on("click",".btnAcceptFriendPage",function(event){    
    APP.getData_ajax("json/addOrDeclineFriend.json.php",{id:$(this).attr("data"),add:1},addedFriend,errorFunction,"post");
    var current = $(this);
    var whole_row = $(this).parent().parent();
    var whole_block = $(whole_row).parent().parent().parent();
    console.log(whole_block);
    function addedFriend(data){
        if(data){
            $(whole_row).hide();
            $(whole_row).removeClass("friendRequestItem");
            if($(".friendRequestItem").length == 0){
                $(whole_block).hide();
            }
            window.location.reload();
        }else{
            alert("Prihvaćanje zahtjeva nije uspjelo. Pokušajte ponovno.");
        }
    }
    function errorFunction(error){
//        console.log(error.responseText);
//        alert("accepting friend ajax error");
    }
});

$("body").on("click",".btnDeclineFriendPage",function(event){    
    APP.getData_ajax("json/addOrDeclineFriend.json.php",{id:$(this).attr("data"),add:0},removedFriend,errorFunction,"post");
    var current = $(this);
    var whole_row = $(this).parent().parent();
    var whole_block = $(whole_row).parent().parent().parent();
    function removedFriend(data){
        if(data){
            $(whole_row).hide();
            $(whole_row).removeClass("friendRequestItem");
            if($(".friendRequestItem").length == 0){
                $(whole_block).hide();
            }
            window.location.reload();
        }else{
            alert("Odbijanje zahtjeva nije uspjelo. Pokušajte ponovno.");
        }
    }
    function errorFunction(error){
        //console.log(error.responseText);
        //alert("declining friend ajax error");
    }
});
