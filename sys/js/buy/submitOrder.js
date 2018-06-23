var _id, _tid;

$(init);

function init() {
  _id = getUrlParam('id')
  _tid = getUrlParam('tid')

  initDetail();
  initList();

  $('body').on('click', '#clear-shop', doClearShop);
  $('body').on('click', '#check-shop', doCheckShop);
  $('body').on('click', '#submit-buy', doConfirm);
  $('body').on('click', '#return-list', doReturn);
}

function initList() {
  renderImg()
}

async function initDetail() {
  param = { taskkeyid: _tid }
  ret = await promiseCall( [URL_BUY_TASKDETAIL, encodeQuery(param)].join('?'), null )
  Object.assign(ret.data, { show:false,imgPrefix: IMG_PREFIX });
  $('#shop-name').text(ret.data.shopName)
  if(ret.data.chatNecessary == 0) {
    $('.m-talk').remove()
  }
  $('.m-d-detail').append(await renderTmpl(TMPL_BUY_ORDER_DETAIL, ret.data, rdHelper))
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

function doConfirm() {
  let err = false;
  $('.u-img').each(function() {
    if ( isNull( $(this).attr('picurl')) ) {
      err = true;
    }
  })

  if (err) {
    notifyInfo('请上传图片！');
    return;
  }

  if ($('#order-id').val() === '' ) {
    notifyInfo('请填写订单编号！');
    return;
  }

  if ($('#pay-money').val() === '' ) {
    notifyInfo('请填写实际付款金额');
    return;
  }

  msgbox('温馨提示', '<span class="font-red">确认提交此任务？请核对清楚！</span>','取消','确认',doSubmitBuy)
}


function doSubmitBuy(ret) {

  if (ret) return;

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
    // askPicture: $('#i-s-askall').attr('picurl'),
    orderid:    $('#order-id').val(),
    paymoney:   $('#pay-money').val(),
    shopname:   $('#shop-name').val()
  }

  promise('post', URL_BUY_SUBMIT_ORDER , JSON.stringify(data), cbSubmitBuy, null)
}


function cbSubmitBuy(e) {
  alertBox(MSG_SUBMIT_BUY_CORRECT , ()=>{
    goto('listOrder.html?status=-1')
  })
}

function doReturn() {
  history.back()
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