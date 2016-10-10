<?php
    include("connexion.php");

    $tracks = array();
    $inSelect = (isset($_POST["genes"])) ? "WHERE g.NUM_ACCESSION IN('".join($_POST["genes"],"', '")."')" : "";

    $sql = "SELECT min(g.START) as minStart, max(g.END) as maxEnd from genes g ".$inSelect;
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $maxEnd = intval($row["maxEnd"]);
    $minStart = intval($row["minStart"]);

    $sql = "SELECT * from genes g ".$inSelect." ORDER BY START, ID";
    $result = $conn->query($sql);

    if($result->num_rows) {
        $genes  = array();
        $idGene = 0;

        while($row = $result->fetch_assoc()) {
            $idGene += 1;
            $geneLine = array(
                "id"     => $idGene,
                "start"  => intval($row["START"]),
                "end"    => intval($row["END"]),
                "geneAN" => $row["NUM_ACCESSION"],
                "name"   => $row["NAME"],
                "geneName" => $row["NAME"],
                "strand" => 0
            );

            $genes[] = $geneLine;
        }

        $track = array(
            "trackName" => "genes",
            "trackType" => "stranded",
            "visible" => true,
            "inner_radius" => 180,
            "outer_radius" => 300,
            "trackFeatures" => "complex",
            "featureThreshold" => $maxEnd,
            "mouseclick" => 'redirectGene',
            "mouseover_callback" => 'islandPopup',
            "mouseout_callback" => 'islandPopupClear',
            "showLabels" => true,
            "showTooltip" => true,
            "linear_mouseclick" => 'redirectGene',
            "items" => $genes
        );

        $tracks[] = $track;



        // Adding components
        $sql = "SELECT gc.NAME as gcName, gc.START as START, gc.END as END, g.NUM_ACCESSION as NUM_ACCESSION, g.NAME as gName, gc.INTRON as INTRON from gene_components gc inner join genes g on gc.GENE_ID = g.ID ".$inSelect." ORDER BY gc.START, gc.GENE_ID";
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
                    "name"   => $row["gcName"]." (".$row["NUM_ACCESSION"].")",
                    "geneAN" => $row["NUM_ACCESSION"]
                );

                if(intval($row["INTRON"])) {
                    $introns[] = $geneComponent;
                } else {
                    $exons[] = $geneComponent;
                }
            }

            $sql = "SELECT max(gc.END) as maxEnd from gene_components gc inner join genes g on gc.GENE_ID = g.ID ".$inSelect;
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
        }
    }

    echo json_encode(array("tracks"=>$tracks, "start"=>$minStart, "end"=>$maxEnd));
?>
