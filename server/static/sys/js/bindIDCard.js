$(init);

function init() {
  initBindInfo();

  $('body').on('click', '#returnBtn', doReturn);
  $('body').on('click', '#saveBtn', doSave);
}

function doReturn() {
  goto('newTask.html')
}


function doSave(data) {
  let obj = {
    name: $('#name').val(),
    idcard: $('#id-card').val(),
  };
  for (let i = 1; i <= 3; i++) {
    obj[`idcardpng${i}`] = $(`#id-card-ipt${i}`).attr('url');
  }
  promiseData('POST', URL_BUY_BIND_ID_CARD, JSON.stringify(obj), cbBind);
}
function cbBind(e) {
  if (e.code === 0) {
    alertBox(MSG_BIND_SUCCESS, ()=>{ goto("newTask.html") })
  } else if (e.code==99) {
    notifyInfo(e.message);
  } else if (e.code==-1) {
    relogin();
  };
}


async function initBindInfo() {
  var status = parseInt($.cookie('approveState'))
  // var status = 1
  
  if ( status == 0 ) {
    //未绑定
    $('.container').append(await renderTmpl(TMPL_BIND_IDCARD, { list:[1,1,1] }));
  }else if ( status == 1){
    //显示已经绑定表单
    $(".container").append(await renderTmpl(TMPL_BIND_IDCARD, {
      name: $.cookie('name'),
      idCard: $.cookie('idcard'),
      idImg1: $.cookie('idcardpng1'),
      idImg2: $.cookie('idcardpng2'),
      idImg3: $.cookie('idcardpng3'),
      isbind: 1,
      type: "disabled"
    }) );
  }
}
