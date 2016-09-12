<?php

include("connexion.php");

$id = isset($_POST['id']) ? $_POST["id"] : "";

if(is_numeric($id))
{
    $id = (int) $id;

    $sql = "DELETE FROM genes WHERE id=$id";
    $sql2 = "DELETE FROM gene_components WHERE GENE_ID=$id";

    if ($conn->query($sql) === TRUE && $conn->affected_rows > 0 && $conn->query($sql2) === TRUE) {
        echo json_encode("1");
    }
}

?>
