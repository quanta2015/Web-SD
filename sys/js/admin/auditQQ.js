
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
    status: $('#sr-status'),
    toAccount: $('#sr-bankno'),
    fromDate: $("#sr-time-from").val(),
    toDate: $("#sr-time-to").val(),
  };
  Object.assign(param, pageData);
  TmplData(TMPL_ADMIN_QQ_LIST, [URL_ADMIN_QQ_LIST, encodeQuery(param)].join('?'), null, cbListQQ)
}

function cbListQQ(r, e) {
  let data = e[0];
  if (data.code == 0) {
    
    Object.assign(data, pageData);
    totalPages = Math.ceil(data.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(data, null));
    if ($('.table-pg').text() == '') initPage(totalPages);
  } else if (e.code == -1) {
    relogin();
  }
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
      promiseData('POST',URL_ADMIN_AUDITQQ,JSON.stringify(obj), cbAudit)
    }; 
  }); 
}

function cbAudit(e) {
  if (e.code == 0) {
    initList()
  } else if (e.code == -1) {
    relogin();
  }
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