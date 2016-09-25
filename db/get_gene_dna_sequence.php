<?php

include("connexion.php");

$id = isset($_POST["id"]) ? $_POST["id"] : "";

if(is_numeric($id) != 0) {
    $id = (int) $id;
    $sql = "SELECT SEQ FROM genes WHERE ID=$id";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();

    if(array_key_exists("SEQ", $row)) {
        $result = trim(preg_replace('/\s+/', '', $row["SEQ"]));
        echo chunk_split($result, 120, "<br/>");
    } else {
        echo "error";
    }
} else {
    echo "error";
}

?>
