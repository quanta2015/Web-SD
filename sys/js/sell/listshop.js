var _listshop;
var _id;

$(init);

function init() {
  initList();

  $('#user-id').val(cookie('id'))
  $('#user-qq').val(cookie('qq'))
  $('#user-regtime').val(moment(cookie('regtime')).format("YYYY-M-D HH:mm:ss"))

  $('body').on('click', '.del-shop', doDelShop);
  $('body').on('click', '.save-shop', doSaveShop);
  $('body').on('click', '.edit-shop', doEditShop);
}


function initList() {
  promiseTmpl('GET', TMPL_SELL_SHOP_LIST,URL_SELL_SHOPS,null, cbListShop)
}


function cbListShop(r, e) {
  var ret = e;
  _listshop = ret.data;
  ret.imgPrefix = IMG_PREFIX;
  $(".portlet-body .table").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, null));
}

function doDelShop() {
  var sid = $(this).attr('id')
  msgbox('提示信息',MSG_CONF_DEL_SHOP,MSG_CANCEL,MSG_OK,cbDel)

  function cbDel(e) {
    if (!e) {
      promise('GET', URL_SELL_SHOP_DEL + sid, null, cbDelShop, null);
    }
  }
}

function cbDelShop(e) {
  initList()
}

function doEditShop() {
  $('#areapick').distpicker('destroy');
  $('#areapick').distpicker();
  $('#typepicker').typepicker('destroy');
  $('#typepicker').typepicker();

  index = $(this).data('index');
  _id = $(this).data('id');
  $('#file-input').fileinput('clear')
  $('#shop_name').val(_listshop[index].name);
  $('#shop_url').val(_listshop[index].shopurl);
  $('#shop_addr').val(_listshop[index].address);
  $('#shop-wangid').val(_listshop[index].wangid);
  $('#shop_img').attr('src', IMG_PREFIX + _listshop[index].shopimg1);
  $('#upload').attr('picurl', _listshop[index].shopimg1);


  $("#shop_type").find("option[value='" + _listshop[index].type + "']").attr("selected",true);
  $("#shop-province").find("option[value='" + _listshop[index].addressProvince + "']").attr("selected",true);
  $("#shop-province").trigger("change");
  $("#shop-city").find("option[value='" + _listshop[index].addressCity + "']").attr("selected",true);
  $("#shop-city").trigger("change");
  $("#shop-county").find("option[value='" + _listshop[index].addressCounty + "']").attr("selected",true);

  $("#shop-businesstype").find("option[value='" + _listshop[index].businesstype + "']").attr("selected",true);
  $("#shop-businesstype").trigger("change");
  $("#shop-subtype").find("option[value='" + _listshop[index].subtype + "']").attr("selected",true);
}

function cbEditShop(e) {
  $("#basic .close").click()
  notifyInfo(MSG_UPDATE_SHOP_SUCC)
  initList()
}

function doSaveShop() {
   obj = {
    id: _id,
    type: $('#shop_type').val(),
    name: $('#shop_name').val(),
    address: $('#shop_addr').val(),
    businesstype: $('#shop-businesstype').val(),
    subtype: $('#shop-subtype').val(),
    addressProvince: $('#shop-province').val(),
    addressCity: $('#shop-city').val(),
    addressCounty: $('#shop-county').val(),
    shopimg1: $('#upload').attr('picurl'),
    shopurl:$('#shop_url').val(),
    wangid: $('#shop-wangid').val()
  }
  console.log(obj)
  promise('POST', URL_SELL_SHOP_UPDATE, JSON.stringify(obj), cbEditShop, null);
}