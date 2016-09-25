$( document ).ready(function() {
    $("#geneList").on("click", "li.geneListRow", function() {
        var numAccession = $(this).data("numaccession");
        var id = $(this).data("id");

        $("#geneListButton").html($(this).text() + " <span class=\"caret\"></span>");
        $("#loadingGifPrimer").show();

        $.ajax({
            url  : "db/get_gene_dna_sequence.php",
            type : "POST",
            data : "id=" + id,
            dataType : "html",

            success : function(html_result, status) {
                if(status == "success" && html_result !== "error") {
                    console.log(html_result);
                    $("#geneSequencePrimer").html(html_result);
                } else {
                    $("#geneSequencePrimer").text("Error : Couldn't get the dna sequence of the selected gene.");
                }

                $("#loadingGifPrimer").hide();
            },

            error : function(result, status, error) {
                $("#geneSequencePrimer").text("Error : Couldn't get the dna sequence of the selected gene.");
                $("#loadingGifPrimer").hide();
            }
        });
    });
});

