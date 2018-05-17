var _listtask;
var _id;

$(init);

function init() {
  initList();

  // $('body').on('click', '.del-shop', doDelShop);
}


function initList() {
  var id = parseInt($.cookie('id'));
  promiseData('GET', '/task/all_tasks/', null, cbListTask);
}




function cbListTask(e) {
    console.log(e);
  if (e.code == 0) {
    _listtask = e.data;
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($("#taskTmpl").render(e));
  } else if (e.code == -1) {
    relogin();
  }

}
