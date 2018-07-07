$(init)

function init() {


  var h = $(document).height();
  console.log(h);
  $("iframe").height(h-75);

  //显示用户名
  userType = cookie('userType');
  if (parseInt(userType) === 0) {
    url = "newTask.html";
    setInterval(updateBuyMoney, REFRESH_TIME )
  }else if(parseInt(userType) === 1){
    url = "updateSeller.html";
    setInterval(updateSellMoney, REFRESH_TIME )
  }

  $("#u-name").html(cookie('name'));

  //显示VIP信息
  if ( cookie('memberValid') ) {
    $(".u-vip").show();
    $("#u-vip-date").text( cookie('memberEndDate')  )
  }

  //菜单参数封装
  $('[data-button]').on('click', function(e) {
    
    ( $(this).data('pos')=='root' )?pos='/':pos='';
    var pageName = pos + $(this).data('button') + '.html';

    var o = {
      viptype:  $(this).data('viptype'),
      platform: $(this).data('platform'),
      status:   $(this).data('status'),
      tasktype: $(this).data('tasktype'),
      type:     $(this).data('type'),
	  appealtype:$(this).data('appealtype')
    }
    url = [pageName, encodeQuery(o)].join('?')
    $("#mainframe", parent.document.body).attr("src", url);
  });

  //退出清空cookie
  $('#exitBtn').on('click', (e)=> {
    $.cookie('cko', null);
    location.href = '/index.html'
  });
  
 // promiseTmpl('GET', '/tmpl/admin/mainmenu.tmpl', '/permission/user/get_my_menus',null, cbList)
}

function cbList(r, e) {
	  let ret = e;
	  alert(JSON.stringify(ret));
	  _listtask = ret.data;
	  ret.imgPrefix = IMG_PREFIX;
	  $(".page-sidebar-menu .mainmenu").remove();
	  $(".page-sidebar-menu").prepend($.templates(r).render(ret, rdHelper));
}





