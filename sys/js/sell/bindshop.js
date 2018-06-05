$(init);

function init() {
  $('body').on('click', '#resetBtn', doResetForm);
  $('body').on('click', '#saveBtn', doSave);

  
  $('#typepicker').typepicker();
  $('#pick').distpicker();
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
    $("#saveBtn").attr('disabled',true)
  promiseData('POST', URL_SHOP_BIND, JSON.stringify(obj), cbSave);
}

function cbSave(e) {
  if (e.code == 0) {
    msgbox(MSG_BIND_SHOP_SUCC,MSG_CONT_BIND_SHOP,MSG_GOTO_SHOP_LIST,cbGoto)
  } else if (e.code == 99) {
    notifyInfo(e.message)
    $("#saveBtn").attr('disabled',false)
  } else if (e.code == -1) {
    relogin();
  }
}


function cbGoto(result) {
  if (!result) {
    goto('listShop.html')
  } else {
    goto('bindShop.html')
  }
}

