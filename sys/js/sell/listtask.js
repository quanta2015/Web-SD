var _listtask;
var _id;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {

  initList();
  $('body').on('click', '.pay-task', doPayTask);

}

function initList(param = pageData) {
  let id = parseInt(cookie('id'));
  TmplData(TMPL_SELL_TASK_LIST, [URL_SELL_ALL_TASK, encodeQuery(param)].join('?'), null, cbListTask)
}

function doPayTask(e) {
  let id = $(e.target).attr('id')

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
  let data = e[0];
  if (data.code == 0) {
    _listtask = e[0].data;
    Object.assign(data, pageData);
    totalPages = Math.ceil(data.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(data, timeHelp));
    if ($('.table-pg').text() == '') initPage(totalPages);
  } else if (e[0].code == -1) {
    relogin();
  }

}

function initPage(totalPages) {
  $('.portlet-body .table-pg').twbsPagination({
    totalPages: totalPages,
    onPageClick: function(event, page) {
      pageData.pageIndex = page - 1;
      initList(pageData);
    }
  })
}