var _id;

$(init);

function init() {
  initList();
  $('body').on('click', '.audit-task', doChoose);
}

function initList() {
  TmplData(TMPL_BUY_ALL_TASK,URL_BUYER_ALL_TASK,null, cbList)
}

function cbList(r, e) {
  if (e[0].code == 0) {
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(e[0], timeHelp));
    // $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
  } else if (e.code == -1) {
    relogin();
  }
}

function doChoose(e) {
  var obj = {
    taskKeyId: $(this).data('kid')
  }
  promiseData('GET',URL_BUYER_GET_TASK+'?taskkeyId='+ $(this).data('kid') ,null, cbChoose)
}

function cbChoose(e) {
  if (e.code == 0) {
    initList()
  } else if (e.code == -1) {
    relogin();
  }
}