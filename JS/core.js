$( document ).ready(function() {
    $("ul.nav li").click(function(){
        $(".active").removeClass("active");
        $(this).addClass("active");
    });

    $("#genome").click(function(){
        $( "#content" ).load( "Genome_visualization.html" );
        $.getScript("JS/linearplot_test.js").done(function(script, status, jqxhr) {
            console.log("ok");
        });

    });

    $("#blast").click(function(){
        $( "#content" ).load( "Blast.html" );
    });

    $("#primer").click(function(){
        $( "#content" ).load( "Primer.html" );
    });

    $("#management").click(function(){
        $( "#content" ).load( "Genes_management.php" );
    });
});

