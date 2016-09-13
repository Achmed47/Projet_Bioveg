<?php

include("connexion.php");

$type = isset($_POST['type']) ? $_POST["type"] : "";
$gene_id = isset($_POST['gene_id']) ? $_POST["gene_id"] : "";

if(is_numeric($gene_id) && ($type == "exon" || $type == "intron"))
{
    $sql = "SELECT * from gene_components WHERE INTRON=";
    $sql .= ($type == "exon") ? "0" : "1";
    $sql .= " AND GENE_ID=".$gene_id." ORDER BY START, END";

    $result = $conn->query($sql);
    $html = "";

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $html .= '<tr class="geneComponentLine" data-id="'.$row["ID"].'"id="componentLineId'.$row["ID"].'">
                    <td class="geneComponentActions text-center">
                        <button class="btn btn-danger geneComponentDeleteButton"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button>
                    </td>
                    <td class="hidden-xs text-center geneComponentName"><b>'.$row["NAME"].'</b></td>
                    <td class="genePosition text-center">'.$row["START"].'..'.$row["END"].'</td>
                    <td class="geneLength text-center">'.($row["END"] - $row["START"]+1).'</td>
                </tr>';
        }

        echo $html;
    }
}

?>
