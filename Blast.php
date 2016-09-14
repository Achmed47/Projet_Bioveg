<?php
    include("db/connexion.php");
?>

<form class="form-horinzontal" id="blastForm">
    <div class="row">
        <div class="col-lg-6">
            <div class="input-group" id="selectBlastActions">
                <span class="input-group-btn">
                    <button class="btn btn-default active blastAction" id="selectBlastList" type="button"><span class="glyphicon glyphicon-list" aria-hidden="true"></span></button>
                    <button id="selectBlastPerso" class="btn btn-default blastAction" type="button"><span class="glyphicon glyphicon-text-width" aria-hidden="true"></span></button>
<!--                    <button class="btn btn-default blastAction" id="selectBlastFile" type="button"><span class="glyphicon glyphicon-save-file" aria-hidden="true"></span></button>-->
                </span>

                <input id="inputBlastPerso" type="text" class="form-control blastAction" placeholder=" NCBI gi number / FASTA sequence">

<!--
                <span id="inputBlastFile">
                    <label class="custom-file">
                      <input type="file" id="file" cl   ass="custom-file-input">
                      <span class="custom-file-control"></span>
                    </label>
                </span>
                -->

                <select id="inputBlastList" class="form-control blastAction">
                    <option data-numaccession="" disabled selected>Select a gene ...</option>
                <?php
                        $sql = "SELECT ID, NAME, NUM_ACCESSION FROM genes ORDER BY NAME";
                        $result = $conn->query($sql);
                        while($row = $result->fetch_assoc()) {
                            echo "<option data-numaccession=\"".$row["NUM_ACCESSION"]."\" data-id=\"".$row["ID"]."\" class=\"geneListRow\">".$row["NUM_ACCESSION"]." (".$row["NAME"].")</option>";
                        }
                        ?>
                </select>

            </div>
        </div>
    </div>

    <br/>

    <div class="row">
        <div class="dropdown col-md-4">
            <button class="btn btn-default dropdown-toggle large" id="dropdownMenuBlastType" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <b>Blast type</b>
                <span class="caret absoluteCaret"></span>
            </button>
            <ul class="dropdown-menu" id="blastDropdownType" aria-labelledby="dropdownMenu1">
                <li><a>blastn </a></li>
                <li><a>tblastn </a></li>
                <li><a>blastx </a></li>
                <li><a>blastp </a></li>
            </ul>
        </div>
    </div>

    <br/>

    <div class="row">
        <div class="dropdown col-md-4">
            <button class="btn btn-default dropdown-toggle large" type="button" id="dropdownMenuBlastDb" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <b>Database</b>
                <span class="caret absoluteCaret"></span>
            </button>
            <ul class="dropdown-menu" id="blastDropdownDb" aria-labelledby="dropdownMenu_bd_blast">
                <li data-numaccession="Vitis vinifera (taxid:29760)"><a>Vitis vinifera</a></li>
                <li data-numaccession="Eutypa lata (taxid:97096)"><a>Eutypa Lata</a</li>
            </ul>
        </div>
    </div>

    <br/>

    <div class="row">
        <div class="col-md-4">
            <button class="btn btn-primary btn-lg btn-block disabled" type="button" id="startBlast">
                <img src="Web/css/spin.svg" id="loadingGifBlast" alt="" /><span id="blastButtonText">Blast</span></button>
        </div>
    </div>
</form>

<script src="JS/blast.js"></script>
