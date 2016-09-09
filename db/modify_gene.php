<?php

include("connexion.php");

$id = isset($_POST['id']) ? $_POST["id"] : "";
$positionStart = isset($_POST['start']) ? $_POST["start"] : "";
$positionEnd = isset($_POST['end']) ? $_POST["end"] : "";
$accessionNumber = isset($_POST['accession']) ? $_POST["accession"] : "";
$sequence = isset($_POST['sequence']) ? $_POST["sequence"] : "";

if(is_numeric($id) && is_numeric($positionStart) && is_numeric($positionEnd) && $accessionNumber != "")
{
    $id = (int) $id;
    $positionStart = (int) $positionStart;
    $positionEnd = (int) $positionEnd;

    $sql = "UPDATE genes SET NUM_ACCESSION='$accessionNumber', START=$positionStart,  END=$positionEnd, SEQ='$sequence' WHERE id=$id";

    if ($conn->query($sql) === TRUE && $conn->affected_rows > 0) {
        echo json_encode("1");
    }
}
?>
