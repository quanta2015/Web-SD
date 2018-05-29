$(init);

function init() {

  initDetail();

  initList();

  $('body').on('click', '#clear-shop', doClearShop);
  $('body').on('click', '#check-shop', doCheckShop);
  $('body').on('click', '#submit-buy', doSubmitBuy);
}

function initList() {
  // TmplData(TMPL_BUY_ALL_ORDER,URL_BUYER_ALL_ORDER,null, cbList)
  renderImg()
}


async function initDetail() {
  d = {  
        show:false
    }
  $('.m-d-detail').append(await renderTmpl(TMPL_BUY_ORDER_DETAIL, d))
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
    paymoney:$('#pay-money').val()
  }

  promiseData('post', '/buyertask/task_complete' , JSON.stringify(data), cbSubmitBuy)
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

}