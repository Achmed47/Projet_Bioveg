$(document).ready(function() {
    $("#btn_number_accession").click(function(){
        $("#list_gene").hide();
        $("#num_access").show();
    });

    $("#btn_liste_gene").click(function(){
        $("#num_access").hide();
        $("#list_gene").show();
    });
    console.log($("#num_access").css("display"));
    $("#start_blast").click(function(){
//        if $("#num_access").css("display")
        var N_Accession = $("").text();
        var Database_blast =$("").text() ;
        var Type_blast =$("").text() ;
        var request_html = "http://blast.ncbi.nlm.nih.gov/Blast.cgi?QUERY="+N_Accession+"&DATABASE="+Database_blast+"&PROGRAM="+Type_blast+"&FILTER=L&EXPECT=0.01&FORMAT_TYPE=HTML&NCBI_GI=on&HITLIST_SIZE=10&CMD=Put";
    });
});
