<?php

include("connexion.php");

$id = isset($_POST['id']) ? $_POST["id"] : "";

if(is_numeric($id))
{
    $id = (int) $id;

    $sql = "DELETE FROM genes WHERE id=$id";

    if ($conn->query($sql) === TRUE && $conn->affected_rows > 0) {
        echo json_encode("1");
    }
}

?>
