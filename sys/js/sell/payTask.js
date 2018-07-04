var _id,_tid,_pid;

$(init);

function init() {
  _id = getUrlParam('id')
  _tid = getUrlParam('tid')
  _pid = getUrlParam('pid')
  type = getUrlParam('type')

  initList();

  if(type === 'pay') {
    $('.m-d-browser').hide();
  }else{
    $('.m-d-pay').hide();
  }

  $('body').on('click', '#return-list', doReturnList);
  $('body').on('click', '#pay-task', doPayTask);
}

function initList() {
  var obj = { buyerTaskId: _id }
  promise('get',URL_SELL_ACC_TASK_DETAIL,obj, cbList, null)
}

function doPayTask(e) {
  bootbox.prompt(MSG_INPUT_AUDIT_INFO, function(ret){ 
    if( ret !== null) {
      var obj = {
        id: sid = _id,
        approve: ($(e.currentTarget).data('type')=='pass')?1:2,
        reason: ret
      }
      promise('POST',URL_SELL_PAY_ORDER,JSON.stringify(obj), cbAudit, null)
    }; 
  });
}

function doReturnList() {
  history.back()
}

function renderData(ret) {

    if(type === 'pay') {
      $("#u-goods-evaluate").attr('src', IMG_PREFIX + ret.goodsEvaluate).parent().attr('href', IMG_PREFIX + ret.goodsEvaluate);
      $("#u-express-picture").attr('src', IMG_PREFIX + ret.expressPicture).parent().attr('href', IMG_PREFIX + ret.expressPicture);
      $("#u-express-evaluate").attr('src', IMG_PREFIX + ret.expressEvaluate).parent().attr('href', IMG_PREFIX + ret.expressEvaluate);
    }else{
      $("#u-result").attr('src', IMG_PREFIX + ret.result).parent().attr('href', IMG_PREFIX + ret.result);
      $("#u-goods1").attr('src', IMG_PREFIX + ret.goods1).parent().attr('href', IMG_PREFIX + ret.goods1);
      $("#u-goods2").attr('src', IMG_PREFIX + ret.goods2).parent().attr('href', IMG_PREFIX + ret.goods2);
      $("#u-head").attr('src', IMG_PREFIX + ret.head).parent().attr('href', IMG_PREFIX + ret.head);
      $("#u-tail").attr('src', IMG_PREFIX + ret.bottom).parent().attr('href', IMG_PREFIX + ret.bottom);
      $("#u-shopgoods1").attr('src', IMG_PREFIX + ret.shopgoods1).parent().attr('href', IMG_PREFIX + ret.shopgoods1);
      $("#u-shopgoods2").attr('src', IMG_PREFIX + ret.shopgoods2).parent().attr('href', IMG_PREFIX + ret.shopgoods2);
      $("#u-f-shop").attr('src', IMG_PREFIX + ret.followShop).parent().attr('href', IMG_PREFIX + ret.followShop);
      $("#u-f-goods").attr('src', IMG_PREFIX + ret.followGoods).parent().attr('href', IMG_PREFIX + ret.followGoods);
      $("#u-add-cart").attr('src', IMG_PREFIX + ret.cart).parent().attr('href', IMG_PREFIX + ret.cart);
    }
    
    $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
}

function cbList(e) {
  renderData(e)
}

function cbAudit(e) {
  alertBox(MSG_PAY_SUCC, ()=>{
    if(type === 'pay') {
      clickMenu('payTaskOrder');
    }else{
      clickMenu('browserTaskOrder');
    }
  });
}