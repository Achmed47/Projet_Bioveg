$( document ).ready(function() {
    $("ul.nav li").click(function(){
        $(".active").removeClass("active");
        $(this).addClass("active");
    });

    $("#genome").click(function(){
        $( "#content" ).load( "Genome_visualization.html" );
    });

    $("#blast").click(function(){
        $( "#content" ).load( "Blast.html" );
    });

    $("#primer").click(function(){
        $( "#content" ).load( "Primer.html" );
    });

    $("#managment").click(function(){
        $( "#content" ).load( "Genes_management.php" );
    });
});

