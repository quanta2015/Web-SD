var _id;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {
  _id = getUrlParam('id')

  initList(pageData);
  $('body').on('click', '.return-list', doReturnList);

}

function initList(param) {
  Object.assign( param, { taskId: _id });
  TmplData('/tmpl/sell/list_taskitem.tmpl', ['/task/task_accept_list', encodeQuery(param)].join('?'), null, cbListTask)
}

function doReturnList() {
  location.href = 'listTask.html'
}


// function cbPayTask(e) {
//   if (e.code == 0) {
//     initList();
//   } else if (e.code == -1) {
//     relogin();
//   } else {
//     errorInfo(MSG_PUBLISH_FAILED);
//   }
// }

function cbListTask(r,e) {
  let ret = e[0];
  if (ret.code == 0) {
    Object.assign(ret, pageData);
    totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(ret, rdHelper));
    if ($('.table-pg').text() == '') initPage(totalPages);
  } else if (ret.code == 99) {
    notifyInfo(ret.message);
  } else if (ret.code == -1) {
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
