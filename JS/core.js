$( document ).ready(function() {

    $("#genome").click(function(){
        $( "#content" ).load( "genome_visualiser.html" );
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

