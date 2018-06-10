let pageData = Object.assign({}, PAGE_DATA);
$(init);

function init() {
  initTime();
  initList();
  $('body').on('click', '#btn-search', doSearch);
}

function initList() {
  let param = {
    status: $('#sr-status'),
    fromDate: $("#sr-time-from").val(),
    toDate: $("#sr-time-to").val(),
  };
  Object.assign(param, { transferType:1}, pageData);
  TmplData(TMPL_SELL_RECHARGE_LIST, [URL_SELL_ALL_RECHARGE, encodeQuery(param)].join('?'), null, cbList)
}

function initTime() {
  let from =  moment().subtract('days',7).format('YYYY-MM-DD');
  let to = moment().format('YYYY-MM-DD');
  $("#sr-time-from").datetimepicker({ value: from, format:'Y-m-d', timepicker:false});
  $("#sr-time-to").datetimepicker({value: to, format:'Y-m-d', timepicker:false});
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

function doSearch() {
  $('.portlet-body .table-pg').remove();
  $('.portlet-body').append('<div class="table-pg"></div>');
  initList();
}
