let _id;
let _listtask;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {

  tasktype = getUrlParam('tasktype')
  console.log(tasktype);

  $('#task-capacity').text(cookie('remainderNumberOfMonth'))

  initList(pageData);
  $('body').on('click', '.audit-task', doDetail);
}

function initList(obj) {
  (tasktype == 1)? pl = '淘宝':pl='京东';
  param = Object.assign(obj, {platform: pl });
  promiseTmpl('GET', TMPL_BUY_ALL_TASK, [URL_BUYER_ALL_TASK, encodeQuery(param)].join('?'),null, cbList)
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

