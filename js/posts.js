/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var viewed_User = null;
var baseUrl = null;

function getTemplate(json_url,template,parameters,type,callback){
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

function auto_html(){
    $('.post_text pre').image({width: 'auto'}).youtube({width:500, height:400}).link();
}


    
$(document).ready(function(){
    
    auto_html();

    var flag = false;
    $('body').on('keyup', '#post_textarea',function() {
        
        var object = $(this);
        var text = object.val();
        var regex = /https:\/\/(www.)?youtube\.com\/watch\?v=([A-Za-z0-9._%-]*)(\&\S+)?/;
        var yt_video_id = text.match(regex);
        var player;

        if(yt_video_id){
            if(flag === false){
                
                create_yt_html_container();
                onYouTubeIframeAPIReady();
                getDetails();
                flag = true;
                //console.log(flag+'  '+yt_video_id[2]);
            }
        } else{
            if(!yt_video_id && flag){
                
                removePlayer();
                
                flag = false;
                //console.log(flag);
            }
        }
        
        function create_yt_html_container(){
            $(".post_file_container").html('<div class="content"><div class="col-md-7"><div class="row"><div id="post_player"></div></div></div><div class="col-md-5"><div class="row">'+
                        '<button type="button" class="close remove_file"><span aria-hidden="true">&times;</span></button><div class="post_file_name"></div>'+
                        '<div class="post_file_descrioption"></div></div></div></div>');
            $(".post_file_container .content").hide();
        }
            
            // 3. This function creates an <iframe> (and YouTube player)
           //    after the API code downloads.
           function onYouTubeIframeAPIReady() {
             player = new YT.Player('post_player', {
               height: '390',
               width: '640',
               videoId: yt_video_id[2],
               events: {
                 'onReady': onPlayerReady,
                 'onStateChange': onPlayerStateChange
               }
             });
           }

           // 4. The API will call this function when the video player is ready.
           function onPlayerReady(event) {
     //        event.target.playVideo();
           }

           // 5. The API calls this function when the player's state changes.
           //    The function indicates that when playing a video (state=1),
           //    the player should play for six seconds and then stop.
           var done = false;
           function onPlayerStateChange(event) {
             if (event.data == YT.PlayerState.PLAYING && !done) {
     //          setTimeout(stopVideo, 6000);
     //          done = true;
             }
           }
           function stopVideo() {
             player.stopVideo();
           }
           function getDetails(){
               
               var api_key = "AIzaSyBbS3jbLXO_rIyaylzmKkRU3t7Tk-dvVwU";
               var part = "snippet"; // snippet,contentDetails,statistics,status
               
               var details = $.getJSON( "https://www.googleapis.com/youtube/v3/videos?id="+yt_video_id[2]+"&key="+api_key+"&part="+part+"&fields=items(snippet)", function() {
//                alert( "success" );
              })
                .done(function(data) {
//                  alert(JSON.stringify(data.items[0].snippet.title));
                    $(".post_file_name").html(JSON.stringify(data.items[0].snippet.title));
                    $(".post_file_descrioption").html(JSON.stringify(data.items[0].snippet.description));
                    $(".post_file_container .content").show("slow");
                })
                .fail(function() {
//                  alert( "error" );
                    console.log("yt_api fail to load details");
                })
                .always(function() {
//                  alert( "finished" );
                });

              // Perform other work here ...

              // Set another completion function for the request above
//              details.always(function() {
//                alert( "second finished" );
//              });
           }
           function removePlayer(){
               
                $(".post_file_container .content").hide("fast");
                $(".post_file_container").html("");
           }

    });
    
    $('body').on('click', '.player_cover',function (event) {
        
        var object = $(this);
        var videoId = object.attr("data");
        var _player;
        
            // 3. This function creates an <iframe> (and YouTube player)
           //    after the API code downloads.
           function onYouTubeIframeAPIReady() {
             _player = new YT.Player('player', {
               videoId: videoId,
               events: {
                 'onReady': onPlayerReady,
                 'onStateChange': onPlayerStateChange
               }
             });
           }

           // 4. The API will call this function when the video player is ready.
           function onPlayerReady(event) {
             event.target.playVideo();
           }

           // 5. The API calls this function when the player's state changes.
           //    The function indicates that when playing a video (state=1),
           //    the player should play for six seconds and then stop.
           var done = false;
           function onPlayerStateChange(event) {
             if (event.data == YT.PlayerState.PLAYING && !done) {
     //          setTimeout(stopVideo, 6000);
     //          done = true;
             }
           }
           function stopVideo() {
             player.stopVideo();
           }
           
           onYouTubeIframeAPIReady();
    });
    
    $('body').on('click', '.remove_file',function (event) {
        $(".post_file_container .content").hide("fast");
        $(".post_file_container").html("");
    });
    
    $('body').on('focus', '#post_textarea',function() {
        $(this).animate({
            height: "100px"
        },500);
    });
    
    $('body').on('blur', '#post_textarea',function() {
        $(this).animate({
            height: "0"
        },500);
    });

    $('body').on('click', '#submit_post',function(e){ //a
        e.preventDefault();
        var post_textarea = $("#post_textarea").val();

        var data = {
            post_submit: "",
            post_textarea: post_textarea
        };
        if(post_textarea !== ""){

            getData_ajax("json/posts.json.php", data, successFunction, errorFunction, "post");            
        }
        else{
            alert("Napiši nekaj!");
        }
        function successFunction(data){
            if(data == -1) {
                alert("Morate malo sačekati do sljedećeg objavljivanja statusa!");
            }
            else {
                var post_html = "";

                TWIG.getTemplate("json/twigLoads/loadPost.json.php","post.twig", {
                        post_ID:data[0]['post_ID'],
                        user_ID:data[0]['user_ID'],
                        user_avatar:data[0]['user_avatar'],
                        author_name:data[0]['author_name'],
                        author_surname:data[0]['author_surname'],
                        text:data[0]['text'],
                        time:data[0]['time'],
                        not_my_profile: 0,
                        numb_of_comms: 0,
                        base_url: baseUrl
                    },"post",function(data){
                    $("#posts_container").prepend(data);
                });

               /* for(var i = 0; i < data.length; i++) { 
                    post_html += '<div class="box" id="post" data="'+data[i]['post_ID']+'" data-a="'+data[i]['user_ID']+'">'+
                                '<div class="row"><button type="button" class="close del_post"><span aria-hidden="true">&times;</span></button></div>'+
                                '<div class="row"><div class="col-sm-2"><div class="user_avatar"><img class="center-block img-circle" src="'+data[i]['user_avatar']+'" /></div></div>'+        
                                '<div class="col-sm-10"><a href = "profile.php?id='+data[i]['user_ID']+'"><div class="post_author_name">'+data[i]['author_name']+' '+data[i]['author_surname']+'</div></a><div class="post_text"><pre>'+data[i]['text']+'</pre></div>' +
                                '<a href = "profile.php?id='+data[i]['user_ID']+'&post='+data[i]['post_ID']+'"><div class="post_time">'+data[i]['time']+'</div></div></div></a>'+
                                '<div class="row"><div class="c_container"><div class="post_comments_container"><div class="c_c"></div></div>'+
                                '<div class="post_comment_textarea_container"><form><textarea class="post_comment_textarea" placeholder="Napiši komentar..."></textarea></form></div>'+
                                '<div class="load_post_comments"><span>Load comms</span></div></div></div></div>';
                }*/
                $("#post_textarea").val("");
                $(".post_file_container").html("");
                auto_html();                
            }
        }
        function errorFunction(data){ console.log(data); }

    });

    // load post comments
    $('body').on('click', '.load_post_comments',function(){
        var object = $(this);
        var id = object.parents('#post').attr('data');

        var data = {
            get_comments:"",
            id: id
        };
        getData_ajax("json/posts.json.php", data, successFunction, errorFunction, "post");
        object.parent().children(".post_comment_textarea_container").css("display", "block");
        object.parent().children(".load_post_comments").css("display", "none");
        
        function successFunction(data){
            
            var comm_html = "";
            object.parent().children(".post_comments_container").css("display", "block");

            if(data.length === 0){
                
            }
            else{
                for(var i = 0; i < data.length; i++) {             
                    comm_html += '<div class="row comments" data="'+data[i]['comment_ID']+'">'+
                        '<div class="row"><button type="button" class="close del_comm"><span aria-hidden="true">&times;</span></button></div>'+
                        '<div class="col-sm-2"><div class="row"><div class="user_avatar"><a href="profile.php?id='+data[i]['user_ID']+'"><img class="center-block img-circle" src="'+data[i]['user_avatar']+'" /></a></div></div></div>'+
                        '<div class="col-sm-10"><div class="row"><div class="post_author_name"><a href="profile.php?id='+data[i]['user_ID']+'">'+data[i]['author_name']+' '+data[i]['author_surname']+'</a></div>'+
                        '<div class="post_text"><pre>'+data[i]['text']+'</pre></div>'+
                        '<div class="post_time">'+data[i]['time']+'</div>'+
                        '</div></div></div>';
                }

                object.parents(".c_container").find(".post_comments_container > .c_c").before(comm_html);
            }
            
        }
    });

    $('body').on('keydown', '.post_comment_textarea',function (event) {

        var object = $(this);
        var id = object.parents('#post').attr('data');
        var author_id = object.parents('#post').attr('data-a');
        var text = object.val();
        if(id !== ""){
            if (event.keyCode == 13 && event.shiftKey) {
//                var content = this.value;
//                var caret = getCaret(this);
//                this.value = content.substring(0,caret)+"\n"+content.substring(caret,content.length);
//                event.stopPropagation();

            } else if(event.keyCode == 13) {
                var data = {
                    comment_submit:"",
                    id: id,
                    comment_textarea: text,
                    author_id: author_id                    
                };

                if(text !== ""){
                    getData_ajax("json/posts.json.php", data, successFunction, errorFunction, "post");          
                }
                else{
                    alert("Napiši nekaj!");
                }
                $(this).val("");

                function successFunction(data){
                    if(data == -1) {
                        alert("Morate malo sačekati do sljedećeg komentarisanja!");
                    }
                    else {
                        var comm_html = "";
                        for(var i = 0; i < data.length; i++) {
                            comm_html += '<div class="row comments" data="'+data[i]['comment_ID']+'">'+
                                        '<div class="row"><button type="button" class="close del_post"><span aria-hidden="true">&times;</span></button></div>'+
                                        '<div class="col-sm-2"><div class="row"><div class="user_avatar"><img class="center-block img-circle" src="'+data[i]['user_avatar']+'" /></div></div></div>'+
                                        '<div class="col-sm-10"><div class="row"><div class="post_author_name">'+data[i]['author_name']+' '+data[i]['author_surname']+'</div>'+
                                        '<div class="post_text"><pre>'+data[i]['text']+'</pre></div>'+
                                        '<div class="post_time">'+data[i]['time']+'</div>'+
                                        '</div></div></div>';
                        }
                        object.parents(".c_container").find(".post_comments_container > .c_c").before(comm_html);
                    }
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
            getData_ajax("json/posts.json.php", data, successFunction, errorFunction, "post");
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
            getData_ajax("json/posts.json.php", data, successFunction, errorFunction, "post");
        }
        
        function successFunction(data){
            
            if(data === "0"){
                alert("Nažalost komentar nije obrisan");
            }else{
                object.parents('.comments').hide('slow');
            }
        };
    });
    
    // load more posts
     $('body').on('click', '#load_more',function (event) {
        var page_offset = parseInt($("#posts_container").attr('data-p-of'));
        var page_limit = parseInt($("#posts_container").attr('data-p-l'));

        page_offset += page_limit;
        $("#posts_container").attr('data-p-of', page_offset);

        var data = {
                    load_more:"",
                    page_l: page_limit,
                    page_of: page_offset,
                    profile_ID: viewed_User
                };
        getData_ajax("json/posts.json.php", data, successFunction, errorFunction, "post");

        function successFunction(data){
            var post_html = "";

            console.log(data);            
            if(data == ""){
                $("#load_more").html("Nema više objava...");
            }else {
                for(var i = 0; i < data.length; i++) {
                    TWIG.getTemplate("json/twigLoads/loadPost.json.php","post.twig", {
                            post_ID:data[i]['post_ID'],
                            user_ID:data[i]['user_ID'],
                            user_avatar:data[i]['user_avatar'],
                            author_name:data[i]['author_name'],
                            author_surname:data[i]['author_surname'],
                            text:data[i]['text'],
                            time:data[i]['time'],
                            not_my_profile: 0,
                            numb_of_comms: 0,
                            base_url: baseUrl
                        },"post",function(data){
                        $(".l_m").before(data);
                    });
                }
            }
        }
     });
});