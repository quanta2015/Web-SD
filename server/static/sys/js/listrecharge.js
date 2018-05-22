$(init);

function init() {
  initList();
}

function initList() {
  TmplData(TMPL_RECHARGE_LIST,URL_SELL_ALL_TASK,null, cbList)
}


function cbList(r, e) {
  console.log(e);
  if (e[0].code == 0) {
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(e[0], null));
  } else if (e.code == -1) {
    relogin();
  }
}



