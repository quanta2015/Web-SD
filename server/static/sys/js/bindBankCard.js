$(init);

function init() {
  initBindInfo();

  $('body').on('click', '#returnBtn', doReturn );
  $('body').on('click', '#saveBtn', doSave);
}

async function initBindInfo() {
  var status = parseInt($.cookie('approveState'))
  // var status = 1
  
  if ( status == 0 ) {
    //未绑定
    $('.container').append(await renderTmpl(TMPL_BIND_BKCARD, {
      name: null,
      bank: null,
      bank_no: null,
      acount_name: null,
      acount_subbank: null,
      acount_bankno: null,
      isband:0
    }));
  }else if ( status == 1){
    //显示已经绑定表单
    $(".container").append(await renderTmpl(TMPL_BIND_BKCARD, {
      name: $.cookie('name'),
      bank: $.cookie('bank'),
      bank_no: $.cookie('bank_no'),
      acount_name: $.cookie('acount_name'),
      acount_subbank: $.cookie('acount_subbank'),
      acount_bankno: $.cookie('acount_bankno'),
      isband:1
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
  console.log(obj)
  promiseData('POST', URL_BUY_BIND_BANK, JSON.stringify(obj), cbBind);
}

function cbBind(e) {
  if (e.code === 0) {
    notifyInfo(MSG_BIND_SUCCESS);
  } else if (e.code==99) {
    notifyInfo(e.message);
  } else if (e.code==-1) {
    relogin();
  };
}
