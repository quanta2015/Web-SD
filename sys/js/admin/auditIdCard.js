let _id;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {
  initList();
  $('body').on('click', '.audit-task', doAuditIdCard);
}

function initList(param = pageData) {
  TmplData(TMPL_ADMIN_IDCARD_LIST, [URL_ADMIN_ALL_IDCARD, encodeQuery(param)].join('?'), null, cbListIdCard)
}

function cbListIdCard(r, e) {
  let data = e[0];
  if (data.code == 0) {
    data.imgPrefix = IMG_PREFIX;
    Object.assign(data, pageData);
    totalPages = Math.ceil(data.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(data, null));
    $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
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
      initList(pageData);
    }
  })
}

function doAuditIdCard(e) {
  var sid = $(this).data('id')
  var type = $(this).data('type')
  var obj = {
    id: sid,
    approve: (type=='pass')?AUDIT_PASS:AUDIT_FAIL,
    reason: (type=='pass')?'数据正确！':'数据有误!'
  }

  promiseData('POST',URL_ADMIN_IDCARD_AUDIT,JSON.stringify(obj), cbAuditIdCard)
}

function cbAuditIdCard(e) {
  if (e.code == 0) {
    initList()
  } else if (e.code == -1) {
    relogin();
  }
}
