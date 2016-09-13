<?php
include("connexion.php");

$gene_id = isset($_POST['id']) ? $_POST["id"] : "";

if(is_numeric($gene_id))
{
    $sql = "SELECT SEQ FROM genes WHERE ID=$gene_id";
    $res = $conn->query($sql);
    $row = $res->fetch_assoc();

    $dna_seq = $row["SEQ"];

    if(strcmp($dna_seq, "") != 0)
    {
        $dna_seq = strtoupper($dna_seq);
        $dna_seq = preg_replace('/\s+/', '', $dna_seq);
        $prot_seq = "";

        $map = ["TTT" => "F", "TTC"=>"F", "TTA"=>"L", "TTG"=>"L",
                "TCT"=>"S", "TCC"=>"s", "TCA"=>"S", "TCG"=>"S",
                "TAT"=>"Y", "TAC"=>"Y", "TAA"=>"_", "TAG"=>"_",
                "TGT"=>"C", "TGC"=>"C", "TGA"=>"_", "TGG"=>"W",
                "CTT"=>"L", "CTC"=>"L", "CTA"=>"L", "CTG"=>"L",
                "CCT"=>"P", "CCC"=>"P", "CCA"=>"P", "CCG"=>"P",
                "CAT"=>"H", "CAC"=>"H", "CAA"=>"Q", "CAG"=>"Q",
                "CGT"=>"R", "CGC"=>"R", "CGA"=>"R", "CGG"=>"R",
                "ATT"=>"I", "ATC"=>"I", "ATA"=>"I", "ATG"=>"M",
                "ACT"=>"T", "ACC"=>"T", "ACA"=>"T", "ACG"=>"T",
                "AAT"=>"N", "AAC"=>"N", "AAA"=>"K", "AAG"=>"K",
                "AGT"=>"S", "AGC"=>"S", "AGA"=>"R", "AGG"=>"R",
                "GTT"=>"V", "GTC"=>"V", "GTA"=>"V", "GTG"=>"V",
                "GCT"=>"A", "GCC"=>"A", "GCA"=>"A", "GCG"=>"A",
                "GAT"=>"D", "GAC"=>"D", "GAA"=>"E", "GAG"=>"E",
                "GGT"=>"G", "GGC"=>"G", "GGA"=>"G", "GGG"=>"G"];

        for($currentIndex=0; $currentIndex<=strlen($dna_seq)-3; $currentIndex+=3) {
            $prot_seq .= $map[substr($dna_seq, $currentIndex, 3)];
        }

        echo chunk_split($prot_seq, 60, '<br/>');
    }
}

?>
