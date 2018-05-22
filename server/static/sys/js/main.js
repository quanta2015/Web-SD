$(init)

function init() {
  var h = $(document).height();
  $("iframe").height(h - 50);

  $('[data-button]').on('click', function(e) {
    var platform = $(this).data('platform')
    var pageName = $(this).data('button') + '.html';
    platform ? pageName += `?platform=${platform}` : null;

    $("#mainframe", parent.document.body).attr("src", pageName);
  });


  $('#exitBtn').on('click', function(e) {
    promiseData('GET',URL_EXIT,null, cbExit)
  });


}


function cbExit(e) {
  if (e.code == 0) {
    location.href = 'index.html'
  }
}