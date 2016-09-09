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

        $("#confirmModifications").html("Save changes")
                                  .unbind("click")
                                  .bind("click", clickSaveChanges);
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
                    updatePagination(true);
                } else {
                    failAlert("<strong>Error :</strong> The gene could not be deleted.");
                }
            },

            error : function(result, status, error) {
                failAlert("<strong>Error :</strong> The gene could not be deleted.");
            }
        });
    });

        // Close modifications button
    $("#closeModifications").click(function() {
        resetInputs();
    });

    $("#nextPage").on("click", function() {
        var currentPage = $("#geneTable").data("page") + 1;

        if(currentPage > pageLimit) {
            currentPage = pageLimit;
        }

        updateGenePage(currentPage);
    });

    $("#previousPage").on("click", function() {
        var currentPage = $("#geneTable").data("page") - 1;

        if(currentPage < 1) {
            currentPage = 1;
        }

        updateGenePage(currentPage);
    });

    $("li.specificPage").bind("click", function() {
        var page = parseInt($(this).text());
        console.log("Chose page : " + page);
        updateGenePage(page);
    });

    $("#addGene").click(function() {
        resetInputs();
        $("#popupTitle").html("Creating new gene");
        $("#confirmModifications").html("Create")
                                  .unbind("click")
                                  .bind("click", clickAddGene);
    });
    /*****************************************************/



    /** FUNCTIONS*****************************************/
    function resetInputs() {
        cleanErrors();
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
                if(status == "success" && json_result == "1") {
                    successAlert("Data has been updated.");
                } else {
                    failAlert("<strong>Error :</strong> The update could not be done.");
                }
            },

            error : function(result, status, error) {
                failAlert("<strong>Error :</strong> The update could not be done.");
            }
        });

        cleanErrors();
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
                failAlert("<strong>Error :</strong> The page could not be loaded.");
            }
        });
    }

    function clickSaveChanges() {
        if(!checkInputs())
        {
            return;
        }

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
                if(status == "success" && json_result == "1") {
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

            error : function(result, status, error) {
                failAlert("<strong>Error :</strong> The gene could not be updated.");
            }
        });

        cleanErrors();
        $('#myModal').modal('toggle');
    }

    function clickAddGene() {
        if(!checkInputs())
        {
            return;
        }

        var positionStart = $("#genePositionStart").val();
        var positionEnd = $("#genePositionEnd").val();
        var accessionNumber = $("#geneAccessionNumber").val();
        var sequence = $("#geneSequence").val();

        $.ajax({
            url  : "db/add_gene.php",
            type : "POST",
            data : "start=" + positionStart + "&end=" + positionEnd + "&accession=" + accessionNumber + "&sequence=" + sequence,
            dataType : "json",

            success : function(json_result, status) {
                if(status == "success" && json_result == "1") {
                    successAlert("The gene has been created.");
                    updatePagination(true);
                } else {
                    failAlert("<strong>Error :</strong> The gene could not be created.");
                }
            },

            error : function(result, status, error) {
                failAlert("<strong>Error :</strong> The gene could not be created.");
            }
        });

        cleanErrors();
        $('#myModal').modal('toggle');
    }

    function checkInputs() {
        cleanErrors();

        if(!isSequenceValid()) {
            $("#geneSequence").parent().addClass("has-error");
        }

        if(!$("#geneAccessionNumber").val()) {
            $("#geneAccessionNumber").parent().addClass("has-error");
        }

        if(!$("#genePositionStart").val() || !$("#genePositionEnd").val() || parseInt($("#genePositionStart").val()) >= parseInt($("#genePositionEnd").val())) {
            $("#genePositionEnd").parent().addClass("has-error");
        }

        return ($(".has-error").length > 0) ? false : true;
    }

    function isSequenceValid() {
        var pattern = new RegExp("^[ATGC\\s]+$", "ig");
        return pattern.test($("#geneSequence").val());
    }

    function cleanErrors() {
        $(".has-error").removeClass("has-error");
    }

    function updatePagination(doRedirectToLastPage) {
        $.ajax({
            url  : "db/get_pages.php",
            type : "POST",
            data : "",
            dataType : "json",

            success : function(json_result, status) {
                if(status == "success") {
                    var currentNbLines = parseInt(json_result);
                    var nbPages = 1;

                    $(".specificPage").remove();

                    while(currentNbLines > 0) {
                        $("<li class=\"specificPage\"><a href=\"#\">" + nbPages + "</a></li>").insertBefore($("#nextPage").parent());

                        currentNbLines -= nbLines;
                        nbPages++;
                    }

                    pageLimit = nbPages-1;
                    updateGenePage(pageLimit);


                    $("li.specificPage").unbind("click")
                                        .bind("click", function() {
                                            var page = parseInt($(this).text());
                                            updateGenePage(page);
                                        });
                } else {
                    failAlert("<strong>Error :</strong> Pagination couldn't be refreshed.");
                }
            },

            error : function(result, status, error) {
                failAlert("<strong>Error :</strong> Pagination couldn't be refreshed.");
            }
        });
    }
    /*****************************************************/

});
