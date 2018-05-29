let _id;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {

  initList();
  $('body').on('click', '.audit-task', doDetail);
}

function initList(param = pageData) {
  TmplData(TMPL_BUY_ALL_TASK, [URL_BUYER_ALL_TASK, encodeQuery(param)].join('?'),null, cbList)
}

function cbList(r, e) {
  let ret = e[0];
  if (ret.code == 0) {
    Object.assign(ret, pageData);
    totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(ret, rdHelper));
    if ($('.table-pg').text() == '') initPage(totalPages);
  } else if (e.code == -1) {
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