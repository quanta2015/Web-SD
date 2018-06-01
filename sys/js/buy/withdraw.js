$(init);

function init() {

  initWithdraw();
  $('body').on('click', '#saveBtn', doSave);
  $('body').on('input propertychange', '.withdraw', doCompute);

}

function initWithdraw() {
  // promiseData('GET', URL_SELL_BALANCE, null, (e) => {
    renderTmpl(TMPL_BUY_WITHDRAW, {
      id: cookie('id'),
      name: cookie('name'),
      bankNo: cookie2('bankNo', 'buyerBankList'),
      capWithdraw: null,
      comWithdraw: null,
      capBalance: 0,
      comBalance: 0,
      amount: '0.00',
      poundage: '0.00'
    }).then(html => $('.container').append(html));
  // })
}

function doCompute() {
  // 提现总额
  let amount = parseInt($('#cap-withdraw').val() || 0) + parseInt($('#com-withdraw').val() ||0);
  $('#amount').text(amount.toFixed(2));
  // TODO:手续费
  let poundage = amount*0.01;
  $('#poundage').text(poundage.toFixed(2));
}

function doSave() {
  let obj = {
    buyerId: '',
    buyerName: '',
    toAccount: '',
    withdrawMoney: '',
  }
}