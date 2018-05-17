$(init)

function init() {
  var h = $(document).height();
  $("iframe").height(h - 50);

  $('[data-button="bingShopBtn"]').on('click', function(e) {
      $("#mainframe", parent.document.body).attr("src", "bindShop.html");
  });
 
  $('#exitBtn').on('click', function(e) {
      location.href = 'index.html'
  });


}



