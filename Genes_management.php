<?php
    include("db/connexion.php");
?>

<br>

<div class="col col-xs-6">
    <button type="button" class="btn btn-sm btn-primary btn-create">Create New</button>
</div>

<div class="col col-xs-6 text-right">
</div>
<br>
<div id="panelBody" class="panel-body">

    <table id="geneTable" class="table table-striped table-bordered table-list">
      <thead>
        <tr>
            <th><p class="fa fa-cog"></p> Tools</th>
            <th class="hidden-xs">ID</th>
            <th>Accession number</th>
            <th>Positions</th>
            <th>Length</th>
        </tr>
      </thead>
      <tbody>
          <?php
            $sql = "SELECT * FROM genes";
            $result = $conn->query($sql);
                while($row = $result->fetch_assoc()) {
                    ?>
                    <tr id="lineId<?php echo $row["ID"] ?>">
                        <td align="center" data-id='<?php echo $row["ID"] ?>'>
                          <button class="btn btn-default modifyButton" data-toggle="modal" data-target="#myModal"><em class="fa fa-pencil"></em> Modify</button>
                          <button class="btn btn-danger deleteButton"><em class="fa fa-trash"></em> Delete</button>
                          <button class="btn btn-success"><em class="glyphicon glyphicon-eye-open"></em>Browse introns/exons</button>
                        </td>
                        <td class="hidden-xs"><?php echo $row["ID"]; ?></td>
                        <td><?php echo $row["NUM_ACCESSION"]; ?></td>
                        <td><?php echo $row["START"]. ".." . $row["END"]; ?> </td>
                        <td><?php echo ($row["END"] - $row["START"]); ?></td>
                    </tr>
              <?php }  ?>
        </tbody>
    </table>
</div>

<!-- Modal -->
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
                         <label for="example-number-input" class="col-sm-2 col-form-label">Position</label>
                        <div class="input-group col-xs-5">
                            <input type="text" class="form-control" id="genePositionStart" placeholder="Start" />
                            <span class="input-group-addon">-</span>
                            <input type="text" class="form-control" id="genePositionEnd" placeholder="End"/>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="geneAccessionNumber" class="col-sm-2 col-form-label">Accession Number</label>
                        <div class="col-xs-5">
                            <input class="form-control" type="text" id="" value="" id="geneAccessionNumber">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="geneLength" class="col-sm-2 col-form-label">Length</label>
                        <div class="col-xs-3">
                            <input class="form-control" type="number" value="" id="geneLength">
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" id="closeModifications" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" id="confirmModifications" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>



<script src="JS/gene_management.js"></script>

<!--<div class="panel-footer">
    <div class="row">
          <div class="col col-xs-4">Page 1 of 5</div>
          <div class="col col-xs-8">
                <ul class="pagination hidden-xs pull-right">
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                </ul>

                <ul class="pagination visible-xs pull-right">
                    <li><a href="#">«</a></li>
                    <li><a href="#">»</a></li>
                </ul>
          </div>
    </div>
</div>-->
