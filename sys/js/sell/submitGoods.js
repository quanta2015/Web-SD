var _id,_tid,_pid;
var _goods;

$(init);

function init() {
  _id = getUrlParam('id')
  _tid = getUrlParam('tid')
  _pid = getUrlParam('pid')

  initList();

  $('body').on('click', '#return-list', doReturnList);
  $('body').on('click', '#submit-goods', doSubmitGoods);
}

function initList() {
  var obj = { buyerTaskId: _id }
  promise('get',URL_SELL_ACC_TASK_DETAIL,obj, cbList, null)
}

function doSubmitGoods() {
  if (_goods.buyExpress === 1) {
    yto = {
        receiveAddr: $('#receiveAddr').val(),
        receiveCity: $('#receiveCity').val(),
        receiveName: $('#receiveName').val(),
        receiveProv: $('#receiveProv').val(),
        receivePhone: _goods.ytoMailno.receivePhone,
        sendAddr:    $('#sendAddr').val(),
        sendCity:    $('#sendCity').val(),
        sendName:    $('#sendName').val(),
        sendProv:   $('#sendProv').val(),
        sendPhone:   _goods.ytoMailno.sendPhone
      }
  }else {
    yto = null
  }
  var obj = {
    buyerTaskId: _id,
    delivery: $('#u-delivery').val(),
    expressNo: $('#u-expressno').val(),
    expressStatus: $('#u-express-status').val(),
    approve: 1,  // 1表示发货  2表示退回
    ytoMailno: yto
  }

  // if ( $('#u-expressno').val() === '' ) {
  //   notifyInfo('请填写快递单号');
  //   return;
  // }

  promise('POST',URL_SELL_DELIVERY, JSON.stringify(obj), cbSubmitGoods, null)
}

function doReturnList() {
    goBack()
}

function renderData(ret) {

}

function cbList(ret) {
  _goods = ret;
  if (ret.buyExpress === 1) {
    $('.m-no-express').remove()
    _goods.ytoMailno.sendPhone = '13579984095'
    $('#sendName').val( ret.ytoMailno.sendName )
    $('#sendProv').val( ret.ytoMailno.sendProv )
    $('#sendCity').val( ret.ytoMailno.sendCity )
    $('#sendAddr').val( ret.ytoMailno.sendAddr )
    $('#receiveName').val( ret.ytoMailno.receiveName )
    $('#receiveProv').val( ret.ytoMailno.receiveProv )
    $('#receiveCity').val( ret.ytoMailno.receiveCity )
    $('#receiveAddr').val( ret.ytoMailno.receiveAddr )
    // $('#tradeNo').text( ret.ytoMailno.tradeNo )
  }else {
    $('.m-buy-express').remove()
  }
  $("#u-result").attr('src', IMG_PREFIX + ret.result).parent().attr('href', IMG_PREFIX + ret.result);
  $("#u-goods1").attr('src', IMG_PREFIX + ret.goods1).parent().attr('href', IMG_PREFIX + ret.goods1);
  $("#u-goods2").attr('src', IMG_PREFIX + ret.goods2).parent().attr('href', IMG_PREFIX + ret.goods2);
  $("#u-head").attr('src', IMG_PREFIX + ret.head).parent().attr('href', IMG_PREFIX + ret.head);
  $("#u-ask").attr('src', IMG_PREFIX + ret.ask).parent().attr('href', IMG_PREFIX + ret.ask);
  $("#u-detail").attr('src', IMG_PREFIX + ret.detail).parent().attr('href', IMG_PREFIX + ret.detail);
  $("#u-cart").attr('src', IMG_PREFIX + ret.cart).parent().attr('href', IMG_PREFIX + ret.cart);
  $("#u-talk").attr('src', IMG_PREFIX + ret.talk).parent().attr('href', IMG_PREFIX + ret.talk);
  $("#u-pay").attr('src', IMG_PREFIX + ret.pay).parent().attr('href', IMG_PREFIX + ret.pay);
  $("#u-orderid").text(ret.orderid);
  $("#u-paymoney").text(ret.paymoney);
  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
}

function cbSubmitGoods(e) {
  alertBox(MSG_DELIVERY_SUCCESS, ()=>{
    // goto('listOrder.html')
    clickMenu('payTaskOrder');
  });
}