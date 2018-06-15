let _id;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {
  initList();
  $('body').on('click', '.audit-task', doAudit);
}

function initList(param = pageData) {
  tmplPormise('GET', TMPL_ADMIN_IDCARD_LIST, [URL_ADMIN_ALL_IDCARD, encodeQuery(param)].join('?'), null, cbListIdCard)
}

function cbListIdCard(r, e) {
  let ret = e;
  ret.imgPrefix = IMG_PREFIX;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
  $(".portlet-body .table").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, null));
  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
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
      promise('POST',URL_ADMIN_IDCARD_AUDIT,JSON.stringify(obj), cbAudit)
    }; 
  }); 
}

function cbAudit(e) {
  initList()
}
