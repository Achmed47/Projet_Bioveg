<?php

include("connexion.php");

$sql = "SELECT count(*) as nbGenes from genes";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

echo $row["nbGenes"];

?>
