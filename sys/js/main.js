$(init)

function init() {


  var h = $(document).height();
  $("iframe").height(h - 50);

  //显示用户名
  $("#username").text(cookie('name'));

  //显示金额
  promiseData('GET','/shoper/shoper_balance',null, (e)=>{
    $("#balance").text(e.data)
  } )

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



