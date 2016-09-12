<?php
    include("db/connexion.php");
?>

<div>
    <div class="dropdown">
        <button class="btn btn-default dropdown-toggle" type="button" id="geneListButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Liste de gènes
            <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" id="geneList" aria-labelledby="dropdownMenu1">
            <?php
            $sql = "SELECT ID, NAME, NUM_ACCESSION FROM genes ORDER BY NAME";
            $result = $conn->query($sql);
            while($row = $result->fetch_assoc()) {
                echo "<li data-id=\"".$row["ID"]."\" class=\"geneListRow\"><a href=\"#\">".$row["NAME"]." (".$row["NUM_ACCESSION"].")</a></li>";
            }
            ?>
        </ul>
    </div>
    <div class="input-group">
        <div class="panel panel-default">
            <div class="panel-body">
                Chaine nucléique
                </br>
            Chaine protéique
            </div>
        </div>
    </div>
</div>

<script src="JS/protein.js"></script>
