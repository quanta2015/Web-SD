$(init)

function init() {


  var h = $(document).height();
  $("iframe").height(h - 50);

  //显示用户名
  $("#username").text(cookie('name'));

  // //显示金额
  // promiseData('GET',URL_SELL_BALANCE,null, (e)=>{
  //   $("#balance").text(e.data)
  // } )

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

  $('#exitBtn').on('click', function(e) {
    $.cookie('cko', null);
    location.href = '/index.html'
  });
}



