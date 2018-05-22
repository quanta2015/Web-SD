$(init);

function init() {
  initList();
}

function initList() {
  TmplData(TMPL_SELL_RECHARGE_LIST,URL_SELL_ALL_RECHARGE,null, cbList)
}


function cbList(r, e) {
  console.log(e);
  if (e[0].code == 0) {
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(e[0], timeHelp));
  } else if (e.code == -1) {
    relogin();
  }
}



