$(init)

function init() {
  if (cookie('mobile') == null) {
    location.href = 'index.html'
  }

  var h = $(document).height();
  $("iframe").height(h - 50);

  $('[data-button]').on('click', function(e) {
    var type = $('.page-sidebar-wrapper').data('type');
    var platform = $(this).data('platform');
    var pageName = $(this).data('button') + '.html';
    platform ? pageName += `?platform=${platform}` : null;

    $("#mainframe", parent.document.body).attr("src", pageName);
  });

  $('#exitBtn').on('click', function(e) {
    $.cookie('cko', null);
    location.href = '/index.html'
  });
}
