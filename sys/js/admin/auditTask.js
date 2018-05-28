var _id;

$(init);

function init() {
  initList();
  $('body').on('click', '.audit-task', doAuditTask);
}


function initList() {
  TmplData(TMPL_ADMIN_TASK_LIST,URL_ADMIN_ALL_TASK,null, cbListTask)
}


function cbListTask(r, e) {
  if (e[0].code == 0) {
    _listtask = e.data;
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(e[0], timeHelp));
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

  promiseData('POST',URL_ADMIN_TASK_AUDIT,JSON.stringify(obj), cbAuditTask)
}

function cbAuditTask(e) {
  if (e.code == 0) {
    initList()
  } else if (e.code == -1) {
    relogin();
  }
}