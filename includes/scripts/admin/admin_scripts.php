<?php
    $template = $twig->loadTemplate("scripts/admin/admin_courses.twig");
    $user_id = $_SESSION['ses_user_signed_in'];

    $limit = 10;
    $_yearsOfStudy = 1;
    $year = 1;
    $semester = 1;

    $first_course = null;

    echo $template->render(array(
        "base_url"=> $baseURL, 
        "get_user_info"=>$profileObject->get_user_info($user_id),
        // Scripts system (left_bar)
        "is_admin" => $userObject->isAdmin(),
        'universities' => $scriptObject->getUniversities()
    ));

    ?>
    <script type="text/javascript">
        var year = 1;
        var semester = 1;
        var selected_subject = null;
        var numberofscripts = 0; 
        var loadedscripts = 0;
        var course_ID = null;

        if($("#year_"+year).length > 0)
            $("#year_"+year).attr("selected", "");        

        if($("#semester_"+semester).length > 0)
            $("#semester_"+semester).attr("selected", "");

        //FILTERS -> university select
        $("#filter_university select").on('change', '', function (e) {
            var optionSelected = $("option:selected", this);
            var selected_univerity = this.value;

            APP.getData_data("json/scripts/getColleges.json.php",{selected_univerity:selected_univerity}, successFunction, errorFunction,"post");

            function successFunction(data){
                $("#filter_college select").html(data);
                $("#filter_college").show();

                $("#filter_subjects").hide();
                $("#filter_subjects_data").hide();
            }
            function errorFunction(error){
                console.log(error.responseText);
            }
        });

        //FILTERS -> college select
        $("#filter_college select").on('change', '', function (e) {
            var optionSelected = $("option:selected", this);
            var selected_college = this.value;

            APP.getData_data("json/scripts/getSubjects.json.php",{selected_college:selected_college}, successFunction, errorFunction,"post");

            function successFunction(data){
                $("#filter_subjects select").html(data);
                $("#filter_subjects").show();

                $("#filter_subjects_data").hide();
            }
            function errorFunction(error){
                console.log(error.responseText);
            }
        });

        //FILTERS -> subject select
        $("#filter_subjects select").on('change', '', function (e) {
            var optionSelected = $("option:selected", this);
            selected_subject = this.value;

            APP.getData_ajax("json/scripts/getAdminCourses.json.php", {selected_subject:selected_subject}, successFunction, errorFunction,"post");

            function successFunction(data){
                $('#filter_years select').html("");
                for(var i = 1; i <= data.yearsOfStudy; i++) {
                    $('#filter_years select').append('<option id="year_' + i + '" value="' + i + '">' + i + '. godina</option>');
                }
                
                $('#filter_courses select').html("");
                for(var i = 0; i < data.number; i++) {
                    $('#filter_courses select').append('<option value = "'+data.courses[i].course_ID+'">'+data.courses[i].name+'</option>');    
                }

                $("#filter_subjects_data").show();
            }
            function errorFunction(error){
                console.log(error.responseText);
            }
        });

        //FILTERS -> year select
        $('#filter_years select').on('change', '', function (e) {
            var optionSelected = $("option:selected", this);
            var selected_year = this.value;

            selected_semester = $("#filter_semester select").val();

            APP.getData_data("json/scripts/getCourses.json.php",{semester:selected_semester, year:selected_year, selected_subject:selected_subject}, successFunction, errorFunction,"post");
            function successFunction(data){
                $("#filter_courses select").html(data);
            }
            function errorFunction(error){
                console.log(error.responseText);
            }
        });

        //FILTERS -> semester select
        $('#filter_semester select').on('change', '', function (e) {
            var optionSelected = $("option:selected", this);
            var selected_semester = this.value;

            selected_year = $("#filter_years select").val();

            APP.getData_data("json/scripts/getCourses.json.php",{semester:selected_semester, year:selected_year, selected_subject:selected_subject}, successFunction, errorFunction,"post");
            function successFunction(data){
                $("#filter_courses select").html(data);
            }
            function errorFunction(error){
                console.log(error.responseText);
            }
        });

        //FILTERS -> start filtering
        $(".filter_button").click(function() {
            selected_course = $("#filter_courses select").val();

            if(selected_course !== course_ID) {
         
                APP.getData_ajax("json/scripts/getScripts.json.php",{course_ID:selected_course, limit: "<?php echo $baseObject->encrypt($limit); ?>"}, successFunction, errorFunction,"post");
                function successFunction(data){
                    if(data.number > 0) {
                        $("#scriptTable").html('<table> <tr class = "firstRow"> <td class = "smallTableRow">Preuzmi</td> <td>Opis</td> <td>Naziv skripte</td>   </tr> </table>');
                        for(var i = (data.number-1); i >= 0; i--) {
                            $("#scriptTable .firstRow").after('<tr> <td>IKONA</td> <td>'+data.array[i].file_description+'</td> <td>'+data.array[i].file_name+'</td>   </tr>');
                        }
                    }
                    else $("#scriptTable").html("Ovaj predmet nema skripti!");
                    course_ID = selected_course;

                    loadedscripts = data.number;
                    numberofscripts = data.number_of_scripts;
                    if(loadedscripts >= numberofscripts) $("#script_loadMore").text("");
                    else $("#script_loadMore").text("Load more");
                }
                function errorFunction(error){
                    console.log(error.responseText);
                }               
            }
        });

        //Load more scrips
        $("#script_loadMore").click(function() {
            if(loadedscripts >= numberofscripts)
                $(this).text("");
            else {
                selected_course = $("#filter_courses select").val();
                APP.getData_ajax("json/scripts/getScripts.json.php",{course_ID:selected_course, limit: "<?php echo $baseObject->encrypt($limit); ?>", b:loadedscripts}, successFunction, errorFunction,"post");
                function successFunction(data){
                    for(var i = (data.number-1); i >= 0; i--) {
                        $("#scriptTable tr").last().after('<tr> <td>IKONA</td> <td>'+data.array[i].file_description+'</td> <td>'+data.array[i].file_name+'</td>   </tr>');
                    }

                    loadedscripts += data.number;
                    if(loadedscripts >= numberofscripts) $("#script_loadMore").text("");
                    else $("#script_loadMore").text("Load more");
                }
                function errorFunction(error){
                    console.log(error.responseText);
                }                    
            }
        });
    </script>