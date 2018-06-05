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
  Object.assign(param, { transferType:1});
  TmplData(TMPL_SELL_RECHARGE_LIST, [URL_SELL_ALL_RECHARGE, encodeQuery(param)].join('?'), null, cbRechargeTask)
}

function cbRechargeTask(r, e) {
  console.log('111')
  let data = e[0];
  if (data.code == 0) {
    Object.assign(data, pageData);
    // $(".portlet-body .table").remove();
    $(".recharge-table").prepend($.templates(r[0]).render(data, rdHelper));
  } else if ([-1, 99].includes(e.code)) {
    relogin();
  }
}

function doResetForm() {
  document.getElementById("rechargeForm").reset();
  $('#file-input').fileinput('clear')
}

function doSave(e) {
  var pic = $('#upload').attr('picurl');
  if (isNull(pic)) {
    notifyInfo('请上传图片！')
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

  promiseData('POST',URL_SELL_TRANSFER,JSON.stringify(data), cbSave)
}

function cbSave(e) {
  if (e.code == 0) {
    msgbox(MSG_RECHARGE_SUCCESS,MSG_GOON_RECHARGE,MSG_LOOKUP_RECHARGE,cbGoto)
  } else if (e.code == -1) {
    relogin();
  } else if (e.code == 99){
    notifyInfo(e.message);
  }
}

function cbGoto(result) {
  if (!result) {
    parent.$("#mainframe").attr('src','listRecharge.html');
  }else{
    parent.$("#mainframe").attr('src','rechargeTask.html');
  }
}



