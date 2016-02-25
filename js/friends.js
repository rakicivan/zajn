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
        
        document.getElementById(parent_id).appendChild(outside_div);        
    },
    getNonFriends : function(){
        
        
        
        this.generateTemplate("page_imgs/default.jpg","Ime i prezime","Grad",true,"people");
    }
};

$(document).ready(function(){
    FRIENDS.getNonFriends();
});