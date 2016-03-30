$("#profile_image").mouseenter(function(){
    $("#profile_image >div").css("display","inline-block");
});

$("#profile_image").mouseleave(function(){
    $("#profile_image >div").css("display","none");
});

$("#btn_uploadInit").click(function(){
    $("#popup_container").show();
});

$("#popup_close").click(function(){
    $("#popup_container").hide();
});

$("#uploader").fileinput({
    dropZoneEnabled:true,
    uploadUrl:"test_upload.json.php",
    uploadAsync: true,
});

$("#uploader").on("fileuploaded",function(event, data, previewId, index){
    
    console.log(data);
    alert("file preupload");
    $("#uploader").fileinput('refresh');
    $("#popup_uploadSection").hide();
    var basic = $("#popup_crop").croppie({
        viewport:{width:100,height:100}
    });
    
    basic.croppie('bind',{
        url: data.response.uploaded_file_path
    });
    
    $(".basic-result").click(function(){
        basic.croppie('result','canvas').then(function(src){
            replaceImage(data.response.uploaded_file_path,src,basic);
        });
    });
    
});

function replaceImage(imageName,encoded, croppie){
    $.ajax({
        url:"imageConverter.json.php",
        datatype:"json",
        contenttype:"application/json",
        type:"post",
        data:{encoded:encoded,filename:imageName},
        success:function(data){
            croppie.croppie('destroy');
            setTimeout(function(){
                
                $("#uploadedImage").attr("src",imageName+"?"+ Date.now());
                $("#uploadedImage").attr("alt",imageName);
                $("#popup_display").show();
                
            },4000);
            
        },
        error:function(error){
            console.log(error.responseText);
            alert("Error occured, replacing image");
        }
    });
}