var _id, _tid;

$(init);

function init() {
  _id = getUrlParam('id')
  _tid = getUrlParam('tid')
  renderImg()

  $('body').on('click', '#submit-eval', doSubmitEval);
  $('body').on('click', '#return-list', gotoPage);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click','.b-close',doClose);
  $('body').on('click', '.detail-task', doDetail);
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

function doDetail() {
  var obj = {
    id: $(this).data("id")
  };
  promiseTmpl('GET', '/tmpl/buy/appeal_detail.tmpl', ['/get_complain_detail', encodeQuery(obj)].join('?') ,null, cbDetail)
}

function cbDetail(r, e) {
  let ret = e;
  ret.data.imgPrefix = IMG_PREFIX;
  $(".g-detail").empty();
  $(".g-detail").append($.templates(r).render(ret.data, rdHelper));
  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
  $(".g-detail").show();
}

function gotoPage() {
  location.href = 'listOrder.html?status=20'
}


function doClose() {
  $('.g-detail').hide()
}
