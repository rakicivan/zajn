/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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

function post_commnet(data){
    
    
}

$(document).ready(function(){
    
    $('body').on('click', '#submit_post',function(e){
        e.preventDefault();
        var post_textarea = $("#post_textarea").val();
        var data = {
            post_submit: "",
            post_textarea: post_textarea
        };
        if(post_textarea !== ""){

            getData_ajax("posts.php", data, successFunction, errorFunction, "post");            
        }
        else{
            alert("Napiši nekaj!");
        }
        function successFunction(data){

            //alert("success: "+data);
            var comm_html = "";
            for(var i = 0; i < data.length; i++) {
                
                comm_html += '<div class="box" id="post" data="'+data[i]['post_ID']+'"><span class="del_post">X</span>'+
                                '<div class="row"><div class="col-sm-2"><div class="user_avatar"><img class="center-block img-thumbnail" src="'+data[i]['user_avatar']+'" /></div></div>'+
                                '<div class="col-sm-10"><div class="post_author_name">'+data[i]['author_name']+' '+data[i]['author_surname']+'</div><div class="post_text"><pre>'+data[i]['text']+'</pre></div><div class="post_time">'+data[i]['time']+'</div></div></div>'+
                                '<div class="row"><div class="c_container"><div class="post_comments_container"><div class="c_c"></div></div>'+
                                '<div class="post_comment_textarea_container"><form><textarea class="post_comment_textarea" placeholder="Napiši komentar..."></textarea></form></div>'+
                                '<div class="load_post_comments"><span>Load comms</span></div></div></div></div>';
            }
            $("#post_textarea").val("");
            $("#posts_container").prepend(comm_html);
        }

    });

    $('body').on('click', '.load_post_comments',function(){
        
        var object = $(this);
        var id = object.parents('#post').attr('data');

        var data = {
            get_comments:"",
            id: id
        };
        getData_ajax("posts.php", data, successFunction, errorFunction, "post");
        object.parent().children(".post_comment_textarea_container").css("display", "block");
        object.parent().children(".load_post_comments").css("display", "none");
        
        function successFunction(data){
            
            var comm_html = "";
            object.parent().children(".post_comments_container").css("display", "block");

            if(data.length === 0){
                
            }
            else{
                for(var i = 0; i < data.length; i++) {
                
                    comm_html += '<div class="row comments" data="'+data[i]['comment_ID']+'"><div class="col-sm-2">'+
                        '<div class="user_avatar"><img class="center-block img-circle" src="'+data[i]['user_avatar']+'" /></div></div>'+
                        '<div class="col-sm-10"><div class="post_author_name">'+data[i]['author_name']+' '+data[i]['author_surname']+'<span class="del_comm">X</span></div>'+
                        '<div class="post_text"><pre>'+data[i]['text']+'</pre></div>'+
                        '<div class="post_time">'+data[i]['time']+'</div>'+
//                        '<div class="post_likes">Likes: '+data[i]['likes']+'</div>
                        '</div></div>';
                }

                object.parents(".c_container").find(".post_comments_container > .c_c").before(comm_html);
            }
            
        }
    });

    $('body').on('keydown', '.post_comment_textarea',function (event) {

        var object = $(this);
        var id = object.parents('#post').attr('data');
        var text = object.val();
        if(id !== ""){
            if (event.keyCode == 13 && event.shiftKey) {
                var content = this.value;
                var caret = getCaret(this);
                this.value = content.substring(0,caret)+"\n"+content.substring(caret,content.length);
                event.stopPropagation();

            } else if(event.keyCode == 13) {
                
                var data = {
                    comment_submit:"",
                    id: id,
                    comment_textarea: text
                };

                if(text !== ""){
                    getData_ajax("posts.php", data, successFunction, errorFunction, "post");          
                }
                else{
                    alert("Napiši nekaj!");
                }
                $(this).val("");

                function successFunction(data){
                    
                    var comm_html = "";
                    for(var i = 0; i < data.length; i++) {

                        comm_html += '<div class="row comments" data="'+data[i]['comment_ID']+'"><div class="col-sm-2">'+
                        '<div class="user_avatar"><img class="center-block img-circle" src="'+data[i]['user_avatar']+'" /></div></div>'+
                        '<div class="col-sm-10"><div class="post_author_name">'+data[i]['author_name']+' '+data[i]['author_surname']+'<span class="del_comm">X</span></div>'+
                        '<div class="post_text"><pre>'+data[i]['text']+'</pre></div>'+
                        '<div class="post_time">'+data[i]['time']+'</div>'+
//                        '<div class="post_likes">Likes: '+data[i]['likes']+'</div>
                        '</div></div>';
                    }
                    object.parents(".c_container").find(".post_comments_container > .c_c").before(comm_html);
                };
                    event.preventDefault();
            }
        }
    });
 
    // delete post
    $('body').on('click', '.del_post',function (event) {
        
        var object = $(this);
        var id = object.parents('#post').attr('data');
        
        var data = {
                    del_post:"",
                    id: id
                };
        
        var conf = confirm("Jesi li siguran da želiš obrisati ovu objavu?");
        if(conf == true){
            getData_ajax("posts.php", data, successFunction, errorFunction, "post");
        }
        
        function successFunction(data){
            
            if(data === "0"){
                alert("Nažalost objava nije obrisana "+data);
            }else{
                object.parents('#post').hide('slow');
            }
        };
    });
    
    // delete comment
    $('body').on('click', '.del_comm',function (event) {
        
        var object = $(this);
        var id = object.parents('.comments').attr('data');
        
        var data = {
                    del_comm:"",
                    id: id
                };
        
        var conf = confirm("Jesi li siguran da želiš obrisati ovaj komentar?");
        if(conf == true){
            getData_ajax("posts.php", data, successFunction, errorFunction, "post");
        }
        
        function successFunction(data){
            
            if(data === "0"){
                alert("Nažalost komentar nije obrisan");
            }else{
                object.parents('.comments').hide('slow');
            }
        };
    });
    
     $('body').on('click', '#load_more',function (event) {
        
        var page_offset = parseInt($("#posts_container").attr('data-p-of'));
        var page_limit = parseInt($("#posts_container").attr('data-p-l'));

        page_offset += page_limit;
        $("#posts_container").attr('data-p-of', page_offset);

        var data = {
                    load_more:"",
                    page_l: page_limit,
                    page_of: page_offset
                };
        getData_ajax("posts.php", data, successFunction, errorFunction, "post");
        function successFunction(data){
            var post_html = "";
            
            if(data == ""){
                $("#load_more").html("Nema više objava...");
            }else {
                var post_html = "";
                for(var i = 0; i < data.length; i++) {
                    post_html += '<div class="box" id="post" data="'+data[i]['post_ID']+'"><span class="del_post">X</span>'+
                                '<div class="row"><div class="col-sm-2"><div class="user_avatar"><img class="center-block img-circle" src="'+data[i]['user_avatar']+'" /></div></div>'+
                                '<div class="col-sm-10"><div class="post_author_name">'+data[i]['author_name']+' '+data[i]['author_surname']+'</div><div class="post_text"><pre>'+data[i]['text']+'</pre></div><div class="post_time">'+data[i]['time']+'</div></div></div>'+
                                '<div class="row"><div class="c_container"><div class="post_comments_container"><div class="c_c"></div></div>'+
                                '<div class="post_comment_textarea_container"><form><textarea class="post_comment_textarea" placeholder="Napiši komentar..."></textarea></form></div>'+
                                '<div class="load_post_comments"><span>Load comms</span></div></div></div></div>';
                }
                $(".l_m").fadeIn('slow').before(post_html);
            }
        }
     });
});