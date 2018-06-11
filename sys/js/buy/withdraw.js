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

function initBalanceInfo() {
  promiseData('GET', URL_BUY_BALANCE, null, cbBalanceInfo);
}

function cbBalanceInfo(e) {
  if (e.code === 0) {
    _balanceData = e.data;
    $('#buyer-id').val(cookie('id'));
    $('#buyer-name').val(cookie('name'));
    $('#bankno').val(cookie2('bankNo', 'buyerBankList'));
    $('#balance').text(_balanceData.balance);
  } else if (e.code == 99) {
    errorInfo(e.message);
  } else if (e.code==-1) {
    relogin();
  };

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
    buyerBankId:parseInt($('#bankno').val()),
    withdrawMoney: parseInt($('#withdraw-money').text()),
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
  promiseData('POST', url, JSON.stringify(obj), cdWithdraw);
}

function cdWithdraw(e) {
  if (e.code === 0) {
    notifyInfo(MSG_WITHDRAW_SUCCESS);
  } else if (e.code == 99) {
    errorInfo(e.message);
  } else if (e.code==-1) {
    relogin();
  };
}

function doInitTip() {
  $('.withdraw-tip').toggleClass('hide');
  $('#balance').text(_balanceData.servicefee);
}
