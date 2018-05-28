var _listtask;
var _id;

$(init);

function init() {
  initList();

  $('body').on('click', '.pay-task', doPayTask);
}


function initList() {
  var id = parseInt(cookie('id'));
  // promiseData('GET', URL_SELL_ALL_TASK, null, cbListTask);
  TmplData(TMPL_SELL_TASK_LIST,URL_SELL_ALL_TASK,null, cbListTask)
}

function doPayTask(e) {

  var id = $(e.target).attr('id')

  promiseData('GET', URL_SELL_PAY_TASK + id, null, cbPayTask);
}

function cbPayTask(e) {
  if (e.code == 0) {
    _listtask = e.data;
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(e[0], timeHelp));
  } else if (e.code == -1) {
    relogin();
  }
}


function cbListTask(r,e) {
    console.log(e);
  if (e[0].code == 0) {
    _listtask = e[0].data;
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(e[0], timeHelp));
  } else if (e[0].code == -1) {
    relogin();
  }

}