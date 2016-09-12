$( document ).ready(function() {
    $("#geneList").on("click", "li.geneListRow", function() {
        $("#geneListButton").html($(this).text() + "<span class=\"caret\"></span>");
        var id = $(this).data("id");

        console.log("id : " + id);
        $.ajax({
            url  : "db/translate_dna_to_prot.php",
            type : "POST",
            data : "id=" + id,
            dataType : "json",

            success : function(json_result, status) {
                if(status == "success") {
                    $("#geneSequence").text(json_result);
                }
            },

            error : function(result, status, error) {
                console.log("error");
            }
        });
    });
});
