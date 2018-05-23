var _id;

$(init);

function init() {
  initList();
  $('body').on('click', '.audit-task', doChoose);
}

function initList() {
  TmplData(TMPL_BUYER_ALL_TASK,URL_BUYER_ALL_TASK,null, cbList)
}

function cbList(r, e) {
  if (e[0].code == 0) {
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(e[0], timeHelp));
    // $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
  } else if (e.code == -1) {
    relogin();
  }
}

function doChoose(e) {
  var id = $(this).data('id')
  var kid = $(this).data('kid')
  var obj = {
    taskId: kid,
    taskKeyId: (type=='pass')?AUDIT_PASS:AUDIT_FAIL,
    taskType: (type=='pass')?'数据正确！':'数据有误!',
    status: 1
  }
  promiseData('POST',URL_BUYER_GET_TASK,JSON.stringify(obj), cbChoose)
}

function cbChoose(e) {
  if (e.code == 0) {
    initList()
  } else if (e.code == -1) {
    relogin();
  }
}