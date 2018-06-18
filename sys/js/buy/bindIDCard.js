let rules = {
  name: {
    required: !0,
  },
  idCard: {
    required: !0
  },
}
let status;
let idCardImgInfo = ['身份证正面', '身份证背面'];

$(init);

function init() {
  
  initStatus();
  $('body').on('click', '#returnBtn', doReturn);

}

function doReturn() {
  goto('newTask.html')
}

function initStatus() {
  promise('GET', URL_BUY_INFO, null, cbInitStatus, null);
}

function doSave(data) {
  
  let obj = {
    name: $('#name').val(),
    idcard: $('#id-card').val(),
  };
  for (let i = 1; i <= 2; i++) {
    let key = `idcardpng${i}`;
    obj[key] = $(`#id-card-ipt${i}`).attr('picurl');
    (!obj[key] && status === 2) ? obj[key] = cookie(key) : null;
    if (!obj[key]) {
      return errorInfo(`缺少${idCardImgInfo[i-1]}`);
    }
  }
  promise('POST', URL_BUY_BIND_ID_CARD, JSON.stringify(obj), cbBind, null);
}
function cbBind(e) {
  initUserInfo();
  alertBox(MSG_BIND_SUCCESS, ()=>{ goto("newTask.html") })
}

function cbInitStatus(e) {
  status = e.approveState;
  let func;
  // status = -1
  if ( status == -1 || status == null) {
    //未绑定
    func = renderTmpl(TMPL_BUY_BIND_IDCARD, {
      list:[1,1],
      imgInfo: idCardImgInfo,
      status: -1,
    })
  } else {
    // 待审核或审核通过 显示已经绑定表单
    func = renderTmpl(TMPL_BUY_BIND_IDCARD, {
      name: cookie('name'),
      idCard: cookie('idcard'),
      idImg: [ cookie('idcardpng1'),cookie('idcardpng2') ],
      status: status,
      list: [1,1],
      imgInfo: idCardImgInfo,
      type: status !== 2 ? "disabled" : null,
      statusText: AUDIT_STATUS[status],
      imgPrefix: IMG_PREFIX
    })
  }
  func.then(h => {
    $(".container").append(h);
    $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
    $("#form-bind").validate({
      rules: rules,
      submitHandler: (e) => { doSave() }
    })
  })
}
