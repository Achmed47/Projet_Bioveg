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
    $("#startBlast").click(function() {
        if($(this).hasClass("disabled") || $("#loadingGifBlast").is(":visible")) {
            return;
        }

        $("#loadingGifBlast").show();
        $("#blastButtonText").text("Creating Blast request ...");

        var urlData   = "";
        var request   = "";
        var typeBlast = $.trim($("#dropdownMenuBlastType").text());

        if ($("#inputBlastPerso").css("display") !== "none"){
            var sequence = $("#inputBlastPerso").val();
            var matches = sequence.match(/gi\|\s[0-9]+/g);
            if(matches.length == 0) {
                sequence = sequence.replace(/<br\/>/g, "");
                sequence = sequence.match(/[\sGPAVLIMCFYWHKRQNEDSTX*_]+$/g);
            } else {
                sequence = matches[0];
            }

            urlData = "sequence=" + sequence + "&typeBlast=" + typeBlast + "&database=" + databaseBlast;

            if(typeBlast === "blastp" || typeBlast == "tblastn" || typeBlast === "blastx") {
                urlData += "&db=nr";
            } else {
                urlData += "&db=nr";
            }

            createBlastRequest(urlData);
        } else {
            if(typeBlast === "blastp" || typeBlast === "tblastn") {
                var numAccession = $('#inputBlastList option:selected').data("numaccession");

                if(numAccession !== "") {
                    $.ajax({
                        url  : "db/get_gene_protein_sequence.php",
                        type : "POST",
                        data : "numAccession=" + numAccession,
                        dataType : "html",

                        success : function(html_result, status) {
                            if(status == "success") {
                                html_result = html_result.replace(/<br\/>/g, "");
                                html_result = html_result.match(/[GPAVLIMCFYWHKRQNEDSTX*]+$/g);
                                urlData = "sequence=" + html_result + "&typeBlast=" + typeBlast + "&database=" + databaseBlast + "&db=nr";
                                createBlastRequest(urlData);
                            }
                        },

                        error : function(result, status, error) {
                            $("#loadingGif").hide();
                            $("#geneSequence").html("Couldn't get the protein sequence");
                        }
                    });
                } else {
                    failAlert("Error : No accession number associated to the selected gene.");
                }
            } else {
                urlData = "geneId=" + $('#inputBlastList option:selected').data("id") + "&typeBlast=" + typeBlast + "&database=" + databaseBlast;

                if(typeBlast === "blastx") {
                    urlData += "&db=nr";
                } else {
                    urlData += "&db=nr";
                }

                createBlastRequest(urlData);
            }
        }
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

        if($.trim($("#dropdownMenuBlastType").text()) === "Blast type" || $.trim($("#dropdownMenuBlastDb").text()) === "Database") {
            disabled = true;
        }

        if(disabled) {
            $("#startBlast").addClass("disabled");
        }
    }

    function removeAlert() {
        if($("#blastAlert").length)
        {
            $("#blastAlert").remove();
        }
    }

    function failAlert(msg) {
        removeAlert();

        $("#blastForm").prepend('<div id="blastAlert" class="alert alert-danger">\
               <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
            ' + msg + '\
          </div>');
    }

    function createBlastRequest(urlData) {
        removeAlert();

        $.ajax({
            url  : "db/get_blast_report.php",
            type : "POST",
            data : urlData,
            dataType : "html",

            success : function(html_result, status) {
                if(status == "success") {
                    var reportNumber = html_result;

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
                failAlert("<b>Error :</b> Blast request couldn't be created.");
                $("#loadingGifBlast").hide();
                $("#blastButtonText").text("Blast");
            }
        });
    }

});
