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
        var edityear = null, editsemester = null, edittext = null;

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
                $("#filter_coursesAdd").hide();
                $("#filter_option").hide();
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
                $("#filter_coursesAdd").hide();
                $("#filter_option").hide();
            }
            function errorFunction(error){
                console.log(error.responseText);
            }
        });

        //FILTERS -> subject select
        $("#filter_subjects select").on('change', '', function (e) {
            var optionSelected = $("option:selected", this);
            selected_subject = this.value;

            $("#filter_option").show();
        });

        //FILTERS -> filter_option
        $("#filter_option select").on('change', '', function (e) {
            var optionSelected = $("option:selected", this);
            filter_option = this.value;

            $("#filter_subjects_data").hide();
            $("#filter_coursesAdd").hide();

            APP.getData_ajax("json/scripts/getAdminYears.json.php", {selected_subject:selected_subject}, successFunction, errorFunction,"post");

            function successFunction(data){
                year = data.yearsOfStudy;
                $("#filter_add_name input").val("");

                if(filter_option >= 2) {
                    $('#filter_add_years select').html("");
                    $('#coursesTable table').html("");

                    for(var i = 1; i <= year; i++) {
                        $('#filter_add_years select').append('<option id="year_' + i + '" value="' + i + '">' + i + '. godina</option>');
                    }
                    $("#filter_coursesAdd").show();
                }
                else {
                    $('#filter_years select').html("");
                    for(var i = 1; i <= year; i++) {
                        $('#filter_years select').append('<option id="year_' + i + '" value="' + i + '">' + i + '. godina</option>');
                    }
                    $("#filter_subjects_data").show();
                }                
            }
            function errorFunction(error){
                console.log(error.responseText);
            }
        });

        //FILTERS FOR ADDING
        $("#filter_coursesAdd .filter_button").click(function() {
            if($("#filter_add_name input").val().length < 5)
                return alert("Niste unijeli ime predmeta! (minimalno 5 karaktera)");

            var obrisi = confirm("Da li zelite dodati ovaj predmet?");
            if (obrisi == true) {
                APP.getData_ajax("json/scripts/addCourse.json.php",{
                    subject: selected_subject,
                    name: $("#filter_add_name input").val(),
                    semester: $("#filter_add_semester select").val(),
                    year: $("#filter_add_years select").val()
                }, successFunction, errorFunction,"post");

                function successFunction(data){
                    if(data == true) {                    
                        alert("Uspjesno ste dodali novi predmet!");
                    } 
                    else {
                        alert("Doslo je do greske!");
                    }
                }
                function errorFunction(error){
                    console.log(error.responseText);
                }
            }
            $("#filter_add_name input").val("");
        });

        //FILTERS FOR EDITING
        //FILTERS -> start filtering
        $("#filter_subjects_data .filter_button").click(function() {
            getCourses();
        });

        function deleteCourse(id, elemet) {
            var obrisi = confirm("Da li zelite obrisati ovaj predmet?");
            if (obrisi == true) {
                APP.getData_ajax("json/scripts/deleteCourse.json.php",{course_ID:id}, successFunction, errorFunction,"post");
                function successFunction(data){
                    if(data == true) {                    
                        $(elemet).parent().remove();
                        alert("Uspjesno ste obrisali ovaj predmet!");
                    } 
                    else {
                        alert("Doslo je do greske!");
                    }
                }
                function errorFunction(error){
                    console.log(error.responseText);
                }
            }
        }

        function editCourse(id, element) {
            var yeartext = "<option disabled selected>Odabir godine</option>";
            for(var i = 1; i <= year; i++) {
                yeartext += '<option value = "'+ i + '">' + i + '. godina</option>';
            }
            //year
            $("#coursesEdit").html(
                '<div class = "filter"><input placeholder="Unesite novo ime predmeta" onchange="updateText(this)"></input></div>\
                    <div class = "filter" id = "edit_years"><select onchange = "updateYear(this)">'+
                    yeartext +'</select></div>\
                    <div class = "filter" id = "edit_semester"><select onchange = "updateSemester(this)"> \
                        <option disabled selected>Odabir semestra</option> \
                        <option ID = "semester_1" value = "1">Zimski semestar</option> \
                        <option ID = "semester_2" value = "2">Ljetni semestar</option>\
                    </select></div>\
                 <div class = "edit_button" onclick = "updateCourse(\''+id+'\')">Uredi predmet</div>\
                 '
                ).show();
        }

        function updateYear(element) {
            $("option:selected", element);
            edityear = element.value;
        }

        function updateSemester(element) {
            $("option:selected", element);
            editsemester = element.value;
        }

        function updateText(element) {
            edittext = $(element).val();
        }

        function updateCourse(id) {
            if(edityear == null)
                alert("Niste odabrali godinu!");
            else if(editsemester == null)
                alert("Niste odabrali semestar!");
            else if(edittext == null || edittext.length < 5)
                alert("Niste validno ime! (minimalno 5 karaktera)");
            else {
                var obrisi = confirm("Da li sigurno zelite urediti ovaj predmet?");
                if (obrisi == true) {
                    $("#coursesEdit").html("");
                    APP.getData_ajax("json/scripts/updateCourse.json.php",{ course_ID:id, semester: editsemester, year: edityear, text: edittext}, successFunction, errorFunction,"post");
                    function successFunction(data){
                        if(data == true) {                    
                            alert("Uspjesno ste uredili ovaj predmet!");
                            getCourses();
                        } 
                        else {
                            alert("Doslo je do greske!");
                        }
                    }
                    function errorFunction(error){
                        console.log(error.responseText);
                    }
                }
                editsemester = edityear = edittext = null;    
            }
        }

        function getCourses() {
            var selected_semester = $("#filter_semester select").val();
            selected_year = $("#filter_years select").val();
            APP.getData_ajax("json/scripts/getCourses.json.php",{semester:selected_semester, year:selected_year, selected_subject:selected_subject}, successFunction, errorFunction,"post");
            function successFunction(data){
                if(data.length > 0) {
                    $("#coursesTable table").html("");
                    for(var i = 0; i < data.length; i++) {
                        $("#coursesTable table").append('<tr> <td onclick = "editCourse(\''+data[i].course_ID+'\', this)" class = "smallTableRow">Uredi</td> <td class = "smallTableRow" onclick = "deleteCourse(\''+data[i].course_ID+'\', this)">Obriši</td> <td>'+data[i].name+'</td> </tr>');
                    }
                }
                else $("#coursesTable table").html("<tr><td>Ovaj smjer nema predmeta!</td></tr>");
            }
            function errorFunction(error){
                console.log(error.responseText);
            }           
        }
    </script>