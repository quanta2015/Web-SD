let pageData;
$(init);

function init() {
  // type = getUrlParam('type');
  pageData =  Object.assign({mainType:''}, PAGE_DATA);
  $("#sr-status option[value='0']").prop("selected", true);

  initTime();
  initList();

}

function initList() {
  let param = {
    status: $('#sr-status').val(),
    sdate: $("#sr-time-from").val() + ' 00:00:00',
    edate: $("#sr-time-to").val() + ' 23:59:00',

  };
  Object.assign(param, pageData);
  promiseTmpl('GET', '/tmpl/admin/list_withdraw', ['/admin/buyer_withdraw_list', encodeQuery(param)].join('?'), null, cbListTask)
}



function cbListTask(r, e) {
  let ret = e;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
  $(".portlet-body .table").remove();
  $(".portlet-body .table-data").append($.templates(r).render(ret, rdHelper));
  if ($('.table-pg').text() == '') initPage(totalPages);
}

function initPage(totalPages) {
  $('.portlet-body .table-pg').twbsPagination({
    totalPages: totalPages || 1,
    onPageClick: function(event, page) {
      pageData.pageIndex = page - 1;
      initList();
    }
  })
}


function initTime() {
  let from =  moment().subtract('days',7).format('YYYY-MM-DD');
  let to = moment().format('YYYY-MM-DD');
  $("#sr-time-from").datetimepicker({ value: from, format:'Y-m-d', timepicker:false});
  $("#sr-time-to").datetimepicker({value: to, format:'Y-m-d', timepicker:false});
}

