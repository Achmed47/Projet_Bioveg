$( document ).ready(function() {
    var id;

    /** EVENTS *******************************************/
        // Modification button
    $(".modifyButton").on("click", function() {
        id = $(this).parent().data("id");
        $("#popupTitle").html("Modifying gene " + id);
    });


        // Delete button
    $(".deleteButton").on("click", function() {
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
        id = $(this).parent().data("id");

        var positionStart = $("#genePositionStart").val("");
        $("#genePositionEnd").val("");
        $("#geneAccessionNumber").val("");
        $("#geneLength").val("");

        $.ajax({
            url  : "db/update_gene.php",
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
    /*****************************************************/



    /** FUNCTIONS*****************************************/
    function resetInputs() {
        $("#genePositionStart").val("");
        $("#genePositionEnd").val("");
        $("#geneAccessionNumber").val("");
        $("#geneLength").val("");
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
    /*****************************************************/

});
