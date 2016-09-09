$( document ).ready(function() {
    var nbLines  = $("#geneTable").data("lineslimit");
    var pageLimit = $(".specificPage").length;
    var id;

    /** EVENTS *******************************************/
        // Modification button
    $("#geneTable").on("click", ".modifyButton", function() {
        id = $(this).parent().data("id");
        var numAccession = $(this).parent().data("numaccession");
        var start = $(this).parent().data("start");
        var end = $(this).parent().data("end");
        var sequence = $(this).parent().data("sequence");

        $("#genePositionStart").val(start);
        $("#genePositionEnd").val(end);
        $("#geneAccessionNumber").val(numAccession);
        $("#geneSequence").val(sequence);

        $("#popupTitle").html("Modifying gene " + id);
    });

        // Delete button
    $("#geneTable").on("click", ".deleteButton", function() {
        id = $(this).parent().data("id");

        $.ajax({
            url  : "db/delete_gene.php",
            type : "POST",
            data : "id=" + id,
            dataType : "json",

            success : function(json_result, status) {
                if(status == "success" && json_result == "1")
                {
                    successAlert("Gene has been deleted.");
                    $("#lineId" + id).remove();
                } else {
                    failAlert("<strong>Error :</strong> The gene could not be deleted.");
                }
            },

            error : function(result, status, error){
                failAlert("<strong>Error :</strong> The gene could not be deleted.");
            }
        });
    });

        // Close modifications button
    $("#closeModifications").click(function() {
        resetInputs();
    });

        // Validate Modification buton
    $("#confirmModifications").click(function() {
        var positionStart = $("#genePositionStart").val();
        var positionEnd = $("#genePositionEnd").val();
        var accessionNumber = $("#geneAccessionNumber").val();
        var sequence = $("#geneSequence").val();

        $.ajax({
            url  : "db/modify_gene.php",
            type : "POST",
            data : "id=" + id + "&start=" + positionStart + "&end=" + positionEnd + "&accession=" + accessionNumber + "&sequence=" + sequence,
            dataType : "json",

            success : function(json_result, status) {
                if(status == "success" && json_result == "1")
                {
                    successAlert("Gene has been updated.");

                    // Update line in array
                    $("tr#lineId" + id + " .genePosition").text(positionStart + ".." + positionEnd);
                    $("tr#lineId" + id + " .numAccession").text(accessionNumber);
                    $("tr#lineId" + id + " .geneLength").text(positionEnd-positionStart);

                    // Update actions data
                    $("tr#lineId" + id + " td.geneActions").data("numaccession", accessionNumber);
                    $("tr#lineId" + id + " td.geneActions").data("start", positionStart);
                    $("tr#lineId" + id + " td.geneActions").data("end", positionEnd);
                    $("tr#lineId" + id + " td.geneActions").data("sequence", sequence);
                } else {
                    failAlert("<strong>Error :</strong> The gene could not be updated.");
                }
            },

            error : function(result, status, error){
                failAlert("<strong>Error :</strong> The gene could not be updated.");
            }
        });
    });

    $("#nextPage").click(function() {
        var currentPage = $("#geneTable").data("page") + 1;

        if(currentPage > pageLimit) {
            currentPage = pageLimit;
        }

        updateGenePage(currentPage);
    });

    $("#previousPage").click(function() {
        var currentPage = $("#geneTable").data("page") - 1;

        if(currentPage < 1) {
            currentPage = 1;
        }

        updateGenePage(currentPage);
    });

    $(".specificPage").click(function() {
        var page = parseInt($(this).text());
        updateGenePage(page);
    });

    $("#addGene").click(function() {
        resetInputs();
        $("#popupTitle").html("Create new gene");
    });
    /*****************************************************/



    /** FUNCTIONS*****************************************/
    function resetInputs() {
        $("#genePositionStart").val("");
        $("#genePositionEnd").val("");
        $("#geneAccessionNumber").val("");
        $("#geneSequence").val("");
    }

    function removeAlert() {
        if($("#geneManagementAlert").length)
        {
            $("#geneManagementAlert").remove();
        }
    }

    function failAlert(msg) {
        removeAlert();

        $("#panelBody").prepend('<div id="geneManagementAlert" class="alert alert-danger">\
               <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
            ' + msg + '\
          </div>');
    }

    function successAlert(msg) {
        removeAlert();

        $("#panelBody").prepend('<div id="geneManagementAlert" class="alert alert-success">\
               <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
               ' + msg + '\
          </div>');
    }

    function validateModification(id) {
        $.ajax({
            url  : "db/modify_gene.php",
            type : "POST",
            data : "id=" + id,
            dataType : "json",

            success : function(json_result, status) {
                if(status == "success" && json_result == "1")
                {
                    successAlert("Data has been updated.");
                } else {
                    failAlert("<strong>Error :</strong> The update could not be done.");
                }
            },

            error : function(result, status, error){
                failAlert("<strong>Error :</strong> The update could not be done.");
            }
        });
    }

    function updateGenePage(page) {
        $.ajax({
            url  : "db/get_gene.php",
            type : "POST",
            data : "page="+page+"&nbLines="+nbLines,
            dataType : "html",

            success : function(html_result, status) {
                if(status == "success")
                {
                    $("#geneTable tbody").remove();
                    $("#geneTable").append("<tbody>" + html_result + "</tbody>");
                    $("#geneTable").data("page", page);
                    $("#pageCounter").html("<h4>Page " + page + " of " + $(".specificPage").length + "</h4>");
                    $(".specificPage.active, #nextPage, #previousPage").removeClass("active");
                    $(".specificPage").eq(page-1).addClass("active");
                } else {
                    failAlert("<strong>Error :</strong> The page could not be loaded.");
                }
            },

            error : function(result, status, error){
                console.log(result);
                failAlert("<strong>Error :</strong> The page could not be loaded.");
            }
        });
    }
    /*****************************************************/

});
