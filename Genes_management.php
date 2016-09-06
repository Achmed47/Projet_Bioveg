<!doctype html>
<html lang="fr">
    <head>
        <link href="Web/css/styles.css" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link href="Web/css/genes_management.css" rel='stylesheet' type='text/css'>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel='stylesheet' type='text/css'>
        <script src="Web/js/bootstrap.js"></script>
        <script src="Web/js/jquery-3.1.0.js"></script>
    </head>
    <?php
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "eutypatool";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
    ?>
    <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-default panel-table">
          <div class="panel-heading">
            <div class="row">
              <div class="col col-xs-6">
                <h3 class="panel-title">Panel Heading</h3>
              </div>
              <div class="col col-xs-6 text-right">
                <button type="button" class="btn btn-sm btn-primary btn-create">Create New</button>
              </div>
            </div>
          </div>
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
                                <td align="center">
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
          <div class="panel-footer">
            <div class="row">
              <div class="col col-xs-4">Page 1 of 5
              </div>
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
          </div>
        </div>
    </div>
</html>
