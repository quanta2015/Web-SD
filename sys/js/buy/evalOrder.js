var _id, _tid;

$(init);

function init() {
  _id = getUrlParam('id')
  _tid = getUrlParam('tid')

  renderImg()

  $('body').on('click', '#submit-eval', doSubmitEval);
  $('body').on('click', '#return-list', gotoPage);
}

function gotoPage() {
  location.href = 'listOrder.html'
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


function doSubmitEval(e) {
  data = {
    buyerTaskId: _id,
    expressPicture: $("#u-express-picture").attr('picurl'),
    goodsEvaluate: $("#u-goods-evaluate").attr('picurl')
  }

  promiseData('post', '/buyertask/submit_evaluate' , JSON.stringify(data), cbSubmitEval)
}

function cbSubmitEval(e) {
  if (e.code == 0) {
    alertBox('提交评价成功！' ,gotoPage)
  }else if (e.code==99) {
    notifyInfo(e.message);
  }else if (e.code==-1) {
    relogin();
  };
}

function gotoPage() {
  location.href = 'listOrder.html'
}
