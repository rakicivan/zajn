<?php
    $user_id = $_SESSION['ses_user_signed_in'];

    $limit = 10;
    $MAX_FILE_SIZE = 5;
    $scriptsDirPath = $baseObject->getBaseUrl(true).'/Uploads/Scripts/';
    $allowedExtensions = array("doc", "docx", "pdf", "txt", "rtf", "ppt");

    $semester = null;
    $first_course = null;

    $template = $twig->loadTemplate("scripts/index.twig");

    $year = $scriptObject->getYearOfStudy();

    if(date('m') > month_of_summer_semester || (date('d') >= day_of_summer_semester && date('m') >= month_of_summer_semester)) 
        $semester = 2;
    else $semester = 1;

    if($semester == 1) {
        $semester = (2*$year)-1;
    }
    else $semester *= $year;

    echo $template->render(array(
        "base_url"=> $baseURL, 
        "get_user_info"=>$profileObject->get_user_info($user_id),
        // Scripts system (left_bar)
        "is_admin" => $userObject->isAdmin(),
//        "years_of_study" => $scriptObject->getYearsOfStudy(),
        'student_year' => $year,
        'courses' => $courses = $scriptObject->getCourses($year, $semester, $first_course),
        'scripts' => $loaded_scripts = $scriptObject->getScripts($limit, 0, $first_course),
        'scripts_limit' => $limit
    ));

    function Message($str) {
        echo '<script> $(".UploadMessage").html("'.$str.'"); </script>';
    }

    if(isset($_FILES['file_upload'])) {
        if($_FILES['file_upload']['size'] > (1024*1024*$MAX_FILE_SIZE))
            Message('Prekoračili ste veličinu dozvoljenog dokumenta, limit je ' . $MAX_FILE_SIZE . 'MB!');
        else {
            $fileExtension = pathinfo($_FILES['file_upload']['name']);
            $fileExtension = $fileExtension['extension'];

            if(!array_search($fileExtension, $allowedExtensions))
                Message('Ekstenzija dokumenta nije dopustena!');
            else {
                $uploadfile = $scriptsDirPath . basename($_FILES['file_upload']['name']);
                echo $baseObject->getBaseUrl(true);

                if (move_uploaded_file($_FILES['file_upload']['tmp_name'], "../Uploads/")) {
                    echo "File is valid, and was successfully uploaded.\n";
                } else {
                    echo "Possible file upload attack!\n";
                }
            }           
        }

        print_r($_FILES['file_upload']);
        print_r($_FILES['file_upload']['error']);
        echo (1024*1024*$MAX_FILE_SIZE);

    }

    ?>
    <script type="text/javascript">
        var year = <?php echo $year ?>;
        var semester = <?php echo $semester/$year; ?>;
        var course_ID = "<?php echo $baseObject->encrypt($first_course); ?>";
        var numberofscripts = <?php echo $scriptObject->getScriptsNumber($first_course); ?>;
        var loadedscripts = <?php echo $loaded_scripts['number']; ?>;

        if(loadedscripts >= numberofscripts)
            $("#script_loadMore").text("");

        if($("#year_"+year).length > 0)
            $("#year_"+year).attr("selected", "");        

        if($("#semester_"+semester).length > 0)
            $("#semester_"+semester).attr("selected", "");

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

        $('#filter_years select').on('change', '', function (e) {
            var optionSelected = $("option:selected", this);
            var selected_year = this.value;

            selected_semester = $("#filter_semester select").val();

            APP.getData_data("json/scripts/getCourses.json.php",{year:selected_year, semester:selected_semester}, successFunction, errorFunction,"post");
            function successFunction(data){
                $("#filter_courses select").html("");
                for(var i = 0; i < data.length; i++) {
                    $("#filter_courses select").append('<option value = "'+data[i].course_ID+'">'+data[i].name+'</option>');
                }
            }
            function errorFunction(error){
                console.log(error.responseText);
            }
        });

        $('#filter_semester select').on('change', '', function (e) {
            var optionSelected = $("option:selected", this);
            var selected_semester = this.value;

            selected_year = $("#filter_years select").val();

            APP.getData_data("json/scripts/getCourses.json.php",{semester:selected_semester, year:selected_year}, successFunction, errorFunction,"post");
            function successFunction(data){
                $("#filter_courses select").html("");
                for(var i = 0; i < data.length; i++) {
                    $("#filter_courses select").append('<option value = "'+data[i].course_ID+'">'+data[i].name+'</option>');
                }
            }
            function errorFunction(error){
                console.log(error.responseText);
            }
        });
    </script>