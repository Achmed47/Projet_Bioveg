<?php

include("connexion.php");

$geneId   = isset($_POST['geneId']) ? $_POST["geneId"] : "";
$sequence = isset($_POST['sequence']) ? $_POST["sequence"] : "";
$type     = isset($_POST['typeBlast']) ? $_POST["typeBlast"] : "";
$database = isset($_POST['database']) ? $_POST["database"] : "";
$db       = isset($_POST['db']) ? $_POST["db"] : "";

if((strcmp($geneId, "") != 0 || strcmp($sequence, "") != 0) && strcmp($type, "") != 0 && strcmp($database, "") != 0 && strcmp($db, "") != 0) {
    $curlSession = curl_init();

    if(strcmp($geneId, "") != 0) {
        $sql = "SELECT SEQ FROM genes WHERE ID=$geneId";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $data = (array_key_exists('SEQ', $row)) ? $row["SEQ"] : "";
    } else {
        preg_match('/([ACGT\s]+)$/', $sequence, $match);
        $data = (count($match) > 1 && strcmp($match[1], "") != 0) ? $match[1] : $sequence;
    }

    $url = "http://blast.ncbi.nlm.nih.gov/Blast.cgi?QUERY=".urlencode($data)."&DATABASE=".$db."&EQ_MENU=".urlencode($database)."&EQ_OP=AND&PROGRAM=".urlencode($type)."&FILTER=L&EXPECT=0.01&FORMAT_TYPE=HTML&NCBI_GI=on&HITLIST_SIZE=10&CMD=Put";

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
