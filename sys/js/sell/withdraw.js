let rules = {
  name: {
    required: !0
  },
  bankno: {
    required: !0,
  },
  withdrawMoney: {
    required: !0,
    number: !0
  }
}
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {

  initTime();
  initList();
  initBalanceInfo();
  $('body').on('input propertychange', '#withdraw-money', doCompute);
  $('body').on('click', '#btn-search', doSearch);
}

function initTime() {
  let from =  moment().subtract('days',7).format('YYYY-MM-DD');
  let to = moment().format('YYYY-MM-DD');
  $("#sr-time-from").datetimepicker({ value: from, format:'Y-m-d', timepicker:false});
  $("#sr-time-to").datetimepicker({value: to, format:'Y-m-d', timepicker:false});
}

function initList() {
  let param = {
    status: $('#sr-status'),
    toAccount: $('#sr-bankno'),
    fromDate: $("#sr-time-from").val(),
    toDate: $("#sr-time-to").val(),
  };
  Object.assign(param, {transferType: 0}, pageData);
  TmplData(TMPL_SELL_WITHDRAW_LIST, [URL_SELL_ALL_RECHARGE, encodeQuery(param)].join('?'), null, cbList)
}

function cbList(r, e) {
  let ret = e[0];
  if (ret.code == 0) {
    Object.assign(ret, pageData, {name: cookie('name')});
    totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $('#tab-list .table-data').prepend($.templates(r[0]).render(ret, rdHelper));
    if ($('.table-pg').text() == '') initPage(totalPages);
  } else if (e[0].code == -1) {
    relogin();
  } else if (e.code == 99){
    notifyInfo(e.message);
  }

}

function initPage(totalPages) {
  $('#tab-list .table-pg').twbsPagination({
    totalPages: totalPages || 1,
    onPageClick: function(event, page) {
      pageData.pageIndex = page - 1;
      initList(pageData);
    }
  })
}

function initBalanceInfo() {
  promiseData('GET', URL_SELL_BALANCE, null, cbBalanceInfo);
}

function cbBalanceInfo(e) {
  if (e.code === 0) {
    $('#shoper-name').val(cookie('name'));
    if (!cookie('name')) $('#form-tip').removeClass('hide');
    $('#bankno').val(cookie('bankcard'));
    $('#balance').text(e.data);
    $('#u-money', parent.document).text(e.data);
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
  let rate = 0.005;
  // 提现总额
  let amount = parseInt($('#withdraw-money').val() || 0);
  amount *= (1-rate);
  $('#amount').text(amount.toFixed(2));
  // 手续费
  let poundage = amount * rate;
  $('#poundage').text(poundage.toFixed(2));
}

function doWithdraw() {
  let obj = {
    shoperId: cookie('id'),
    toAccount:parseInt($('#bankno').val()),
    transferMoney: parseFloat($('#withdraw-money').val()),
    transferType: 0,
  }

  let sum = obj.transferMoney;
  if (sum > parseFloat($('#balance').text()) ) {
    return errorInfo('提现超出余额！');
  }
  promiseData('POST', URL_SELL_TRANSFER, JSON.stringify(obj), cdWithdraw);
}

function cdWithdraw(e) {
  if (e.code === 0) {
    // 获取余额
    document.getElementById('form-withdraw').reset();
    initBalanceInfo();
    notifyInfo(MSG_WITHDRAW_SUCCESS);
  } else if (e.code == 99) {
    errorInfo(e.message);
  } else if (e.code==-1) {
    relogin();
  };
}

function doSearch() {
  $('.portlet-body .table-pg').remove();
  $('.portlet-body').append('<div class="table-pg"></div>');
  initList();
}