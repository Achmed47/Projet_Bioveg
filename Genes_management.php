<?php
    include("db_connexion.php");
?>
<br>
<div class="col col-xs-6">
    <button type="button" class="btn btn-sm btn-primary btn-create">Create New</button>
</div>

<div class="col col-xs-6 text-right">
</div>
<br>
<div class="panel-body">
    <table class="table table-striped table-bordered table-list">
      <thead>
        <tr>
            <th><em class="fa fa-cog"> Tools</em></th>
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
                    <tr>
                        <td align="center" data-id='<?php echo $row["ID"] ?>'>
                          <a class="btn btn-default"><em class="fa fa-pencil"> Modify</em></a>
                          <a class="btn btn-danger"><em class="fa fa-trash"> Delete</em></a>
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
