
let pageData = Object.assign({}, PAGE_DATA);

/*const TMPL_ADMIN_QQ_LIST='/tmpl/admin/list_qq.tmpl'
const URL_ADMIN_QQ_LIST='/admin/buyer_qq_list'
const URL_ADMIN_AUDITQQ='/admin/buyer_qq_approve'*/

$(init);

function init() {
  initList();
  $('body').on('click', '.audit-qq', doAudit);
}

function initList(param = pageData) {
  tmplPormise('GET', TMPL_ADMIN_QQ_LIST, [URL_ADMIN_QQ_LIST, encodeQuery(param)].join('?'), null, cbListQQ)
}

function cbListQQ(r, e) {
  let ret = e;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
  $(".portlet-body .table").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, null));
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
