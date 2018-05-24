$(init);

function init() {
  initBindInfo();

  $('body').on('click', '#returnBtn', doReturn );
  $('body').on('click', '#saveBtn', doSave);
}

async function initBindInfo() {
  var status = parseInt(cookie('bankcardState'))
  // var status = 0
  console.log(status)
  if ( status == 0 || status == null) {
    //未绑定
    $('.container').append(await renderTmpl(TMPL_BIND_BKCARD, {
      name: null,
      bank: null,
      bank_no: null,
      acount_name: null,
      acount_subbank: null,
      acount_bankno: null,
      status: 0,
    }));
  } else {
    //显示已经绑定表单
    $(".container").append(await renderTmpl(TMPL_BIND_BKCARD, {
      name: cookie('name'),
      bank: cookie2('bank', 'buyerBankList'),
      bankNo: cookie2('bankNo', 'buyerBankList'),
      acountName: cookie2('acountName', 'buyerBankList'),
      acountSubbank: cookie2('acountSubbank', 'buyerBankList'),
      acountBankno: cookie2('acountBankno', 'buyerBankList'),
      type: status !== 3 ? "disabled" : null,
      status: status,
      statusText: AUDIT_STATUS[status],
    }) );
  }
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
  if (obj.reBankNo !== obj.bankNo) return;
  delete obj.reBankNo;
  promiseData('POST', URL_BUY_BIND_BANK, JSON.stringify(obj), cbBind);
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