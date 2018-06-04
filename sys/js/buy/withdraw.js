let rules = {
  buyerId: {
    required: !0,
    number: !0
  },
  name: {
    required: !0
  },
  bankNo: {
    required: !0,
    number: !0
  },
  poundageAccount: {
    required: !0,
  },
  capWithdraw: {
    required: !0,
    number: !0
  },
  comWithdraw: {
    required: !0,
    number: !0
  },
}

$(init);

function init() {

  initWithdraw();
  // $('body').on('click', '#saveBtn', doSave);
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

  $("#form-withdraw").validate({
    rules: rules,
    submitHandler: (e) => { doWithdraw() }
  })
}

function doCompute() {
  // 提现总额
  let amount = parseInt($('#cap-withdraw').val() || 0) + parseInt($('#com-withdraw').val() ||0);
  $('#amount').text(amount.toFixed(2));
  // TODO:手续费
  let poundage = amount * WITHDRAW_FEE;
  $('#poundage').text(poundage.toFixed(2));
}

function doWithdraw() {
  let obj = {
    buyerId: $('#buyer-id').val(),
    buyerName: $('#buyer-name').val(),
    buyerBankId: $('#bankno').val(),
    withdrawMoney: $('#buyer-id').val(),
    serviceFee: $('#buyer-id').val(),
    withdrawMoney: $('#buyer-id').val(),
  }
  promiseData('POST', URL_BUY_WITHDRAW, JSON.stringify(obj), cdWithdraw)
}

function cdWithdraw() {
  
}