<?php

include("connexion.php");

$page = isset($_POST['page']) ? $_POST["page"] : "";
$nbLines = isset($_POST['nbLines']) ? $_POST["nbLines"] : "";

if(is_numeric($page) && $page > 0 && is_numeric($nbLines) && $nbLines > 0)
{
    $page = (int) $page;
    $nbLines = (int) $nbLines;
    $start = ($page-1)*$nbLines;

    $sql = "SELECT * from genes ORDER BY ID LIMIT $start, $nbLines";
    $result = $conn->query($sql);
    $html = "";

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $html .= '<tr class="geneLine" id="lineId'.$row["ID"].'">
                    <td class="geneActions text-center" data-numaccession="'.$row["NUM_ACCESSION"].'" data-end="'.$row["END"].'" data-name="'.$row["NAME"].'" data-start="'.$row["START"].'" data-sequence="'.$row["SEQ"].'" data-id="'.$row["ID"].'">
                        <button class="btn btn-default modifyButton" data-toggle="modal" data-target="#myModal"><em class="fa fa-pencil"></em> Modify</button>
                        <button class="btn btn-danger deleteButton"><em class="fa fa-trash"></em> Delete</button>
                        <button class="btn btn-success geneComponentButton" data-toggle="modal" data-target="#geneComponentModal"><em class="glyphicon glyphicon-eye-open"></em> Browse introns/exons</button>
                    </td>
                    <td class="hidden-xs text-center">'.$row["ID"].'</td>
                    <td class="numAccession text-center text-uppercase"><a target="_blank" href="http://www.kegg.jp/dbget-bin/www_bget?ela:'.$row["NUM_ACCESSION"].'">'.$row["NUM_ACCESSION"].'</a></td>
                    <td class="geneName hidden-xs text-center"><em>'.$row["NAME"].'</em></td>
                    <td class="genePosition text-center"><b>'.$row["START"].'</b> .. <b>'.$row["END"].'</b></td>
                    <td class="geneLength text-center">'.($row["END"] - $row["START"]+1).'</td>
                </tr>';
        }

        echo $html;
    }
}

?>
