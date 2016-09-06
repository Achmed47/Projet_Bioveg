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


    /** Compteur de nucléotides **/
    String.prototype.count=function(s1) {
    return (this.length - this.replace(new RegExp(s1,"gi"), '').length) / s1.length;
    }
    var primer1 = $("#primerA").val()
    nbA = primer1.count('a')
    nbT = primer1.count('t')
    nbG = primer1.count('g')
    nbC = primer1.count('c')
});


