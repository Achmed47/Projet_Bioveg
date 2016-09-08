$( document ).ready(function() {
  $("#btn_number_accession").click(function(){
      $("#list_gene").hide();
      $("#num_access").show();

  });

  $("#btn_liste_gene").click(function(){
      $("#num_access").hide();
      $("#list_gene").show();
  });
});
