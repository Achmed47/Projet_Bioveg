<?php
include("connexion.php");

$id = isset($_GET['id']) ? $_GET["id"] : "";

if(is_numeric($id))
{
    $id = (int) $id;

    $sql = "DELETE FROM genes WHERE id=3";

    if ($conn->query($sql) === TRUE) {
        echo json_encode("1");
    }
}
?>
