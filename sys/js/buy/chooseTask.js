let _id;
let _listtask;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {

  $('#task-capacity').text(cookie('remainderNumberOfMonth'))

  initList();
  $('body').on('click', '.audit-task', doDetail);
}

function initList(param = pageData) {
  pormiseTmpl('GET', TMPL_BUY_ALL_TASK, [URL_BUYER_ALL_TASK, encodeQuery(param)].join('?'),null, cbList)
}

function cbList(r, e) {
  let ret = e;
  _listtask = ret.data;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
  $(".portlet-body .table").remove();
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

function doDetail() {
  location.href = 'detailTask.html?id=' + $(this).data('kid')
}

function cbChoose(e) {
  if (e.code == 0) {
    initList()
  } else if (e.code == -1) {
    relogin();
  }
}