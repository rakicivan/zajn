(function($) {

function getDetails(object, id){
    
    var api_key = "AIzaSyBbS3jbLXO_rIyaylzmKkRU3t7Tk-dvVwU";
    var part = "snippet"; // snippet,contentDetails,statistics,status

    var details = $.getJSON( "https://www.googleapis.com/youtube/v3/videos?id="+id+"&key="+api_key+"&part="+part+"&fields=items(snippet)", function() {
//                alert( "success" );
   })
     .done(function(data) {
//                  alert(JSON.stringify(data.items[0].snippet.title));
        object.html('<div class="content"><div class="col-xs-12"><div class="row"><div id="player"><div class="player_cover" data='+id+'></div></div></div></div><div class="col-xs-12"><div class="row">'+
                       '<div class="post_file_name"></div>'+
//                       '<div class="post_file_descrioption"></div>'+
                       '</div></div></div>');
        object.find(".player_cover").html('<img src='+JSON.stringify(data.items[0].snippet.thumbnails.medium.url)+' class="center-block" />');
        object.find(".post_file_name").html('<h5>'+JSON.stringify(data.items[0].snippet.title)+'</h5>');
//        object.find(".post_file_descrioption").html(JSON.stringify(data.items[0].snippet.description));
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
           
           
  $.fn.link = function() {
    return this.each(function() {
      var text = $(this).html();
      var regex = /((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g;
      var html = text.replace(regex, '<a href="$1">$1</a> '); 
      $(this).html(html);
    });
  }

  $.fn.image = function(options) {
    return this.each(function() {
      var opts= $.extend({width: '200px'}, options);
      var text = $(this).html();
      var check_if_exist = text.match(/<img\s+src\s*=\s*(["'][^"']+["']|[^>]+)>/);
//      console.log(check_if_exist);
      if(!check_if_exist){
        var regex = /(http|https|ftp):\/\/.+\.(jpg|jpeg|bmp|gif|png)(\?\S+)?/gi;
        var html = text.replace(regex, "<img src='$&' alt='' width='" + opts.width + "'/>");
        $(this).html(html);
    }
    });
  }

  $.fn.youtube = function(options) {
    return this.each(function() {
    var opts= $.extend({width:390, height:250}, options);
    var text = $(this).html();
    var check_if_exist = text.match(/<img\s+src\s*=\s*(["'][^"']+["']|[^>]+)>/);
//      console.log(check_if_exist);
      if(!check_if_exist){
        var regex = /https:\/\/(www.)?youtube\.com\/watch\?v=([A-Za-z0-9._%-]*)(\&\S+)?/;
//        var html = text.replace(regex, '<iframe class="youtube-player" type="text/html" width="' + opts.width + '" height="' + opts.height + '" src="http://www.youtube.com/embed/$2" frameborder="0"></iframe>');
        var yt_video_id = text.match(regex);
        if(yt_video_id){
//            console.log(yt_video_id[2]);
            getDetails($(this),yt_video_id[2]);
        }
    }

    });
  }

  $.fn.simpleFormat = function() {
    return this.each(function() {
      var text = $(this).html();
      var text = text.replace(/\n{2,}/g, '</p><p>');
      var text = text.replace(/\n/g, '<br/>');
      var text = '<p>' + text + '</p>';
      $(this).html(text);
    });
  }

})(jQuery);
