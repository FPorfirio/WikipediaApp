$(document).ready(function() {
  
  var $articles = $("#articles");
  var $art_header = $("#articles_header");
  var $art_list = $("#art_list");
  var $search_btn = $("#search_btn")
  var $random_btn = $("#random");
  
  function loadData() {
    var $search_value = $("#search_bar").val();
    $art_header.html("Articles about: " + $search_value);
    $art_list.html("");
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + $search_value + "&format=json&callback&namespace=0" 
    $.ajax({
      url : url,
      dataType : "jsonp",
      success : wiki_handler
    });
    return false;
  };
  
  var wiki_handler = function(data) {
    console.log(data);
    var articles = data[1];
    var art_desc = data[2]
    for(var i = 0; i < articles.length; i++) {
      var url = "https://en.wikipedia.org/wiki/" + articles[i];
      $art_list.append('<li id="wikiLinks">' + '<a href=' +url+ '>' +articles[i]+ '</a>' + '<p>' +art_desc[i]+ '</p></li>') 
    }   
  }
  
  $("#form_container").submit(loadData)
})