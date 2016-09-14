<?php

include("connexion.php");

$numAccession = isset($_POST['numAccession']) ? $_POST["numAccession"] : "";

if(strcmp($numAccession, "") != 0) {
    $curlSession = curl_init();
    curl_setopt($curlSession, CURLOPT_URL, "http://www.kegg.jp/dbget-bin/www_bget?-f+-n+a+ela:".$numAccession);
    curl_setopt($curlSession, CURLOPT_BINARYTRANSFER, true);
    curl_setopt($curlSession, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($curlSession);

    curl_close($curlSession);

    if(strpos($result, 'No such data') === false)
    {
        preg_match('/-->(>[^µ]+)<\/pre>/', $result, $match);
        $result = preg_replace('/\n/', '<br/>', $match[1]);
        echo $result;
    } else {
        echo "error";
    }
} else {
    echo "error";
}

?>
