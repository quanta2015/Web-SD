var _id, _tid;

$(init);

function init() {
  _id = getUrlParam('id')
  _tid = getUrlParam('tid')

  renderImg()

  initInfo()

  $('body').on('click', '#submit-eval', doSubmitEval);
  $('body').on('click', '#return-list', gotoPage);
}

function gotoPage() {
  location.href = 'listOrder.html'
}


function initInfo() {

  var obj = { taskkeyid:_tid }
  promise('GET', '/buyertask/taskdetail', obj, cbInfo, null)
}


function cbInfo(e) {
  $('#task-type').text( e.taskkeyInfo.taskkeyTypeStr)
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


  data = {
    buyerTaskId: _id,
    expressPicture: $("#u-express-picture").attr('picurl'),
    goodsEvaluate: $("#u-goods-evaluate").attr('picurl')
  }

  promise('post', URL_BUY_TASK_EVALUATE , JSON.stringify(data), cbSubmitEval, null)
}

function cbSubmitEval(e) {
  alertBox(MSG_EVALUATE_SUCC ,gotoPage)
}

function gotoPage() {
  location.href = 'listOrder.html'
}
