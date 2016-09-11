<?php

include("connexion.php");

$positionStart = isset($_POST['start']) ? $_POST["start"] : "";
$positionEnd = isset($_POST['end']) ? $_POST["end"] : "";
$name = isset($_POST['name']) ? $_POST["name"] : "";
$type = isset($_POST['type']) ? $_POST["type"] : "";
$geneId = isset($_POST['gene_id']) ? $_POST["gene_id"] : "";

if(is_numeric($geneId) && is_numeric($positionStart) && $positionStart > 0 && is_numeric($positionEnd) && $positionEnd > 0 && strcmp($name, "") != 0 && (strcmp($type, "intron") == 0 || strcmp($type, "exon") == 0))
{
    $positionStart = (int) $positionStart;
    $positionEnd = (int) $positionEnd;
    $geneId = (int) $geneId;

    $type = strcmp($type, "intron") == 0 ? 1 : 0;
    $sql = "INSERT INTO gene_components(`NAME`, `INTRON`, `START`, `END`, `GENE_ID`) VALUES('$name', $type, $positionStart,  $positionEnd, $geneId)";

    if ($conn->query($sql) === TRUE) {
        echo json_encode("1");
    }
}
?>
