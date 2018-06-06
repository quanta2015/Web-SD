var _id;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {
  _id = '201806021905000011'

  initTime();
  initList(pageData);
  // $('body').on('click', '.return-list', doReturnList);
}

function initTime() {
  let from =  moment().subtract('days',7).format('YYYY-MM-DD') + ' 00:00';
  let to = moment().format('YYYY-MM-DD') + ' 23:59'
  $("#task-from").datetimepicker({ value: from});
  $("#task-to").datetimepicker({value: to});
}

function initList(param) {
  Object.assign( param, { taskId: _id });
  TmplData('/tmpl/sell/list_order.tmpl', [URL_SELL_ACCEPT_LIST, encodeQuery(param)].join('?'), null, cbListTask)
}


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
    totalPages: totalPages || 1,
    onPageClick: function(event, page) {
      pageData.pageIndex = page - 1;
      initList(pageData);
    }
  })
}
