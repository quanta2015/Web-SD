let pageData = Object.assign({}, PAGE_DATA);
$(init);

function init() {
  initList();
}

function initList(param = pageData) {
  Object.assign(param, { transferType:1});
  promiseTmpl('GET', TMPL_SELL_COMMISSION_LIST, [URL_SELL_ALL_RECHARGE, encodeQuery(param)].join('?'), null, cbList)
}

function cbList(r, e) {
  let ret = e;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
  $(".portlet-body .table").remove();
  $(".table-body").prepend($.templates(r).render(ret, rdHelper));
  if ($('.table-pg').text() == '') initPage(totalPages);
}

function initPage(totalPages) {
  $('.table-body .table-pg').twbsPagination({
    totalPages: totalPages || 1,
    onPageClick: function(event, page) {
      pageData.pageIndex = page - 1;
      initList(pageData);
    }
  })
  $('.date-picker').datepicker({
    rtl: App.isRTL(),
    orientation: 'right',
    autoclose: true
  });
}
