let pageData = Object.assign({}, PAGE_DATA);
$(init);

function init() {
  initTime();
  initList(pageData);
}

function initTime() {
  let from =  moment().subtract('days',7).format('YYYY-MM-DD') + ' 00:00';
  let to = moment().format('YYYY-MM-DD') + ' 23:59'
  $("#from").datetimepicker({ value: from, format:'Y-m-d H:i'});
  $("#to").datetimepicker({value: to, format:'Y-m-d H:i'});
}

function initList(pg) {
  let obj ={
    sdate:$('#from').val()+':00',
    edate:$('#to').val()+':00',
    shopName:$('#shop-name').val(),
    taskId:$('#task-id').val()
  }
  Object.assign(obj,pg);
  promiseTmpl('GET', TMPL_SELL_COMMISSION_LIST, ['/task/get_service_money_all', encodeQuery(obj)].join('?'), null, cbList)
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
