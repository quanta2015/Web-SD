$(init);

function init() {
  initList();

  $('body').on('click', '.del-shop', doDelShop);
}


function initList() {
  var id = parseInt($.cookie('id'));
  promiseData('GET', '/users/shoper_shops/' + id, null, cbListShop);
}


function cbListShop(e) {
  console.log(e);
  if (e.code == 0) {
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($("#shopTmpl").render(e));
  } else if (e.code == -1) {
    relogin();
  }
}

function doDelShop() {
  var sid = $(this).attr('id')
  msgbox("请确认是否要删除店铺！","取消","确定",cbDel)

  function cbDel(e) {
    if (!e) {
      promiseData('GET', '/users/shop_del/' + sid, null, cbDelShop);
    }
  }
}

function cbDelShop(e) {
  console.log(e);
  if (e.code == 0) {
    initList()
  } else if (e.code == -1) {
    relogin();
  }
}
