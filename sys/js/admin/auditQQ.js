
let pageData = Object.assign({}, PAGE_DATA);

/*const TMPL_ADMIN_QQ_LIST='/tmpl/admin/list_qq.tmpl'
const URL_ADMIN_QQ_LIST='/admin/buyer_qq_list'
const URL_ADMIN_AUDITQQ='/admin/buyer_qq_approve'*/

$(init);

function init() {
  initTime();
  initList();
  $('body').on('click', '.audit-qq', doAudit);
  $('body').on('click', '#btn-search', doSearch);
}

function initList() {
  let param = {
    approveStatus: $('#sr-status').val(),
    type: 2,
    searchKey: $('#sr-qq').val(),
    sdate: $("#sr-time-from").val() + ' 00:00:00',
    edate: $("#sr-time-to").val() + ' 23:59:00',
  };
  Object.assign(param, pageData);
  pormiseTmpl('GET', TMPL_ADMIN_QQ_LIST, [URL_ADMIN_QQ_LIST, encodeQuery(param)].join('?'), null, cbListQQ)
}

function cbListQQ(r, e) {
  let ret = e;
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
      initList();
    }
  })
}

function doAudit(e) {
  bootbox.prompt(MSG_INPUT_AUDIT_INFO, function(ret){ 
    if( ret !== null) {
      var obj = {
        id: sid = $(e.currentTarget).data('id'),
        approve: ($(e.currentTarget).data('type')=='pass')?AUDIT_PASS:AUDIT_FAIL,
        reason: ret
      }
      promise('POST',URL_ADMIN_AUDITQQ,JSON.stringify(obj), cbAudit)
    }; 
  }); 
}

function cbAudit(e) {
  initList()
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