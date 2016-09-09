$(document).ready(function() {
    var Database_blast = "";

    $("#btn_number_accession").click(function(){
        $("#list_gene").hide();
        $("#num_access").show();
    });

    $("#btn_liste_gene").click(function(){
        $("#num_access").hide();
        $("#list_gene").show();
    });

    $("li.liste_dropdown_bd").click(function(){
        $("#dropdownMenu_bd_blast").html($(this).text()+"<span class=\"caret\"></span>");
        Database_blast = $(this).data("numaccession");
    });

    $("li.liste_dropdown_blast").click(function(){
        $("#dropdownMenu_blast").html($(this).text()+"<span class=\"caret\"></span>");
    });

    $("#start_blast").click(function(){
        if ($("#num_access").css("display") != "none"){
            var N_Accession = $("#special_access_number").val();
        }
        else {
            var N_Accession = $("#btn_liste_gene").text();
        };
        var Type_blast = $("#dropdownMenu_blast").text();
        var request_html = "http://blast.ncbi.nlm.nih.gov/Blast.cgi?QUERY="+N_Accession+"&DATABASE=nr&EQ_MENU="+Database_blast+"&EQ_OP=AND&PROGRAM="+Type_blast+"&FILTER=L&EXPECT=0.01&FORMAT_TYPE=HTML&NCBI_GI=on&HITLIST_SIZE=10&CMD=Put";

        console.log(request_html)

        window.open(request_html,"_blank");
    });

});
