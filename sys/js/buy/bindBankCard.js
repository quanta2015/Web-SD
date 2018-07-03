let rules = {
  name: {
    required: !0,
  },
  bank: {
    required: !0
  },
  acountSubbank: {
    required: !0
  },
  acountSubbank: {
    required: !0
  },
  bankNo: {
    required: !0,
    number: !0
  },
  rebankno: {
    required: !0,
    number: !0
  }
}
let messages = {
  name: {
    required: '请先绑定身份证'
  }
}
let status;

$(init);

function init() {
  initBindInfo();

  $('body').on('click', '#returnBtn', doReturn );
}

function initBindInfo() {
  promise('GET', URL_BUY_INFO, null, cbInitBindInfo, null);
}

function cbInitBindInfo(e) {
  status = e.bankcardState;
  let func;
  // status = -1
  if ( status == -1 || status == null) {
    //未绑定
    func = renderTmpl(TMPL_BUY_BIND_BKCARD, {
      name: cookie('name'),
      bank: null,
      bank_no: null,
      acount_name: null,
      acount_subbank: null,
      acount_bankno: null,
      status: -1,
      banks: BANKS
    })
  } else {
    //显示已经绑定表单
    func = renderTmpl(TMPL_BUY_BIND_BKCARD, {
      name: cookie('name'),
      bank: cookie2('bank', 'buyerBankList'),
      bankNo: cookie2('bankNo', 'buyerBankList'),
      acountName: cookie2('acountName', 'buyerBankList'),
      acountSubbank: cookie2('acountSubbank', 'buyerBankList'),
      acountBankno: cookie2('acountBankno', 'buyerBankList'),
      type: status !== 2 ? "disabled" : null,
      status: status,
      statusText: AUDIT_STATUS[status],
      banks: BANKS
    })
  }
  func.then(h => {
    $('.container').append(h);
    $("#form-bind").validate({
      rules: rules,
      messages: messages,
      submitHandler: (e) => { doSave() }
    })
  })
}

function doReturn() {
  goto('newTask.html')
}

function doSave(data) {
  let obj = {
    acountBankno: $('#acount-bankno').val(),
    acountName: $('#acount-name').val(),
    acountSubbank: $('#acount-subbank').val(),
    bank: $('#bank').val(),
    bankNo: $('#bankno').val(),
    buyerId: cookie('id'),
    reBankNo: $('#rebankno').val(),
  };
  if (obj.reBankNo !== obj.bankNo) return errorInfo('两次输入的账号不相同');
  delete obj.reBankNo;
  if (status === 2) obj.id = cookie2('id', 'buyerBankList');
  promise('POST', URL_BUY_BIND_BANK, JSON.stringify(obj), cbBind, null);
}

function cbBind(e) {
  initUserInfo();
  alertBox('绑定成功!', ()=>{ goto("newTask.html") })   
}