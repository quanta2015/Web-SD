var _id,_tid,_pid;

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
    var obj = {
      buyerTaskId: _id,
      delivery: $('#u-delivery').val(),
      expressNo: $('#u-expressno').val(),
      expressStatus: $('#u-express-status').val(),
      approve: 1  // 1表示发货  2表示退回
    }


    if ( $('#u-expressno').val() === '' ) {
      notifyInfo('请填写快递单号');
      return;
    }

    promise('POST',URL_SELL_DELIVERY, JSON.stringify(obj), cbSubmitGoods, null)
}

function doReturnList() {
    goBack()
}

function renderData(ret) {
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

function cbList(e) {
  renderData(e)
}

function cbSubmitGoods(e) {
  alertBox(MSG_DELIVERY_SUCCESS, ()=>{
    // goto('listOrder.html')
    clickMenu('payTaskOrder');
  });
}