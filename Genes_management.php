<?php
include("db/connexion.php");

$print_limit = 10;

?>

<br/>

<div class="col col-xs-6">
    <button id="addGene" type="button" data-toggle="modal" data-target="#myModal" class="btn btn-sm btn-primary btn-create">Create New</button>
</div>

<div class="col col-xs-6 text-right">
</div>

<br/>

<div id="panelBody" class="panel-body">

    <table id="geneTable" data-page="1" data-lineslimit="<?php echo $print_limit; ?>" class="table table-striped table-bordered table-list">
        <thead>
            <tr>
                <th><p class="fa fa-cog"></p> Tools</th>
                <th class="hidden-xs">ID</th>
                <th>Accession number</th>
                <th>Positions</th>
                <th>Length (bp)</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $sql = "SELECT * FROM genes LIMIT $print_limit";
            $result = $conn->query($sql);
            while($row = $result->fetch_assoc()) {
            ?>
            <tr class="geneLine" id="lineId<?php echo $row["ID"] ?>">
                <td align="center" class="geneActions" data-numaccession="<?php echo $row["NUM_ACCESSION"] ?>" data-end="<?php echo $row["END"] ?>"  data-start="<?php echo $row["START"] ?>" data-sequence="<?php echo $row["SEQ"] ?>" data-id='<?php echo $row["ID"] ?>'>
                    <button class="btn btn-default modifyButton" data-toggle="modal" data-target="#myModal"><em class="fa fa-pencil"></em> Modify</button>
                    <button class="btn btn-danger deleteButton"><em class="fa fa-trash"></em> Delete</button>
                    <button class="btn btn-success"><em class="glyphicon glyphicon-eye-open"></em> Browse introns/exons</button>
                </td>
                <td class="hidden-xs"><?php echo $row["ID"]; ?></td>
                <td class="numAccession"><?php echo $row["NUM_ACCESSION"]; ?></td>
                <td class="genePosition"><?php echo $row["START"]. ".." . $row["END"]; ?> </td>
                <td class="geneLength"><?php echo ($row["END"] - $row["START"]); ?></td>
            </tr>
            <?php }  ?>
        </tbody>
    </table>
</div>

<!-- Modification popup -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="popupTitle">Modifying gene</h4>
            </div>

            <div class="modal-body">
                <form>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Position</label>
                        <div id="genePositionInputBlock" class="input-group col-xs-9">
                            <input type="number" class="form-control" id="genePositionStart" min="0" placeholder="Start" />
                            <span class="input-group-addon">-</span>
                            <input type="number" class="form-control" id="genePositionEnd" min="0" placeholder="End"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="geneAccessionNumber" class="col-sm-2 col-form-label">Accession Number</label>
                        <div class="col-xs-9">
                            <input class="form-control" type="text" value="" id="geneAccessionNumber">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="geneSequence" class="col-sm-2 col-form-label">Sequence</label>
                        <div class="col-xs-9">
                            <textarea style="resize:vertical;max-height:450px;" class="form-control" id="geneSequence" rows="10" cols="1000"></textarea>
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" id="closeModifications" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" id="confirmModifications" data-dismiss="modal" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>

<?php
$sql = "SELECT count(*) as nbLines FROM genes LIMIT 50";
$result = $conn->query($sql);
$row =  $result->fetch_assoc();
$nbPages = ceil($row["nbLines"]/$print_limit);
?>

<div class="panel-footer">
    <div class="row">
        <div id="pageCounter" class="col col-xs-4 textContainer"><h4>Page 1 of <?php echo $nbPages; ?></h4></div>
        <div class="col col-xs-8">
            <ul class="pagination pagination-lg pull-right">
                <li><a id="previousPage" class="disabled" href="#">«</a></li>
                <?php
                    for($currentPage=1; $currentPage<=$nbPages; $currentPage++)
                    {
                        echo "<li class=\"specificPage";

                        if($currentPage == 1)
                        {
                            echo " active";
                        }

                        echo "\"><a href=\"#\">$currentPage</a></li>";
                    }
                ?>
                <li><a id="nextPage" href="#">»</a></li>
            </ul>
        </div>
    </div>
</div>

<script src="JS/gene_management.js"></script>
