$( document ).ready(function() {
    $("#geneList").on("click", "li.geneListRow", function() {
        var numAccession = $(this).data("numaccession");
        $("#geneListButton").html($(this).text() + "<span class=\"caret\"></span>");
        $("#geneListFormPrimerAccessionNumber .panel-body").text(numAccession);
    });
});

