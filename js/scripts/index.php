    <script type="text/javascript">
        var year = <?php echo $year ?>;
        var semester = <?php echo $semester; ?>;
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
            alert("test");
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
                $("#filter_courses select").html(data);
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
                $("#filter_courses select").html(data);
            }
            function errorFunction(error){
                console.log(error.responseText);
            }
        });
    </script>