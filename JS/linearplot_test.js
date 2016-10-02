var linearlayout = { genomesize: 70049,
                     height: 250,
                     width: 900,
                     container: '#linearchart',
                     initStart: 0,
                     initEnd: 70049
                    };

var contextLayout = { genomesize: 70049,
                      container: '#brush' };

var linearTrack = new genomeTrack(linearlayout, tracks);
var brush = new linearBrush(contextLayout,linearTrack);
linearTrack.addBrushCallback(brush);

window.onload = function() {
  if('undefined' !== typeof cTrack) {
    console.log('Hooking up circular plot callback');
    linearTrack.addBrushCallback(cTrack);
    brush.addBrushCallback(cTrack);
  }
}

function resizeLinearPlot() {
    linearTrack.resize(1000);
}

function redirectGene(trackName, d) {
    if(d.numAccession != '') {
        window.open('http://www.ncbi.nlm.nih.gov/gene/?term=' + d.numAccession, '_blank');
    }
}

$( document ).ready(function() {
    $('#geneSelect').select2({
        placeholder: "Filter gene(s)"
    });

    bindEvents();
});

function bindEvents() {
    $(".genes_none").on("mouseover", function() {
        $(".geneComponentsHover").removeClass("geneComponentsHover");

        var numAccession = $(this).next().text();

        $(".exons_text, .introns_text").each(function() {
            if($(this).text().indexOf(numAccession) >= 0) {
                $(this).parent().addClass("geneComponentsHover");
            }
        });
    });

    $("#geneSelect").on("change", function() {
        var nbGeneSelected = $(".select2-selection__rendered li").length;

        if(nbGeneSelected > 1) {
            updateDisplayedGenes();
        } else {
            $(".exons_none, .introns_none, .genes_none").show();
        }
    });
}

function updateDisplayedGenes() {
    var selectedGenes = [];

    $(".exons_none, .introns_none, .genes_none").show();

    $(".select2-selection__rendered li").each(function() {
        var content = $(this).text();

        if(content !== "") {
            selectedGenes.push(content.substr(1));
        }
    });

    $(".exons_none, .introns_none, .genes_none").each(function() {
        var re = /.+\((.+)\)/;
        var numAccession = $(this).next().text();
        numAccession = numAccession.replace(re, "$1");


        if(selectedGenes.indexOf(numAccession) == -1) {
            $(this).hide();
        }
    });


}
