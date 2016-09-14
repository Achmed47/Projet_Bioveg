<?php

include("connexion.php");

$geneId = isset($_GET['geneId']) ? $_GET["geneId"] : "";
$sequence     = isset($_GET['sequence']) ? $_GET["sequence"] : "";
$type         = isset($_GET['typeBlast']) ? $_GET["typeBlast"] : "";
$database     = isset($_GET['database']) ? $_GET["database"] : "";

if((strcmp($geneId, "") != 0 || strcmp($sequence, "") != 0) && strcmp($type, "") != 0 && strcmp($database, "") != 0) {
    $curlSession = curl_init();

    // TODO
    // - Implement Blastx => check num_accesion to access prot seq in KEGG file
    //   If not existing, return error
    // - Make specific error depending on the issue
    // - Implement tblastn && blastp based on blastn and blastx

    if(strcmp($geneId, "") != 0) {
        $sql = "SELECT SEQ FROM genes WHERE ID=$geneId";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $data = (array_key_exists('SEQ', $row)) ? $row["SEQ"] : "";
    } else {
        preg_match('/([ACGT\s]+)$/', $sequence, $match);
        $data = (count($match) > 1 && strcmp($match[1], "") != 0) ? $match[1] : $sequence;
    }

    $url = "http://blast.ncbi.nlm.nih.gov/Blast.cgi?QUERY=".urlencode($data)."&DATABASE=nr+nt&EQ_MENU=".urlencode($database)."&EQ_OP=AND&PROGRAM=".urlencode($type)."&FILTER=L&EXPECT=0.01&FORMAT_TYPE=HTML&NCBI_GI=on&HITLIST_SIZE=10&CMD=Put";

    curl_setopt($curlSession, CURLOPT_URL, $url);

    curl_setopt($curlSession, CURLOPT_BINARYTRANSFER, true);
    curl_setopt($curlSession, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($curlSession);

    curl_close($curlSession);

    if(strpos($result, 'No such data') === false)
    {
        preg_match('/<input name="RID" size="[0-9]+" type="text" value="(.*)" id=/', $result, $match);
        echo (count($match) > 1 && strcmp($match[1], "") != 0) ? $match[1] : "error";
    } else {
        echo "error";
    }
} else {
    echo "error";
}

?>
