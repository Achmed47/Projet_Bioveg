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
    bindEvents();
});

function bindEvents() {
    $(".genes_none").on("mouseover", function() {
        console.log("ok");
        $(".geneComponentsHover").removeClass("geneComponentsHover");

        var numAccession = $(this).next().text();

        $(".exons_text, .introns_text").each(function() {
            if($(this).text().indexOf(numAccession) >= 0) {
                $(this).parent().addClass("geneComponentsHover");
            }
        });
    });
}
