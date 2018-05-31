var _id;

$(init);

function init() {
  initList();
  $('body').on('click', '.commit-task', doCommit);
  $('body').on('click', '.cancel-task', doCancelTask);
}

function initList() {
  TmplData(TMPL_BUY_ALL_ORDER,URL_BUYER_ALL_ORDER,null, cbList)
}

function cbList(r, e) {
  if (e[0].code == 0) {
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(e[0], rdHelper));
  } else if (e[0].code == 99) {
    notifyInfo(e.message);
  } else if (e[0].code == -1) {
    relogin();
  }
}

function doCommit() {
  var id = $(this).data("id")
  location.href = 'submitOrder.html?id=' + id
}

function doCancelTask() {
  var obj = {
    buyerTaskId: $(this).data('id')
  }
  promiseData('GET',[URL_BUY_CANCEL_TASK, encodeQuery(obj)].join('?') ,null, cbCancelTask)
}

function cbCancelTask(e)  {
  if (e.code == 0) {
    notifyInfo('退单成功！');
    initList()
  } else if (e.code == 99) {
    notifyInfo(e.message);
  } else if (e.code == -1) {
    relogin();
  }
}