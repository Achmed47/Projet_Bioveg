<?php

include("connexion.php");

$componentId = isset($_POST['id']) ? $_POST["id"] : "";

if(is_numeric($componentId))
{
    $componentId = (int) $componentId;
    $sql = "DELETE FROM gene_components WHERE ID=$componentId";

    if ($conn->query($sql) === TRUE && $conn->affected_rows > 0) {
        echo json_encode("1");
    }
}

?>
