let pageData = Object.assign({}, PAGE_DATA);
$(init);

function init() {
  initList();
}

function initList(param = pageData) {

  Object.assign(param, { transferType:1});

  TmplData(TMPL_SELL_RECHARGE_LIST, [URL_SELL_ALL_RECHARGE, encodeQuery(param)].join('?'), null, cbList)
}

function cbList(r, e) {
  let data = e[0];
  if (data.code == 0) {
    Object.assign(data, pageData);
    totalPages = Math.ceil(data.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(data, rdHelper));
    if ($('.table-pg').text() == '') initPage(totalPages);
  } else if ([-1, 99].includes(e.code)) {
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
