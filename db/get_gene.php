<?php

include("connexion.php");

$page = isset($_POST['page']) ? $_POST["page"] : "";
$nbLines = isset($_POST['nbLines']) ? $_POST["nbLines"] : "";

if(is_numeric($page) && $page > 0 && is_numeric($nbLines) && $nbLines > 0)
{
    $page = (int) $page;
    $nbLines = (int) $nbLines;
    $start = ($page-1)*$nbLines;

    $sql = "SELECT * from genes LIMIT $start, $nbLines";
    $result = $conn->query($sql);
    $html = "";

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $html .= '<tr class="geneLine" id="lineId'.$row["ID"].'">
                    <td align="center" class="geneActions" data-numaccession="'.$row["NUM_ACCESSION"].'" data-end="'.$row["END"].'"  data-start="'.$row["START"].'" data-sequence="'.$row["SEQ"].'" data-id="'.$row["ID"].'">
                        <button class="btn btn-default modifyButton" data-toggle="modal" data-target="#myModal"><em class="fa fa-pencil"></em> Modify</button>
                        <button class="btn btn-danger deleteButton"><em class="fa fa-trash"></em> Delete</button>
                        <button class="btn btn-success"><em class="glyphicon glyphicon-eye-open"></em> Browse introns/exons</button>
                    </td>
                    <td class="hidden-xs">'.$row["ID"].'</td>
                    <td class="numAccession">'.$row["NUM_ACCESSION"].'</td>
                    <td class="genePosition">'.$row["START"].'..'.$row["END"].'</td>
                    <td class="geneLength">'.($row["END"] - $row["START"]).'</td>
                </tr>';
        }

        echo $html;
    }
}

?>
