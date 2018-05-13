$(init);

function init() {
  initList();
}


function initList() {
  var id = parseInt($.cookie('id'));
  promiseData('GET', '/users/shoper_shops/' + id, null, cbListShop);
}


function cbListShop(e) {
  console.log(e);
  if (e.code == 0) {
    $(".portlet-body .table-scrollable").remove();
    $(".portlet-body").prepend($("#shopTmpl").render(e));
  } else if (e.code == -1) {
    relogin();
  }
}