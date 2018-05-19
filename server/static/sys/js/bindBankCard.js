$(init);

function init() {

  $('body').on('click', '#resetBtn', doResetForm);
  $('body').on('click', '#saveBtn', doSave);
}

function doResetForm() {
  document.getElementById("form-bind").reset()
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
