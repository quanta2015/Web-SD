var _id, _tid;

$(init);

function init() {
  _id = getUrlParam('id')
  _tid = getUrlParam('tid')

  renderImg()

  initInfo()

  $('body').on('click', '#submit-eval', doSubmitEval);
  $('body').on('click', '#return-list', gotoPage);
  $('body').on('click','#watch-require',doEvalExplain);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click','.b-close',doClose);
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
  location.href = 'listOrder.html?status=20'
}

function doEvalExplain(e){
	var meshtm="<table width='100%' ><tr height='50px'><td align='center'>普通好评任务</td><td style='padding-left:20px'>评价要求：<br>好评，评价可自由发挥</td></tr>"+
	"<tr height='80px'><td align='center'>指定关键词好评任务</td><td style='padding-left:20px'>评价要求：<br>文字好评内容须涵盖以下指定关键词<br>指定关键词：xxx</td></tr>"+
	"<tr height='80px'><td align='center'>指定文字好评任务</td><td style='padding-left:20px'>评价要求：<br>请完全按照以下指定文字填写好评内容<br>指定文字：xxx</td></tr>"+
	"<tr height='80px'><td align='center'>指定图片好评任务</td><td style='padding-left:20px'>评价要求：<br>请上传以下指定图片，并填写指定文字好评内容<br>图片：<input style='width:20px'/> <input style='width:20px'/><input style='width:20px'/><br>指定文字：xxx</td></tr>"+
	"</table>"
	bootbox.dialog({title:'评价说明',message:meshtm});
}

function doClose() {
  $('.g-detail').hide()
}
