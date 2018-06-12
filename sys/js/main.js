$(init)

function init() {


  var h = $(document).height();
  $("iframe").height(h - 50);

  //显示用户名
  $("#u-name").text(cookie('name') || '请完善信息');


  $('[data-button]').on('click', function(e) {
    var type = $('.page-sidebar-wrapper').data('type');
    var platform = $(this).data('platform');
    var pos = $(this).data('pos');
    (pos=='root')?pos='/':pos='';
    var pageName = pos + $(this).data('button') + '.html';

    if ($(this).data('button')=='auditVipRecharge') {
      var viptype=$(this).data('viptype');
      pageName+='?viptype='+viptype;
    }
    
    platform ? pageName += `?platform=${platform}` : null;

    $("#mainframe", parent.document.body).attr("src", pageName);
  });

  $('#exitBtn').on('click', (e)=> {
    $.cookie('cko', null);
    location.href = '/index.html'
  });
}



