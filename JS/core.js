$.getScript("JS/data.js").done(function(script, status, jqxhr) { });

$( document ).ready(function() {

    // Loading genome visualization by default
    $( "#contentGlobal" ).load( "Genome_visualization.php" );

    $.getScript("JS/linearbrush.js").done(function(script, status, jqxhr) { });
    $.getScript("JS/linearplot.js").done(function(script, status, jqxhr) { });
    $.getScript("JS/linearplot_test.js").done(function(script, status, jqxhr) { });


    // Menu actions
    $("ul.nav li").click(function(){
        $(".active").removeClass("active");
        $(this).addClass("active");
    });

    $("#genome").click(function(){
        $( "#contentGlobal" ).load( "Genome_visualization.php" );
        $.getScript("JS/data.js").done(function(script, status, jqxhr) { });
        $.getScript("JS/linearbrush.js").done(function(script, status, jqxhr) { });
        $.getScript("JS/linearplot.js").done(function(script, status, jqxhr) { });
        $.getScript("JS/linearplot_test.js").done(function(script, status, jqxhr) { });
    });

    $("#blast").click(function(){
        $("#contentGlobal" ).load( "Blast.php" );
    });

    $("#primer").click(function(){
        $("#contentGlobal" ).load( "Primer.php" );
    });

    $("#management").click(function(){
        $("#contentGlobal" ).load( "Genes_management.php" );
    });

    $("#protein").click(function(){
        $("#contentGlobal" ).load( "Protein.php" );
    });

    $("#btn_number_accession").click(function(){
        $("#num_access").show();
    });

    $("#btn_liste_gene").click(function(){
        $("#list_gene").show();
    });
});
