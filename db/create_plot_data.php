<?php
    include("connexion.php");

    $tracks = array();
    $trackIndex = 1;
    $sql = "SELECT * from genes ORDER BY START, ID";
    $result = $conn->query($sql);
    $htmlResult = "error";

    if ($result->num_rows > 0) {
        $genes  = array();
        $idGene = 0;

        while($row = $result->fetch_assoc()) {
            $idGene += 1;
            $geneLine = array(
                "id"     => $idGene,
                "start"  => intval($row["START"]),
                "end"    => intval($row["END"]),
                "numAccession" => $row["NUM_ACCESSION"],
                "name"   => $row["NAME"],
                "strand" => 0
            );

            $genes[] = $geneLine;
        }

        $sql = "SELECT max(END) as maxEnd from genes";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();

        $track = array(
            "trackName" => "genes",
            "trackType" => "stranded",
            "visible" => true,
            "inner_radius" => 180,
            "outer_radius" => 300,
            "trackFeatures" => "complex",
            "featureThreshold" => intval($row["maxEnd"]),
            "mouseclick" => 'redirectGene',
            "mouseover_callback" => 'islandPopup',
            "mouseout_callback" => 'islandPopupClear',
            "showLabels" => true,
            "showTooltip" => true,
            "linear_mouseclick" => 'redirectGene',
            "items" => $genes
        );

        $tracks[] = $track;

        // Update plot length
        updateLinearPlotFile($row["maxEnd"]);



        // Adding exons
        $sql = "SELECT gc.NAME as gcName, gc.START as START, gc.END as END, g.NUM_ACCESSION as NUM_ACCESSION, g.NAME as gName, gc.INTRON as INTRON from gene_components gc inner join genes g on gc.GENE_ID = g.ID ORDER BY gc.START, gc.GENE_ID";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $exons   = array();
            $introns = array();
            $idGeneComponent = 1;

            while($row = $result->fetch_assoc()) {
                $idGene += 1;
                $geneComponent = array(
                    "id"     => $idGene,
                    "start"  => intval($row["START"]),
                    "end"    => intval($row["END"]),
                    "name"   => $row["gcName"]." (".$row["gName"].")",
                    "geneAN" => $row["NUM_ACCESSION"]
                );

                if(intval($row["INTRON"])) {
                    $introns[] = $geneComponent;
                } else {
                    $exons[] = $geneComponent;
                }
            }

            $sql = "SELECT max(END) as maxEnd from gene_components";
            $result = $conn->query($sql);
            $row = $result->fetch_assoc();

            $track = array(
                "trackName" => "exons",
                "trackType" => "stranded",
                "visible" => true,
                "inner_radius" => 165,
                "outer_radius" => 190,
                "featureThreshold" => intval($row["maxEnd"]),
                "mouseover_callback" => 'islandPopup',
                "mouseout_callback" => 'islandPopupClear',
                "showLabels" => true,
                "showTooltip" => true,
                "items" => $exons
            );
            $tracks[] = $track;

            $track = array(
                "trackName" => "introns",
                "trackType" => "stranded",
                "visible" => true,
                "inner_radius" => 165,
                "outer_radius" => 190,
                "featureThreshold" => intval($row["maxEnd"]),
                "mouseover_callback" => 'islandPopup',
                "mouseout_callback" => 'islandPopupClear',
                "showLabels" => true,
                "showTooltip" => true,
                "items" => $introns
            );
            $tracks[] = $track;



            $htmlResult = "done";

            $fp = fopen('../JS/data.js', 'w');
            fwrite($fp, "var tracks = ".json_encode($tracks).";");
            fclose($fp);
        }
    }

    echo $htmlResult;

    function updateLinearPlotFile($limit) {
        $linearPlot = "var linearlayout = { genomesize: ".$limit.",
                     height: 250,
                     width: 900,
                     container: '#linearchart',
                     initStart: 0,
                     initEnd: ".$limit."
                    };

var contextLayout = { genomesize: ".$limit.",
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
}";

        $fp = fopen('../JS/linearplot_test.js', 'w');
        fwrite($fp, $linearPlot);
        fclose($fp);
    }
?>
