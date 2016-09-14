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
        var numAccession = "";
        var request      = "";
        var typeBlast    = $.trim($("#dropdownMenuBlastType").text());

        if ($("#inputBlastPerso").css("display") != "none"){
            numAccession = $("#inputBlastPerso").val();
            console.log($("#inputBlastPerso").val());
        } else {
            console.log("nb options : " + $('#inputBlastList option').length + " && selected : " + $('#inputBlastList option:selected').data("numaccession"));
            numAccession = $('#inputBlastList option:selected').data("numaccession");
        }
        console.log("blastPerso : " + $("#inputBlastPerso").css("display") + " && blastList : " + $("#inputBlastList").css("display"));
        console.log("numAccession : |" + numAccession + "|");
        console.log("typeBlast : |" + typeBlast + "|");
        console.log("databaseBlast : |" + databaseBlast + "|");

        request = "http://blast.ncbi.nlm.nih.gov/Blast.cgi?QUERY=" + numAccession + "&DATABASE=nr&EQ_MENU=" + databaseBlast + "&EQ_OP=AND&PROGRAM=" + typeBlast + "&FILTER=L&EXPECT=0.01&FORMAT_TYPE=HTML&NCBI_GI=on&HITLIST_SIZE=10&CMD=Put";

        // console.log(request);
        //window.open(request, "_blank");
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
        var $listGene = $("#inputBlastPerso");

        $("#startBlast").removeClass("disabled");

        if ($listGene.css("display") != "none" && !$listGene.val()){
            disabled = true;
        } else if($("#inputBlastList").css("display") != "none" && $('#inputBlastList option:selected').text() == "Accession Number") {
            disabled = true;
        }

        if($("#blastDropdownType").text() == "Blast type" || $("#blastDropdownDb").text() == "Database")
        {
            disabled = true;
        }

        if(disabled) {
            $("#startBlast").addClass("disabled");
        }
    }

});
