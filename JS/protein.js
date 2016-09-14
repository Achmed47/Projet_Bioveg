$( document ).ready(function() {
    $("#geneList").on("click", "li.geneListRow", function() {
        $("#geneListButton").html($(this).text() + "<span class=\"caret\"></span>");
        var id = $(this).data("id");
        var numAccession = $(this).data("numaccession");
        console.log("id : " + id + " | " + numAccession);

        $("#geneSequence").text("");
        $("#loadingGif").show();

        $.ajax({
            url  : "db/get_gene_protein_sequence.php",
            type : "POST",
            data : "numAccession=" + numAccession,
            dataType : "html",

            success : function(html_result, status) {
                if(status == "success") {
                    console.log(html_result);
                    $("#loadingGif").hide();
                    $("#geneSequence").html(html_result);
                }
            },

            error : function(result, status, error) {
                $("#loadingGif").hide();
                $("#geneSequence").html("Couldn't get the protein sequence");
            }
        });
    });
});

