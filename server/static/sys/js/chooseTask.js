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
    $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
  } else if (e.code == -1) {
    relogin();
  }
}

function doChoose(e) {
  var sid = $(this).data('id')
  var type = $(this).data('type')
  var obj = {
    id: sid,
    // approve: (type=='pass')?AUDIT_PASS:AUDIT_FAIL
    // reason: (type=='pass')?'数据正确！':'数据有误!'
  }
  promiseData('POST',URL_ADMIN_ACOUNT_AUDIT,JSON.stringify(obj), cbChoose)
}

function cbChoose(e) {
  if (e.code == 0) {
    initList()
  } else if (e.code == -1) {
    relogin();
  }
}