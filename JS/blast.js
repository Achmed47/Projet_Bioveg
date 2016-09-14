$(document).ready(function() {
    var databaseBlast = "";

    // Buttons' action
    $("#selectBlastList").click(function() {
        activateButton($(this));
        hideAccessionNumberInputs();
        $("#inputBlastList").show();
        checkInputs();
    });

    $("#selectBlastFile").click(function() {
        activateButton($(this));
        checkInputs();
    });

    $("#selectBlastPerso").click(function() {
        activateButton($(this));
        hideAccessionNumberInputs();
        $("#inputBlastPerso").show();
        checkInputs();
    });

    // Changing dropdowns option
    $("#blastDropdownDb").on("click", "li", function(){
        $("#dropdownMenuBlastDb").html("<b>" + $(this).text()+"</b><span class=\"caret absoluteCaret\"></span>");
        databaseBlast = $(this).data("numaccession");
        checkInputs();
    });

    $("#blastDropdownType").on("click", "li", function(){
        $("#dropdownMenuBlastType").html("<b>" + $(this).text()+"</b><span class=\"caret absoluteCaret\"></span>");
        checkInputs();
    });

    $("#inputBlastList").change(function() {
        checkInputs();
    });

    $("#inputBlastPerso").on("change paste keyup", function() {
        checkInputs();
    });

    // Submit form action
    $("#startBlast").click(function(){
        if($(this).hasClass("disabled")) {
            return;
        }

        $("#loadingGifBlast").show();
        $("#blastButtonText").text("Creating Blast request ...");

        var urlData   = "";
        var request   = "";
        var typeBlast = $.trim($("#dropdownMenuBlastType").text());

        if ($("#inputBlastPerso").css("display") !== "none"){
            urlData = "sequence=" + $("#inputBlastPerso").val();
        } else {
            urlData = "geneId=" + $('#inputBlastList option:selected').data("id");
        }

        urlData += "&typeBlast=" + typeBlast + "&database=" + databaseBlast;

        console.log(urlData);

        $.ajax({
            url  : "db/get_blast_report.php",
            type : "GET",
            data : urlData,
            dataType : "html",

            success : function(html_result, status) {
                if(status == "success") {
                    var reportNumber = html_result;
                    console.log(html_result);
                    if(reportNumber === "error" || reportNumber === "") {
                        failAlert("<b>Error :</b> Blast request couldn't be created. Check data.");
                    } else {
                        window.open("http://blast.ncbi.nlm.nih.gov/Blast.cgi?RID=" + reportNumber + "&CMD=GET", "_blank");
                    }

                    $("#loadingGifBlast").hide();
                    $("#blastButtonText").text("Blast");
                }
            },

            error : function(result, status, error) {
                console.log(html_result);
                failAlert("<b>Error :</b> Blast request couldn't be created.");
                $("#loadingGifBlast").hide();
                $("#blastButtonText").text("Blast");
            }
        });
    });


    /*** FUNCTION *********/
    function activateButton($button) {
        $("#selectBlastActions button.active").removeClass("active");
        $button.addClass("active");
    }

    function hideAccessionNumberInputs() {
        $("#inputBlastFile, #inputBlastList, #inputBlastPerso").hide();
    }

    function checkInputs() {
        var disabled = false;

        $("#startBlast").removeClass("disabled");

        if ($("#inputBlastPerso").css("display") !== "none" && !$("#inputBlastPerso").val()){
            disabled = true;
        } else if($("#inputBlastList").css("display") !== "none" && $('#inputBlastList option:selected').text() === "Select a gene ...") {
            disabled = true;
        }

        if($.trim($("#blastDropdownType").text()) === "Blast type" || $.trim($("#dropdownMenuBlastDb").text()) === "Database")
        {
            disabled = true;
        }

        if(disabled) {
            $("#startBlast").addClass("disabled");
        }
    }

    function removeAlert() {
        if($("#blastManagementAlert").length)
        {
            $("#blastManagementAlert").remove();
        }
    }

    function failAlert(msg) {
        removeAlert();

        $("#panelBody").prepend('<div id="blastManagementAlert" class="alert alert-danger">\
               <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
            ' + msg + '\
          </div>');
    }

});
