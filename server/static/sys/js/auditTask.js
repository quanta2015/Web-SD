var _listtask;
var _id;

$(init);

function init() {
  initList();

  // $('body').on('click', '.del-shop', doDelShop);
}


function initList() {
  promiseData('GET', URL_SELL_ALL_TASK, null, cbListTask);
}



var timeHelp = {
  formatTime: (t) => { return moment(t).format("YYYY-M-D h:mm:ss") }
}


function cbListTask(e) {
  console.log(e);
  if (e.code == 0) {
    _listtask = e.data;
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($("#taskTmpl").render(e, timeHelp ));
  } else if (e.code == -1) {
    relogin();
  }
}