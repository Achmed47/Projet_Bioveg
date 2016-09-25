<?php
    include("db/connexion.php");
?>

<form class="form-inline" id="geneListFormPrimer">
    <div class="form-group">
        <div class="dropdown">
            <button class="btn btn-default dropdown-toggle" type="button" id="geneListButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Select a gene ...
            <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" id="geneList" aria-labelledby="dropdownMenu1">
            <?php
            $sql = "SELECT ID, NAME, NUM_ACCESSION FROM genes ORDER BY NAME";
            $result = $conn->query($sql);
            while($row = $result->fetch_assoc()) {
                echo "<li data-numaccession=\"".$row["NUM_ACCESSION"]."\" data-id=\"".$row["ID"]."\" class=\"geneListRow\"><a href=\"#\">".$row["NAME"]." (".$row["NUM_ACCESSION"].")</a></li>";
            }
            ?>
            </ul>
        </div>
    </div>
</form>

<div class="input-group">
    <div class="panel panel-body">
        <img src="Web/css/spin.svg" id="loadingGifPrimer" alt="Loading genome ..." style="display:none;width:64px;height:64px;" />

        <div id="geneSequencePrimer">
        </div>
    </div>
</div>

<iframe id="iframe_primer" width="900" height="1000" frameborder="0" marginheight="0" marginwidth="0" src="http://www.ncbi.nlm.nih.gov/tools/primer-blast/" style="align=center"></iframe>

<script src="JS/primer.js"></script>

