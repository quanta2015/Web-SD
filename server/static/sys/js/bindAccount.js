$(init);

function init() {
  initBindInfo();

  $('body').on('click', '#returnBtn', doReturn );
  $('body').on('click', '#saveBtn', doSave);
}

async function initBindInfo() {
  var status = parseInt($.cookie('bankcardState'))
  // var status = 1
  console.log(status)
  if ( status == 0 ) {
    //未绑定
    $('.container').append(await renderTmpl(TMPL_BIND_BKCARD, {
      name: null,
      bank: null,
      bank_no: null,
      acount_name: null,
      acount_subbank: null,
      acount_bankno: null,
      isband: 0
    }));
  }else if ( status == 1){
    //显示已经绑定表单
    let buyerBankInfo = JSON.parse($.cookie('buyerBankList'))[0];
    $(".container").append(await renderTmpl(TMPL_BIND_BKCARD, {
      name: $.cookie('name'),
      bank: buyerBankInfo.bank,
      bankNo: buyerBankInfo.bankNo,
      acountName: buyerBankInfo.acountName,
      acountSubbank: buyerBankInfo.acountSubbank,
      acountBankno: buyerBankInfo.acountBankno,
      isband: 1,
      type: "disabled"
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
    buyerId: $.cookie('id'),
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