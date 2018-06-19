let rules = {
  shopType: {
    required: !0,
  },
  shopUrl: {
    required: !0,
    url: true
  },
  shopWangId: {
    required: !0
  },
  shopName: {
    required: !0
  },
  businesstype: {
    required: !0,
  },
  subtype: {
    required: !0,
  },
  province: {
    required: !0,
  },
  city: {
    required: !0,
  },
  county: {
    required: !0,
  },
  addr: {
    required: !0,
  }
}

$(init);

function init() {
  $('body').on('click', '#resetBtn', doResetForm);
  $('#shop_type').on('change', doChange);

  $('#typepicker').typepicker();
  $('#pick').distpicker();

  $("#form-bind").validate({
    rules: rules,
    submitHandler: (e) => { doSave() }
  })
}

function doChange(e) {
  if ($(e.currentTarget).val() === '京东') {
    $('.form-tb').hide()
  }else{
    $('.form-tb').show()
  }
}

function doResetForm() {
  document.getElementById("form-bind").reset()
}

function doSave() {
  obj = { 
      "type": $('#shop_type').val(),
      "address": $('#shop_addr').val(),
      "name": $('#shop_name').val(),
      "shopurl": $('#shop_url').val(),
      "businesstype": $('#shop-businesstype').val(),
      "subtype": $('#shop-subtype').val(),
      "addressProvince": $('#shop-province').val(),
      "addressCity": $('#shop-city').val(),
      "addressCounty": $('#shop-county').val(),
      "shopimg1": $("#upload").attr('picurl'),
      "wangid": $("#shop-wangid").val()
    };
    if (!obj.shopimg1) return errorInfo('缺少店铺管理后台截图');
    $("#saveBtn").attr('disabled',true)
  promise('POST', URL_SHOP_BIND, JSON.stringify(obj), cbSave, cbSaveErr);
}

function cbSave(e) {
  msgbox('提示信息', MSG_BIND_SHOP_SUCC,MSG_CONT_BIND_SHOP,MSG_GOTO_SHOP_LIST,cbGoto)
}

function cbSaveErr() {
  $("#saveBtn").attr('disabled',false)
}


function cbGoto(result) {
  if (!result) {
    goto('listShop.html')
  } else {
    goto('bindShop.html')
  }
}

