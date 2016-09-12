$( document ).ready(function() {
    $("#geneList").on("click", "li.geneListRow", function() {
        $("#geneListButton").html($(this).text() + "<span class=\"caret\"></span>");
        var id = $(this).data("id");
        var numAccession = $(this).data("numaccession");
        console.log("id : " + id + " | " + numAccession);

        $("#geneSequence").html('<img src="Web/css/spin.gif" alt="Loading genome ..." style="width:64px;height:64px;" />');

        $.ajax({
            url  : "db/get_gene_dna_sequence.php",
            type : "POST",
            data : "numAccession=" + numAccession,
            dataType : "html",

            success : function(html_result, status) {
                if(status == "success") {
                    console.log(html_result);
                    $("#geneSequence").html(html_result);
                }
            },

            error : function(result, status, error) {
                console.log("error");
            }
        });
    });
});

