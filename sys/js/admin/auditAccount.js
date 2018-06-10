let _id;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {
  initList();
  $('body').on('click', '.audit-task', doAudit);
}

function initList(param = pageData) {
  TmplData(TMPL_ADMIN_ACOUNT_LIST, [URL_ADMIN_ACOUNT_LIST, encodeQuery(param)].join('?'), null, cbList)
}

function cbList(r, e) {
  let data = e[0];
  if (data.code == 0) {
    data.imgPrefix = IMG_PREFIX;
    Object.assign(data, pageData);
    totalPages = Math.ceil(data.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(data, null));
    $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
    if ($('.table-pg').text() == '') initPage(totalPages);
  } else if (e.code == 99) {
    notifyInfo(e.message);
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

function doAudit(e) {
  bootbox.prompt(MSG_INPUT_AUDIT_INFO, function(ret){ 
    if( ret !== null) {
      var obj = {
        id: sid = $(e.currentTarget).data('id'),
        approve: ($(e.currentTarget).data('type')=='pass')?AUDIT_PASS:AUDIT_FAIL
      }
      promiseData('POST',URL_ADMIN_ACOUNT_AUDIT,JSON.stringify(obj), cbAudit)
    }; 
  }); 
}

function cbAudit(e) {
  if (e.code == 0) {
    initList()
  } else if (e.code == 99) {
    notifyInfo(e.message);
  } else if (e.code == -1) {
    relogin();
  }
}