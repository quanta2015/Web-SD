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
  promiseData('get',URL_SELL_ACC_TASK_DETAIL,obj, cbList)
}

function doSubmitGoods() {
    var obj = {
      buyerTaskId: _id,
      delivery: $('#u-delivery').val(),
      expressNo: $('#u-expressno').val(),
      expressStatus: $('#u-express-status').val() 
    }

    promiseData('POST',URL_SELL_DELIVERY, JSON.stringify(obj), cbSubmitGoods)
    
}

function doReturnList() {
    location.href = 'listTaskItem.html?id=' +  _pid
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
  if (e.code == 0) {
    renderData(e.data)
  } else if (e.code == -1) {
    relogin();
  } else if (e.code == 99){
    notifyInfo(MSG_GET_TASK_DETAIL_ERR);
  }
}

function cbSubmitGoods(e) {
  if (e.code == 0) {
    alertBox(MSG_DELIVERY_SUCCESS, doReturnList);
  } else if (e.code == -1) {
    relogin();
  } else if (e.code == 99){
    notifyInfo(MSG_DELIVERY_ERR);
  }  
}