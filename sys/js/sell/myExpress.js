var _id;
var _shop = {};
let pageData;

$(init);

function init() {
  pageData =  Object.assign({}, PAGE_DATA);

  initTime();
  initList(pageData);

  $('#searchBtn').on('click', doSearch);
}

function doSearch() {
  initList(pageData)
}

function initTime() {
  let from =  moment().subtract('days',7).format('YYYY-MM-DD') + ' 00:00';
  let to = moment().format('YYYY-MM-DD') + ' 23:59'
  $("#from").datetimepicker({ value: from, format:'Y-m-d H:i'});
  $("#to").datetimepicker({value: to, format:'Y-m-d H:i'});
}

function initList(pg) {
  let cdt = {
    taskId: $("#task-id").val(),
    mainType: 'buy',
    buyExpress: 1,
    acceptStart: $("#from").val() + ':00',
    acceptEnd: $("#to").val()+ ':00'
  }
  Object.assign( cdt, pg);
  promiseTmpl('GET', '/tmpl/sell/list_express_order.tmpl', ['/task/task_accept_list_all', encodeQuery(cdt)].join('?'), null, cbListTask)
}


function cbListTask(r,ret) {
  Object.assign(ret, pageData);
  ret.type = 'buy';
  totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
  $(".portlet-body .u-wrap").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, rdHelper));
  if ($('.table-pg').text() == '') initPage(totalPages);
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
