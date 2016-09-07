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

    $("#protein").click(function(){
        $( "#content" ).load( "Protein.html" );
    });


    /** Compteur de primer **/
    var seq = $("seq").val()
    var primer_length = $("#primer_size").text()
    var primer_forward = seq.prototype.substr(0,length_primer)
    var primer_reverse = seq.prototype.substr((seq.length()-length_primer),length_primer)

    String.prototype.count=function(s1) {
    return (this.length - this.replace(new RegExp(s1,"gi"), '').length) / s1.length;
    }
    var seq = $("#primerA").val()
    nbA = primer1.count('a')
    nbT = primer1.count('t')
    nbG = primer1.count('g')
    nbC = primer1.count('c')




});


