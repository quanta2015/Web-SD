var _id,_tid,_pid;

$(init);

function init() {
  _id = getUrlParam('id')
  _tid = getUrlParam('tid')
  _pid = getUrlParam('pid')

  initList();

  $('body').on('click', '#return-list', doReturnList);
  $('body').on('click', '#submit-goods', doPayTask);
}

function initList() {
  var obj = { buyerTaskId: _id }
  promiseData('get',URL_SELL_ACC_TASK_DETAIL,obj, cbList)
}

function doPayTask() {
    // var obj = {
    //   buyerTaskId: _id,
    //   delivery: $('#u-delivery').val(),
    //   expressNo: $('#u-expressno').val(),
    //   expressStatus: $('#u-express-status').val() 
    // }

    // promiseData('POST',URL_SELL_DELIVERY, JSON.stringify(obj), cbSubmitGoods)
}

function doReturnList() {
    location.href = 'listTaskItem.html?id=' +  _pid
}

function renderData(ret) {
    $("#u-goods-evaluate").attr('src', IMG_PREFIX + ret.goodsEvaluate).parent().attr('href', IMG_PREFIX + ret.result);
    $("#u-express-picture").attr('src', IMG_PREFIX + ret.expressPicture).parent().attr('href', IMG_PREFIX + ret.goods1);
    $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
}

function cbList(e) {
  if (e.code == 0) {
    renderData(e.data)
  } else if (e.code == -1) {
    relogin();
  } else {
    errorInfo(MSG_GET_TASK_DETAIL_ERR);
  }
}

function cbSubmitGoods(e) {
  if (e.code == 0) {
    alertBox(MSG_PAY_SUCC, doReturnList);
  } else if (e.code == -1) {
    relogin();
  } else {
    errorInfo(MSG_PAY_ERR);
  }  
}