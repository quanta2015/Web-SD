var _id;

$(init);

function init() {
  initList();
  $('body').on('click', '.audit-task', doAuditTask);
}


function initList() {
  TmplData(TMPL_ADMIN_RECHARGE_LIST,URL_ADMIN_ALL_RECHARGE,null, cbListTask)
}


function cbListTask(r, e) {
  if (e[0].code == 0) {
    e[0].imgPrefix = IMG_PREFIX;
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(e[0], timeHelp));
    $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
  } else if (e.code == -1) {
    relogin();
  }
}


function doAuditTask(e) {
  var sid = $(this).data('id')
  var type = $(this).data('type')
  var obj = {
    id: sid,
    approve: (type=='pass')?1:2,
    reason: (type=='pass')?'数据正确！':'数据有误!'
  }

  promiseData('POST',URL_ADMIN_AUDIT_RECHARGE,JSON.stringify(obj), cbAuditTask)
}

function cbAuditTask(e) {
  if (e.code == 0) {
    initList()
  } else if (e.code == -1) {
    relogin();
  }
}