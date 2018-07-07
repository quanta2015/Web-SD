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
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {

  initBalanceInfo();

  $('body').on('change', '#account-type', doInitTip);
  $('body').on('click', '.page-tab', doChangeTab);
}


function initList() {
  promiseTmpl('GET', '/tmpl/buy/list_withdraw.tmpl', ['/buyer/buyer_withdraw_list', encodeQuery(pageData)].join('?'),null, cbList)
}

function cbList(r, ret) {
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/pageData.pageSize);
  $(".cnt-history .withdraw-list").remove();
  $(".cnt-history").prepend($.templates(r).render(ret, rdHelper));
  if ($('.table-pg').text() == '') initPage(totalPages);
}

function initPage(totalPages) {
  $('.cnt-history .table-pg').twbsPagination({
      totalPages: totalPages || 1,
      onPageClick: function(event, page) {
        pageData.pageIndex = page - 1;
        // initList();
      }
    })
}


function initBalanceInfo() {
  promise('GET', URL_BUY_BALANCE, null, cbBalanceInfo, null);
}

function cbBalanceInfo(e) {
  e.mission = e.servicefee + e.spread - e.spreadFrozen;
  _balanceData = e;
  $('#buyer-mobile').val(cookie('mobile'));
  $('#buyer-name').val(cookie('name'));
  $('#bankno').val(cookie2('bankNo', 'buyerBankList'));
  $('#balance').text(`本金账户: 可提现金额${_balanceData.balance}元`);
  // $("#u-money", window.parent.document).text(e.balance+e.servicefee);
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


  if (type === 'balance') {
    info = ` 佣金账户: 可提现金额${_balanceData.mission}元 (任务佣金${_balanceData.servicefee}元，推广赚金${_balanceData.spread}元，平台奖励金不可提现)`
  }else{
    info = ` 本金账户: 可提现金额${_balanceData.balance}元`
  }
  $('#balance').text(info);
}



function doChangeTab(e) {
  $('.page-tab span').removeClass('active');
  $(e.target).addClass('active');


  type = $(e.target).data('type');

  $('.cnt-tab').addClass('hide')
  $(`.cnt-${type}`).removeClass('hide')

  if (type==='history') {
    initList()
  }
}