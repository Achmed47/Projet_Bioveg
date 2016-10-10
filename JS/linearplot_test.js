var linearTrack;
var brush;
var linearlayout = { genomesize: 256179,
                     height: 250,
                     width: 900,
                     container: '#linearchart',
                     initStart: 0,
                     initEnd: 256179
                    };

var contextLayout = { genomesize: 20000,
                      container: '#brush' };

function redirectGene(trackName, d) {
    console.log(d);
    if(d.geneAN != '' && d.geneAN != undefined) {
        window.open('http://www.ncbi.nlm.nih.gov/gene/?term=' + d.geneAN, '_blank');
    }
}

$( document ).ready(function() {
    resetDisplayedGenes();

    $('#geneSelect').select2({
        placeholder: 'Filter gene(s)'
    });

    bindEvents();
});

function bindEvents() {
    $plot = $('#geneSelect').select2();

    $('#geneSelect').on('select2:unselect', function(e) {
        console.log("unselect");
        $plot.select2("close");
    });

    $('#geneSelect').on('select2:select', function(e) {
        console.log("select");
//        $plot.select2("open");
    });

    $('#geneSelect').on('change', function() {
        if(countSelectedGenes() > 1) {
            updateDisplayedGenes();
        } else {
            resetDisplayedGenes();
        }
    });
}

function updateDisplayedGenes() {
    var selectedGenes = [];

    $('.select2-selection__rendered li').each(function() {
        var re = /(.*)\s\(.*\)/;
        var numAccession = $(this).text();
        numAccession = numAccession.replace(re, '$1');

        if(numAccession !== '') {
            selectedGenes.push(numAccession.substr(1));
        }
    });

    updateDataFile(selectedGenes);
}

function countSelectedGenes() {
    return $('.select2-selection__rendered li').length;
}

function updateDisplayedGenes() {
    var selectedGenes = [];

    $('.select2-selection__rendered li').each(function() {
        var re = /(.*)\s\(.*\)/;
        var numAccession = $(this).text();
        numAccession = numAccession.replace(re, '$1');

        if(numAccession !== '') {
            selectedGenes.push(numAccession.substr(1));
        }
    });

    updateDataFile(selectedGenes);
}

function resetDisplayedGenes() {
    updateDataFile([]);
}

function updateDataFile(selectedGenes) {
    $.ajax({
            url  : "db/getGenesJSON.php",
            type : "POST",
            data : {genes:selectedGenes},
            dataType : "json",

            success : function(json_result, status) {
                if(status == "success")
                {
                    linearlayout.genomesize = parseInt(json_result.end);
                    linearlayout.initStart = parseInt(json_result.start);
                    linearlayout.initEnd = parseInt(json_result.end);
                    contextLayout.genomesize = parseInt(json_result.end);
                    linearTrack = new genomeTrack(linearlayout, json_result.tracks);

                    if(brush == undefined) {
                        brush = new linearBrush(contextLayout,linearTrack);
                    }

                    linearTrack.addBrushCallback(brush);
                } else {
                }
            },

            error : function(result, status, error) {
                console.log(result);
            }
        });
}
