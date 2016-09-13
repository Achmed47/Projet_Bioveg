<?php
    include("db/connexion.php");
?>

<div id="proteinContent">
    <div class="dropdown" id>
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
    <div class="input-group">
        <div class="panel panel-body">
            <img src="Web/css/spin.gif" id="loadingGif" alt="Loading genome ..." style="display:none;width:64px;height:64px;" />

            <div id=geneSequence>
            </div>
        </div>
    </div>
</div>

<iframe id="iframe_prot" width="900" height="1000" frameborder="0" marginheight="0" marginwidth="0" src="    http://www.ebi.ac.uk/interpro/search/sequence-search#sequence_box_form" style="align=center"></iframe>


<script src="JS/protein.js"></script>
