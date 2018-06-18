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
  ret = await promiseCall( [URL_BUY_TASKDETAIL, encodeQuery(param)].join('?'), null )
  Object.assign(ret.data, { show:false,imgPrefix: IMG_PREFIX });
  $('#shop-name').text(ret.data.shopName)
  $('.m-d-detail').append(await renderTmpl(TMPL_BUY_ORDER_DETAIL, ret.data))
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

  promise('post', URL_BUY_SUBMIT_ORDER , JSON.stringify(data), cbSubmitBuy, null)
}


function cbSubmitBuy(e) {
  alertBox(MSG_SUBMIT_BUY_CORRECT ,gotoPage)
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
  promise('get', URL_BUY_CHECK_SHOP , data, cbCheckShop, null)
}

function cbCheckShop(e) {
  alertBox(MSG_SHOPNAME_CORRECT,null)
}