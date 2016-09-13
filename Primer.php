<?php
    include("db/connexion.php");
?>

<div>
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
                    echo "<li data-numaccession=\"".$row["NUM_ACCESSION"]."\" data-id=\"".$row["ID"]."\" class=\"geneListRow\"><a href=\"#\">".$row["NAME"]."</a></li>";
                }
                ?>
                </ul>
            </div>
        </div>

        <div class="form-group" id="geneListFormPrimerAccessionNumber">
            <div class="panel panel-default">
              <div class="panel-body">
                  Corresponding accession number
              </div>
            </div>
        </div>
    </form>

    <iframe id="iframe_primer" width="900" height="1000" frameborder="0" marginheight="0" marginwidth="0" src="http://www.ncbi.nlm.nih.gov/tools/primer-blast/" style="align=center"></iframe>
</div>

<script src="JS/primer.js"></script>

