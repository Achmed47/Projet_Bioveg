<?php

include("connexion.php");

$positionStart = isset($_POST['start']) ? $_POST["start"] : "";
$positionEnd = isset($_POST['end']) ? $_POST["end"] : "";
$accessionNumber = isset($_POST['accession']) ? $_POST["accession"] : "";
$sequence = isset($_POST['sequence']) ? $_POST["sequence"] : "";
$name = isset($_POST['name']) ? $_POST["name"] : "";

if(is_numeric($positionStart) && $positionStart > 0 && is_numeric($positionEnd) && $positionEnd > 0 && $accessionNumber != "" && $name != "")
{
    $positionStart = (int) $positionStart;
    $positionEnd = (int) $positionEnd;

    $sql = "INSERT INTO genes(NAME, NUM_ACCESSION, SEQ, START, END) VALUES('$name', '$accessionNumber', '$sequence', $positionStart,  $positionEnd)";

    if ($conn->query($sql) === TRUE) {
        echo json_encode("1");
    }
}
?>
