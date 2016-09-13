<?php
    include("db/connexion.php");
?>

<form class="form-horinzontal" id="Blast-form">
    <div class="row">
        <div class="btn-group col-md-4" role="group" id=button_group_blast>
            <button type="button" class="btn btn-default" id="btn_number_accession" >Specific Accession Number</button>
            <button type="button" class="btn btn-default" id="btn_liste_gene" >Gene list</button>
        </div>
        <div id="num_access" class="input-group col-md-4"  style="display: none">
            <input type="text" class="form-control" placeholder="N°d'accession" id="special_access_number"/>
        </div>
        <div class="dropdown input-group col-md-4 " id= "list_gene" style="display: none">
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
    <br/>
    <div class="row">
        <div class="dropdown col-md-4">
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu_blast" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Select a blast ...
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <li class="liste_dropdown_blast"><a>blastn</a></li>
                <li class="liste_dropdown_blast"><a>tblastn</a></li>
                <li class="liste_dropdown_blast"><a>blastx</a></li>
                <li class="liste_dropdown_blast"><a>blastp</a></li>
            </ul>
        </div>
    </div>
    <br/>
    <div class="row">
        <div class="dropdown col-md-4">
            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu_bd_blast" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                Select a database ...
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu_bd_blast">
                <li class="liste_dropdown_bd" data-numaccession="Vitis vinifera (taxid:29760)"><a>Vitis vinifera</a></li>
                <li class="liste_dropdown_bd" data-numaccession="Eutypa lata (taxid:97096)"><a>Eutypa Lata </a></li>
            </ul>
        </div>
    </div>
    <br/>
    <div class="row">
        <div class="col-md-4">
            <button class="btn btn-primary btn-lg btn-block" type="button" id="start_blast">Blast</button>
        </div>
    </div>
</form>

<script src="JS/blast.js"></script>
