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
  withdrawMoney: {
    required: !0,
    number: !0
  }
}
let _balanceData;

$(init);

function init() {

  initBalanceInfo();
  $('body').on('change', '#account-type', doInitTip);
  $('body').on('input propertychange', '#withdraw-money', doCompute);

}


function initBalanceInfo() {
  promise('GET', URL_BUY_BALANCE, null, cbBalanceInfo, null);
}

function cbBalanceInfo(e) {
  _balanceData = e.data;
  $('#buyer-id').val(cookie('id'));
  $('#buyer-name').val(cookie('name'));
  $('#bankno').val(cookie2('bankNo', 'buyerBankList'));
  $('#balance').text(_balanceData.balance);

  $("#form-withdraw").validate({
    rules: rules,
    submitHandler: (e) => { doWithdraw() }
  })

}

function doCompute() {
  let rate = 0.01;
  // 提现总额
  let amount = parseInt($('#withdraw-money').val() || 0);
  amount *= (1-rate);
  $('#amount').text(amount.toFixed(2));
  // 手续费
  let type = parseInt($('#account-type').val());
  let poundage = amount >= 2000 ? 0 : amount * rate;
  type === 0 && poundage >= 5 ? poundage = 5 : null;
  $('#poundage').text(poundage.toFixed(2));
}

function doWithdraw() {
  let obj = {
    buyerId: parseInt($('#buyer-id').val()),
    buyerName: $('#buyer-name').val(),
    // buyerBankId:parseInt($('#bankno').val()),
    withdrawMoney: parseInt($('#withdraw-money').val()),
  }
  let type = parseInt($('#account-type').val());
  if (type === 0) {
    if (obj.withdrawMoney < 200) {
      return errorInfo('提现金额必须大于200！');
    }
  }
  if (type === 1) {
    if (obj.withdrawMoney < 100) {
      return errorInfo('提现金额必须大于100！');
    } else if (obj.withdrawMoney/100 === 0) {
      return errorInfo('佣金提现不是100的倍数！');
    }
  }

  if (obj.withdrawMoney > parseFloat($('#balance').text()) ) {
    return errorInfo('提现超出余额！');
  }
  let url = type === 0 ? URL_BUY_WITHDRAW : URL_BUY_FEE_WITHDRAW;
  promise('POST', url, JSON.stringify(obj), cdWithdraw, null);
}

function cdWithdraw(e) {
  notifyInfo(MSG_WITHDRAW_SUCCESS);
}

function doInitTip() {
  $('.withdraw-tip').toggleClass('hide');
  $('#balance').text(_balanceData.servicefee);
}
