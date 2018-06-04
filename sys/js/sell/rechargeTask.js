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

$(init);

function init() {
  initList();
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


