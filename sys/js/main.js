$(init)

function init() {


  var h = $(window).height();
  console.log(h);
  $("iframe").height(h-75);

  //显示用户名
  $("#u-name").html(cookie('name') || '<a href="updateSeller.html" target="mainframe" class="font-red">请完善信息</a>');

    // console.log(  cookie('memberValid') );
  if ( cookie('memberValid') ) {
    $(".u-vip").show();
    $("#u-vip-date").text( cookie('memberEndDate')  )
  }

  $('[data-button]').on('click', function(e) {
    var type = $('.page-sidebar-wrapper').data('type');
    var platform = $(this).data('platform');
    var pos = $(this).data('pos');
    var status = $(this).data('status');
    var tasktype = $(this).data('tasktype');
    
    (pos=='root')?pos='/':pos='';
    var pageName = pos + $(this).data('button') + '.html';

    if ($(this).data('button')=='auditVipRecharge') {
      var viptype=$(this).data('viptype');
      pageName+='?viptype='+viptype;
    }


    (status>=-1)?pageName += `?status=${status}`: null;
    tasktype?pageName += `?tasktype=${tasktype}`: null;
    platform ? pageName += `?platform=${platform}` : null;


    var type = $(this).data('type');
    type ? pageName += `?type=${type}` : null;


    $("#mainframe", parent.document.body).attr("src", pageName);
  });

  $('#exitBtn').on('click', (e)=> {
    $.cookie('cko', null);
    location.href = '/index.html'
  });
}



