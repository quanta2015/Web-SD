var _listtask;
var _id;

$(init);

function init() {
  initList();

  // $('body').on('click', '.del-shop', doDelShop);
}


function initList() {
  var id = parseInt(cookie('id'));
  // promiseData('GET', URL_SELL_ALL_TASK, null, cbListTask);
  TmplData(TMPL_SELL_TASK_LIST,URL_SELL_ALL_TASK,null, cbListTask)
}




function cbListTask(r,e) {
    console.log(e);
  if (e[0].code == 0) {
    _listtask = e[0].data;
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(e[0], timeHelp));
  } else if (e.code == -1) {
    relogin();
  }

}