var _id, _tid;

$(init);

function init() {
  _id = getUrlParam('id')
  _tid = getUrlParam('tid')

  renderImg()

  initInfo()

  $('body').on('click', '#submit-eval', doSubmitEval);
  $('body').on('click', '#return-list', gotoPage);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click','.b-close',doClose);
}


function initInfo() {

  var obj = { taskkeyid:_tid }
  promise('GET', '/buyertask/taskdetail', obj, cbInfo, null)
}

function evalReq(s) {
    arr = s.split("");
    ret = [];
    arr.forEach( (v)=>{
      switch( parseInt(v) ) {
        case 1: ret.push('普通评价任务'); break;
        case 2: ret.push('关键字好评任务'); break;
        case 3: ret.push('图片好评任务'); break;
        case 3: ret.push('文字好评任务'); break;
      }
    })
    return ret.join('/')
  }

function cbInfo(e) {

  e.taskTypeArr = e.taskkeyType.split("");
  if (e.taskTypeArr.length>1) {
    removeByValue(e.taskTypeArr,'1')
  }
  e.appoints = e.appoints.split(';')
  $('#task-type').text( e.taskkeyInfo.taskkeyTypeStr);

  html = $('#evalTmpl').render(e);
  $('.m-eval').append(html)
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
    goodsEvaluate: $("#u-goods-evaluate").attr('picurl'),
    expressEvaluate: $("#u-express-evaluate").attr('picurl')
  }

  promise('post', URL_BUY_TASK_EVALUATE , JSON.stringify(data), cbSubmitEval, null)
}

function cbSubmitEval(e) {
  alertBox(MSG_EVALUATE_SUCC ,gotoPage)
}

function gotoPage() {
  location.href = 'listOrder.html?status=20'
}


function doClose() {
  $('.g-detail').hide()
}
