var _id, _tid;

$(init);

function init() {
  _id = getUrlParam('id')
  _tid = getUrlParam('tid')

  initDetail();
  initList();

  $('body').on('click', '#clear-shop', doClearShop);
  $('body').on('click', '#check-shop', doCheckShop);
  $('body').on('click', '#submit-buy', doSubmitBuy);
  $('body').on('click', '#return-list', gotoPage);
}

function initList() {
  renderImg()
}

async function initDetail() {
  param = { taskkeyid: _tid }
  ret = await promiseCall( ['/buyertask/taskdetail', encodeQuery(param)].join('?'), null )
  Object.assign(ret.data, { show:false,imgPrefix: IMG_PREFIX });
  $('#shop-name').text(ret.data.shopName)
  $('.m-d-detail').append(await renderTmpl('/tmpl/buy/detail_order.tmpl', ret.data))
}


function renderImg() {
  $(".m-img").each( function(index,val) {
    $img = $(this);
    $ret = {
      pid: $(this).attr('pid'),
      type: $(this).attr('type')
    };

    ((obj, data) => {
      renderTmpl(TMPL_BUY_UPLOAD_IMG, data ).then(function(e) {
        obj.append(e)
      })
    })($img, $ret)
  })
}


function doSubmitBuy(e) {
  data = {
    buyerTaskId: _id,
    result: $('#i-s-result').attr('picurl'),
    goods1: $('#i-r-goods1').attr('picurl'),
    goods2: $('#i-r-goods2').attr('picurl'),
    head:   $('#i-s-head').attr('picurl'),
    ask:    $('#i-s-ask').attr('picurl'),
    detail: $('#i-s-detail').attr('picurl'),
    cart:   $('#i-s-cart').attr('picurl'),
    talk:   $('#i-s-talk').attr('picurl'),
    pay:    $('#i-s-pay').attr('picurl'),
    orderid:$('#order-id').val(),
    paymoney:$('#pay-money').val(),
    shopname:$('#shop-name').val()
  }

  promiseData('post', '/buyertask/task_submit' , JSON.stringify(data), cbSubmitBuy)
}


function cbSubmitBuy(e) {
  if (e.code == 0) {
    alertBox("提交购买任务成功！",gotoPage)
  }else if (e.code==99) {
    notifyInfo(e.message);
  }else if (e.code==-1) {
    relogin();
  };
}

function gotoPage() {
  location.href = 'listOrder.html'
}

function doClearShop() {
  $('#shop-name').val('')
}

function doCheckShop() {
  var data = {
    buyTaskId: _id,
    shopName: $('#u-shop-name').val()
  }
  promiseData('get', '/buyertask/check_shop' , data, cbCheckShop)
}

function cbCheckShop(e) {
  if (e.code == 0) {
    alertBox("店铺名称正确",null)
    
  }else if (e.code==99) {
    notifyInfo(e.message);
  }else if (e.code==-1) {
    relogin();
  };
}