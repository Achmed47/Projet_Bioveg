$( document ).ready(function() {
    $( "#content" ).load( "Genome_visualization.html" );
    $.getScript("JS/linearplot_test.js").done(function(script, status, jqxhr) { });

    $("ul.nav li").click(function(){
        $(".active").removeClass("active");
        $(this).addClass("active");
    });

    $("#genome").click(function(){
        $( "#content" ).load( "Genome_visualization.html" );
        $.getScript("JS/linearplot_test.js").done(function(script, status, jqxhr) { });
    });

    $("#blast").click(function(){
        $("#content" ).load( "Blast.html" );
    });

    $("#primer").click(function(){
        $("#content" ).load( "Primer.html" );
    });

    $("#management").click(function(){
        $("#content" ).load( "Genes_management.php" );
    });

    $("#protein").click(function(){
        $("#content" ).load( "Protein.html" );
    });

    $("#btn_number_accession").click(function(){
        $("#num_access").show();
    });

    $("#btn_liste_gene").click(function(){
        $("#list_gene").show();
    });
});
