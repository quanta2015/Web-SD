$(init)

function init() {
  var h = $(document).height();
  $("iframe").height(h - 50);

  $('[data-button="bingShopBtn"]').on('click', function(e) {
      $("#mainframe", parent.document.body).attr("src", "bindShop.html");
  });
  $('[data-button="listShopBtn"]').on('click', function(e) {
      $("#mainframe", parent.document.body).attr("src", "listShop.html");
  });

  $('[data-button="createTaskBtn"]').on('click', function(e) {
      $("#mainframe", parent.document.body).attr("src", "createTask.html");
  });

  $('[data-button="listTaskBtn"]').on('click', function(e) {
      $("#mainframe", parent.document.body).attr("src", "listTask.html");
  });

  $('#exitBtn').on('click', function(e) {
      location.href = 'index.html'
  });


}
