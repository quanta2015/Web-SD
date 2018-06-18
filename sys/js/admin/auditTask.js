let _id;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {
  initTime();
  initList();
  $('body').on('click', '.audit-task', doAuditTask);
  $('body').on('click', '.detail-task', doDetailTask);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click', '#btn-search', doSearch);
}

function initList() {
  let param = {
    approveStatus: $('#sr-status').val(),
    shopName: $('#sr-shopname').val(),
    goodsName: $('#sr-goodsname').val(),
    taskId: $('#sr-taskid').val(),
    sdate: $("#sr-time-from").val() + ' 00:00:00',
    edate: $("#sr-time-to").val() + ' 23:59:00',
  };
  Object.assign(param, pageData);
  promiseTmpl('GET', TMPL_ADMIN_TASK_LIST, [URL_ADMIN_ALL_TASK, encodeQuery(param)].join('?'), null, cbListTask)
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

function doDetailTask(e) {
  id = $(e.currentTarget).data('id')
  promiseTmpl('GET', '/tmpl/admin/detail_task.tmpl','/task/task_detail/'+ id, null, cbDetail)
}

function cbDetail(r, e) {
  let ret = e;
  $(".g-detail").empty();
  ret.data.imgPrefix = IMG_PREFIX;
  $(".g-detail").append($.templates(r).render(ret.data, rdHelper));
  $(".g-detail").show()
}

function doAuditTask(e) {
  bootbox.prompt(MSG_INPUT_AUDIT_INFO, function(ret){ 
    if( ret !== null) {
      var obj = {
        id: sid = $(e.currentTarget).data('id'),
        approve: ($(e.currentTarget).data('type')=='pass')?1:2,
        reason: ret
      }
      promise('POST',URL_ADMIN_TASK_AUDIT,JSON.stringify(obj), cbAuditTask, null)
    }; 
  }); 
}

function cbAuditTask(e) {
  initList()
}

function doClose() {
  $('.g-detail').hide()
}

function initTime() {
  let from =  moment().subtract('days',7).format('YYYY-MM-DD');
  let to = moment().format('YYYY-MM-DD');
  $("#sr-time-from").datetimepicker({ value: from, format:'Y-m-d', timepicker:false});
  $("#sr-time-to").datetimepicker({value: to, format:'Y-m-d', timepicker:false});
}

function doSearch() {
  $('.portlet-body .table-pg').remove();
  $('.portlet-body').append('<div class="table-pg"></div>');
  initList();
}