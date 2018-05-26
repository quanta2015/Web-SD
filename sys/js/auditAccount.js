var _id;

$(init);

function init() {
  initList();
  $('body').on('click', '.audit-task', doAudit);
}

function initList() {
  TmplData(TMPL_ADMIN_ACOUNT_LIST,URL_ADMIN_ACOUNT_LIST,null, cbList)
}

function cbList(r, e) {
  if (e[0].code == 0) {
    e[0].imgPrefix = IMG_PREFIX;
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(e[0], null));
    $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
  } else if (e.code == -1) {
    relogin();
  }
}

function doAudit(e) {
  var sid = $(this).data('id')
  var type = $(this).data('type')
  var obj = {
    id: sid,
    approve: (type=='pass')?AUDIT_PASS:AUDIT_FAIL
    // reason: (type=='pass')?'数据正确！':'数据有误!'
  }

  promiseData('POST',URL_ADMIN_ACOUNT_AUDIT,JSON.stringify(obj), cbAudit)
}

function cbAudit(e) {
  if (e.code == 0) {
    initList()
  } else if (e.code == -1) {
    relogin();
  }
}