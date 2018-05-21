$(init)

function init() {
  var h = $(document).height();
  $("iframe").height(h - 50);

  $('[data-button]').on('click', function(e) {
    var pageName = $(this).data('button') + '.html'
    $("#mainframe", parent.document.body).attr("src", pageName);
  });


  $('#exitBtn').on('click', function(e) {
      location.href = 'auditTask.html'
  });


}
