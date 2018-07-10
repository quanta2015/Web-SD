var _id, _tid, _type;

$(init);

function init() {
  _id = getUrlParam('id')
  _tid = getUrlParam('tid')
  _type = getUrlParam('type')

  renderImg()

  initAppeal(_type)

  $('body').on('click', '#submit-eval', doSubmitEval);
  $('body').on('click', '#return-list', gotoPage);
}


function initAppeal(type) {

  appealType.forEach((e)=>{
    if(e.type === type) {
      $('#type').append( `<option value="${e.id}"> ${e.desc}</option>` )
    }
  })
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
  $('.m-img').each(function() {
    if (isNull($(this).attr('picurl'))) {
      err = true;
    }
  })

  if($("#type").val()==""){
	  notifyInfo('请选择申诉类型！');
	  return;
  }else if($("#complainContent").val()==""){
	notifyInfo('请填写申诉内容！');
    return;
  }else if (!err) {
    notifyInfo('请上传图片！');
    return;
  }
    data = {
      buyerTaskId: _id,
  	  complainContent:$("#complainContent").val(),
  	  type:$("#type").val(),
      picture1: $("#u-express-picture1").attr('picurl'),
      picture2: $("#u-express-picture2").attr('picurl'),
      picture3: $("#u-express-picture3").attr('picurl'),
  	  picture4: $("#u-express-picture4").attr('picurl'),
  	  picture5: $("#u-express-picture5").attr('picurl')
    }
  promise('post', '/submit_complain' , JSON.stringify(data), cbSubmitEval, null)
}

function cbSubmitEval(e) {
  alertBox('提交申诉成功',gotoPage);
}

function gotoPage() {
  goBack()
}

