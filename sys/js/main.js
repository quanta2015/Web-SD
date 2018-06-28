$(init)

function init() {


  var h = $(document).height();
  console.log(h);
  $("iframe").height(h-75);

  //显示用户名
  userType = cookie('userType');
  if (parseInt(userType) === 0) {
    url = "newTask.html";
  }else{
    url = "updateSeller.html";
  }
  $("#u-name").html(cookie('name') || `<a href="${url}" target="mainframe" class="font-red">请完善信息</a>`);


  if ( cookie('memberValid') ) {
    $(".u-vip").show();
    $("#u-vip-date").text( cookie('memberEndDate')  )
  }

  $('[data-button]').on('click', function(e) {
    
    ( $(this).data('pos')=='root' )?pos='/':pos='';
    var pageName = pos + $(this).data('button') + '.html';

    var o = {
      viptype:  $(this).data('viptype'),
      platform: $(this).data('platform'),
      status:   $(this).data('status'),
      tasktype: $(this).data('tasktype'),
      type:     $(this).data('type')
    }
    url = [pageName, encodeQuery(o)].join('?')
    $("#mainframe", parent.document.body).attr("src", url);

    // var viptype=$(this).data('viptype');  
    // var platform = $(this).data('platform');
    // var status = $(this).data('status');
    // var tasktype = $(this).data('tasktype');
    // var type = $(this).data('type');
    // (viptype>-1)?pageName+=`?viptype=${viptype}`: null;
    // (status>=-1)?pageName += `?status=${status}`: null;
    // tasktype?pageName += `?tasktype=${tasktype}`: null;
    // platform ? pageName += `?platform=${platform}` : null;
    // type ? pageName += `?type=${type}` : null;
  });

  $('#exitBtn').on('click', (e)=> {
    $.cookie('cko', null);
    location.href = '/index.html'
  });
}



