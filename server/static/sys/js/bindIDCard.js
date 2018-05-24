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
    obj[`idcardpng${i}`] = $(`#id-card-ipt${i}`).attr('url') || cookie(`idcardpng${i}`);
  }
  promiseData('POST', URL_BUY_BIND_ID_CARD, JSON.stringify(obj), cbBind);
}
function cbBind(e) {
  if (e.code === 0) {
    initUserInfo();
    alertBox(MSG_BIND_SUCCESS, ()=>{ goto("newTask.html") })
  } else if (e.code==99) {
    notifyInfo(e.message);
  } else if (e.code==-1) {
    relogin();
  };
}

async function initBindInfo() {
  let status = parseInt(cookie('approveState'))
  // status = 2
  if ( status == 0 || status == null) {
    //未绑定
    $('.container-fluid').append(await renderTmpl(TMPL_BIND_IDCARD, {
      list:[1,1,1],
      status: 0,
    }));
  } else {
    // 待审核或审核通过 显示已经绑定表单
    $(".container-fluid").append(await renderTmpl(TMPL_BIND_IDCARD, {
      name: cookie('name'),
      idCard: cookie('idcard'),
      idImg: [ cookie('idcardpng1'),cookie('idcardpng2'),cookie('idcardpng3') ],
      status: status,
      list: [1,1,1],
      type: status !== 3 ? "disabled" : null,
      statusText: AUDIT_STATUS[status],
      imgPrefix: IMG_PREFIX
    }) );
  }
  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
}
