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
        var name = $(this).parent().data("name");

        $("#confirmModifications").html("Save changes")
                                  .unbind("click")
                                  .bind("click", clickSaveChanges);
        $("#geneName").val(name);
        $("#genePositionStart").val(start);
        $("#genePositionEnd").val(end);
        $("#geneAccessionNumber").val(numAccession);
        $("#geneSequence").val(sequence);

        $("#popupTitle").html("Modifying gene " + id);
    });

        // Delete button
    $("#geneTable").on("click", ".deleteButton", function() {
        id = $(this).parent().data("id");
        var accessionNumber = $(this).parent().data("numaccession");
        var name = $(this).parent().data("name");

        $.ajax({
            url  : "db/delete_gene.php",
            type : "POST",
            data : "id=" + id,
            dataType : "json",

            success : function(json_result, status) {
                if(status == "success" && json_result == "1")
                {
                    successAlert("The gene <b>" + id + " (" + name + ")</b> has been deleted.");
                    $("#lineId" + id).remove();
                    updatePagination(false);
                    updatePlotDataFile();
                } else {
                    failAlert("<strong>Error :</strong> The gene <b>" + id + " (" + name + ")</b> could not be deleted.");
                }
            },

            error : function(result, status, error) {
                failAlert("<strong>Error :</strong> The gene <b>" + id + " (" + name + ")</b> could not be deleted.");
            }
        });
    });

        // Gene component browsing
    $("#geneTable").on("click", ".geneComponentButton", function() {
        cleanErrors();
        id = $(this).parent().data("id");
        type = $(".geneComponentType.active").eq(0).data("type");

        updateGeneComponentTable(id, type);
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
        var nbPages = $("li.specificPage").length;

        if(currentPage < 1) {
            currentPage = (nbPages == 0) ? 0 : 1;
        }

        updateGenePage(currentPage);
    });

    $("li.specificPage").bind("click", function() {
        var page = parseInt($(this).text());
        updateGenePage(page);
    });

    $("#addGene").click(function() {
        resetInputs();
        $("#popupTitle").html("Creating new gene");
        $("#confirmModifications").html("Create")
                                  .unbind("click")
                                  .bind("click", clickAddGene);
    });

    $(".geneComponentType").click(function() {
        $(".geneComponentType.active").removeClass("active");
        $(this).addClass("active");
        type = $(".geneComponentType.active").eq(0).data("type");

        updateGeneComponentTable(id, type);
    });

    $("#geneComponentTable").on("click", ".geneComponentDeleteButton", function() {
        $line = $(this).parent().parent();
        var componentId = $line.data("id");
        var type = $(".geneComponentType.active").eq(0).data("type");
        var name = $line.find(".geneComponentName").html();

        $.ajax({
            url  : "db/delete_gene_component.php",
            type : "POST",
            data : "id=" + componentId,
            dataType : "json",

            success : function(json_result, status) {
                if(status == "success" && json_result == "1")
                {
                    successAlert("The " + type + " " + name + " has been deleted.");
                    $line.remove();
                    updatePlotDataFile();
                } else {
                    failAlert("<strong>Error :</strong> The " + type + " could not be deleted.");
                }
            },

            error : function(result, status, error) {
                failAlert("<strong>Error :</strong> The " + type + " could not be deleted.");
            }
        });
    });

    $("#addGeneComponent").click(function() {
        if(!checkGeneComponentInput()) {
            return;
        }

        var name = "";

        if($("#geneComponentName").val() == "")
        {
            var count = parseInt($(".geneComponentLine").length)+1;
            name = $(".geneComponentType.active").eq(0).data("type") + count;
        } else {
            name = $("#geneComponentName").val();
        }

        var start = $("#geneComponentPositionStart").val();
        var end   = $("#geneComponentPositionEnd").val();
        var type  = $(".geneComponentType.active").eq(0).data("type");

        $.ajax({
            url  : "db/add_gene_component.php",
            type : "POST",
            data : "start=" + start + "&end=" + end + "&type=" + type + "&name=" + name + "&gene_id=" + id,
            dataType : "json",

            success : function(json_result, status) {
                if(status == "success" && json_result == "1") {
                    successAlert("The " + type + " <b>" + name + "</b> has been created.");
                    updateGeneComponentTable(id, type);
                    updatePlotDataFile();
                } else {
                    failAlert("<strong>Error :</strong> The " + type + " <b>" + name + "</b> could not be created.");
                }
            },

            error : function(result, status, error) {
                failAlert("<strong>Error :</strong> The " + type + " <b>" + name + "</b> could not be created.");
            }
        });
    });
    /*****************************************************/


    /** FUNCTIONS*****************************************/
    function resetInputs() {
        cleanErrors();
        $("#genePositionStart").val("");
        $("#genePositionEnd").val("");
        $("#geneAccessionNumber").val("");
        $("#geneSequence").val("");
        $("#geneName").val("");
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
                    updatePlotDataFile();
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
        if(!checkGeneInputs())
        {
            return;
        }

        var positionStart = $("#genePositionStart").val();
        var positionEnd = $("#genePositionEnd").val();
        var accessionNumber = $("#geneAccessionNumber").val();
        var sequence = $("#geneSequence").val();
        var name = $("#geneName").val();

        $.ajax({
            url  : "db/modify_gene.php",
            type : "POST",
            data : "id=" + id + "&name=" + name + "&start=" + positionStart + "&end=" + positionEnd + "&accession=" + accessionNumber + "&sequence=" + sequence,
            dataType : "json",

            success : function(json_result, status) {
                if(status == "success" && json_result == "1") {
                    successAlert("The gene <b>" + id + " (" + name + ")</b> has been updated.");

                    // Update line in array
                    $("tr#lineId" + id + " .geneName").html("<em>" + name + "</em>");
                    $("tr#lineId" + id + " .genePosition").html("<b>" + positionStart + "</b> .. <b>" + positionEnd + "</b>");
                    $("tr#lineId" + id + " .numAccession").html("<a target='_blank' href='http://www.kegg.jp/dbget-bin/www_bget?ela:" + accessionNumber + "'>" + accessionNumber + "</a>");
                    $("tr#lineId" + id + " .geneLength").text(positionEnd-positionStart);

                    // Update actions data
                    $("tr#lineId" + id + " td.geneActions").data("numaccession", accessionNumber);
                    $("tr#lineId" + id + " td.geneActions").data("name", name);
                    $("tr#lineId" + id + " td.geneActions").data("start", positionStart);
                    $("tr#lineId" + id + " td.geneActions").data("end", positionEnd);
                    $("tr#lineId" + id + " td.geneActions").data("sequence", sequence);

                    updatePlotDataFile();
                } else {
                    failAlert("<strong>Error :</strong> The gene <b>" + id + " (" + name + ")</b> could not be updated.");
                }
            },

            error : function(result, status, error) {
                failAlert("<strong>Error :</strong> The gene <b>" + id + " (" + name + ")</b> could not be updated.");
            }
        });

        cleanErrors();
        $('#myModal').modal('toggle');
    }

    function clickAddGene() {
        if(!checkGeneInputs())
        {
            return;
        }

        var positionStart = $("#genePositionStart").val();
        var positionEnd = $("#genePositionEnd").val();
        var accessionNumber = $("#geneAccessionNumber").val();
        var sequence = $("#geneSequence").val();
        var name = $("#geneName").val();

        $.ajax({
            url  : "db/add_gene.php",
            type : "POST",
            data : "name=" + name + "&start=" + positionStart + "&end=" + positionEnd + "&accession=" + accessionNumber + "&sequence=" + sequence,
            dataType : "json",

            success : function(json_result, status) {
                if(status == "success" && json_result == "1") {
                    successAlert("The gene <b>" + name + "</b> has been created.");
                    updatePagination(true);
                    updatePlotDataFile();
                } else {
                    failAlert("<strong>Error :</strong> The gene <b>" + name + "</b> could not be created.");
                }
            },

            error : function(result, status, error) {
                failAlert("<strong>Error :</strong> The gene <b>" + name + "</b> could not be created.");
            }
        });

        cleanErrors();
        $('#myModal').modal('toggle');
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
                    var currentPage = $("li.specificPage.active").text();

                    $(".specificPage").remove();

                    while(currentNbLines > 0) {
                        $("<li class=\"specificPage\"><a href=\"#\">" + nbPages + "</a></li>").insertBefore($("#nextPage").parent());

                        currentNbLines -= nbLines;
                        nbPages++;
                    }

                    pageLimit = nbPages-1;

                    updateGenePage(doRedirectToLastPage ? pageLimit : currentPage);

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

    function updateGeneComponentTable(id, type) {
        $.ajax({
            url  : "db/get_gene_component.php",
            type : "POST",
            data : "gene_id=" + id + "&type=" + type,
            dataType : "html",

            success : function(html_result, status) {
                if(status == "success") {
                    $("#geneComponentTable tbody tr").remove();
                    $("#geneComponentTable tbody").append(html_result);
                    updatePlotDataFile();
                } else {
                    failAlert("<strong>Error :</strong> Gene components could not be loaded.");
                }
            },

            error : function(result, status, error) {
                failAlert("<strong>Error :</strong> Gene components could not be loaded.");
            }
        });
    }

    function checkGeneInputs() {
        cleanErrors();

        if(!isSequenceValid()) {
            $("#geneSequence").parent().addClass("has-error");
            failAlert("<strong>Error :</strong> Check sequence's field. It must be DNA sequence.");
        }

        var start = parseInt($("#genePositionStart").val());
        var end   = parseInt($("#genePositionEnd").val());

        if(isNaN(start) || isNaN(end)) {
            $("#genePositionEnd").parent().addClass("has-error");
            failAlert("<strong>Error :</strong> Position must be provided in order to create a new gene.");
        } else if(start >= end) {
            $("#genePositionEnd").parent().addClass("has-error");
            failAlert("<strong>Error :</strong> The end position of the gene must be located after its start.");
        }

        if(!$("#geneName").val()) {
            $("#geneName").parent().addClass("has-error");
            failAlert("<strong>Error :</strong> The gene's name must be provided in order to create a new gene.");
        }

        return ($(".has-error").length > 0) ? false : true;
    }

    function checkGeneComponentInput() {
        cleanErrors();

        var start = parseInt($("#geneComponentPositionStart").val());
        var end   = parseInt($("#geneComponentPositionEnd").val());
        var min   = parseInt($("#lineId"+id+" td:eq(0)").data("start"));
        var max   = parseInt($("#lineId"+id+" td:eq(0)").data("end"));
        var type  = $(".geneComponentType.active").eq(0).data("type");

        if(isNaN(start) || isNaN(end)) {
            $("#geneComponentPositionEnd").parent().addClass("has-error");
            failAlert("<strong>Error :</strong> Position must be provided in order to create a new " + type + ".");
        } else if(start >= end) {
            $("#geneComponentPositionEnd").parent().addClass("has-error");
            failAlert("<strong>Error :</strong> The end position of the " + type + " must be located after its start.");
        } else if(start < min || end > max) {
            $("#geneComponentPositionEnd").parent().addClass("has-error");
            failAlert("<strong>Error :</strong> The position of the " + type + " must be in the gene position's interval.");
        }

        return ($(".has-error").length > 0) ? false : true;
    }

    function updatePlotDataFile() {
        $.ajax({
            url  : "db/create_plot_data.php",
            type : "POST",
            data : "",
            dataType : "html",

            success : function(html_result, status) {
                if(status == "success" && html_result === "done") {
                    console.log("ok");
                } else {
                    failAlert("<strong>Error :</strong> Genome visualization's data file couldn't been updated.");
                }
            },

            error : function(result, status, error) {
                failAlert("<strong>Error :</strong> Genome visualization's data file couldn't been updated.");
            }
        });
    }
    /*****************************************************/

});
