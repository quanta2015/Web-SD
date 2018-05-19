$(init)

function init() {
  var h = $(document).height();
  $("iframe").height(h - 50);

  $('[data-button="auditTaskBtn"]').on('click', function(e) {
      $("#mainframe", parent.document.body).attr("src", "auditTask.html");
  });


  $('#exitBtn').on('click', function(e) {
      location.href = 'auditTask.html'
  });


}
