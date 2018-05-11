$(init)

function init() {
  var h = $(document).height();
  $("iframe").height(h - 50);

  $('[data-button="bingShopBtn"]').on('click', function(e) {
      $("#mainframe", parent.document.body).attr("src", "bingShop.html");
  });
  $('[data-button="listShopBtn"]').on('click', function(e) {
      $("#mainframe", parent.document.body).attr("src", "listShop.html");
  });

}

