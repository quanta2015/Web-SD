let rules = {
  mobile: {
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
let messages = {
  name: {
    required: '请先绑定身份证'
  },
  mobile: {
    required: '请先完善信息'
  },
  bankNo: {
    required: '请先绑定银行卡'
  },
}
let _balanceData;

$(init);

function init() {

  initBalanceInfo();
  $('body').on('change', '#account-type', doInitTip);

  // $('body').on('input propertychange', '#withdraw-money', doCompute);
  // 
  
  

}


function initBalanceInfo() {
  promise('GET', URL_BUY_BALANCE, null, cbBalanceInfo, null);
}

function cbBalanceInfo(e) {
  _balanceData = e;
  $('#buyer-mobile').val(cookie('mobile'));
  $('#buyer-name').val(cookie('name'));
  $('#bankno').val(cookie2('bankNo', 'buyerBankList'));
  $('#balance').text(_balanceData.balance);
  $("#u-money", window.parent.document).text(e.balance+e.servicefee);
  $("#form-withdraw").validate({
    rules: rules,
    messages: messages,
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
    // mobile: parseInt($('#buyer-id').val()),
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
    if (obj.withdrawMoney <200){
      return errorInfo('佣金提现必须大于等于200！');
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
  // 获取余额
  document.getElementById('form-withdraw').reset();
  initBalanceInfo();
  notifyInfo(MSG_WITHDRAW_SUCCESS);
}

function doInitTip() {
  $('.withdraw-tip').toggleClass('hide');
  let type = $('.withdraw-tip.hide').data('type');
  $('#balance').text(type === 'balance' ? _balanceData.servicefee: _balanceData.balance);
}
