let rules = {
  money: {
    required: !0,
    number: !0
  },
  person: {
    required: !0
  },
  bank: {
    required: !0
  },
  number: {
    required: !0,
    number: !0
  },
  fromAccount: {
    required: !0,
    number: !0
  }
}
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {
  initList();
  initRechargeTask();
}

function initList() {

  $('#remark').val('商家ID:' + cookie('mobile'));
  $('#acountList input:eq(0)').trigger('click');
  for(item in BANKS) {
    $('#bankName').append('<option >' + BANKS[item] +'</option>')
  }

  $("#rechargeForm").validate({
    rules: rules,
    submitHandler: (e) => { doSave() }
  })

  $('body').on('click', '#resetBtn', doResetForm);
}

function initRechargeTask(param = pageData) {
  // 最近6个月
  let from = moment().subtract('months',6).format('YYYY-MM-DD');
  let to = moment().format('YYYY-MM-DD');
  Object.assign(param, { transferType:1, fromDate: from, toDate: to});
  promiseTmpl('GET', TMPL_SELL_RECHARGE_LIST, [URL_SELL_ALL_RECHARGE, encodeQuery(param)].join('?'), null, cbRechargeTask)
}

function cbRechargeTask(r, e) {
  let ret = e;
  Object.assign(ret, pageData);
  // $(".portlet-body .table").remove();
  $(".recharge-table").prepend($.templates(r).render(ret, rdHelper));
}

function doResetForm() {
  document.getElementById("rechargeForm").reset();
  $('#file-input').fileinput('clear')
}

function doSave(e) {
  var pic = $('#upload').attr('picurl');
  if (isNull(pic)) {
    notifyInfo(MSG_UPLOAD_PIC)
    return;
  }

  data = {
    toAccount: $("input[name='toAccount']:checked").val(),
    transferMoney: $('#transferMoney').val(),
    bankName: $('#bankName').val(),
    transferPerson: $('#transferPerson').val(),
    fromAccount: $('#fromAccount').val(),
    remark: $('#remark').val(),
    picture: $('#upload').attr('picurl'),
    transferType:1
  }

  promise('POST',URL_SELL_TRANSFER,JSON.stringify(data), cbSave, null)
}

function cbSave(e) {
  msgbox('提示信息',MSG_RECHARGE_SUCCESS,MSG_GOON_RECHARGE,MSG_LOOKUP_RECHARGE,cbGoto)
}

function cbGoto(result) {
  if (!result) {
    parent.$("#mainframe").attr('src','listRecharge.html');
  }else{
    parent.$("#mainframe").attr('src','rechargeTask.html');
  }
}



