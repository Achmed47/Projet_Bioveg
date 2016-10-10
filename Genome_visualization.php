<?php
    include("db/connexion.php");
?>

<div id="genomeVisualization">
    <div id="geneSelectContainer">
        <select id="geneSelect" class="js-example-basic-multiple js-states form-control" multiple="multiple">
            <?php
                $sql = "SELECT NAME, NUM_ACCESSION FROM genes ORDER BY NAME";
                $result = $conn->query($sql);
                while($row = $result->fetch_assoc()) {
                    echo "<option>".$row["NUM_ACCESSION"]." (".$row["NAME"].")</option>";
                }
            ?>
        </select>
    </div>

    <div id="linearchart"></div>
    <div id="brush"></div>
</div>
