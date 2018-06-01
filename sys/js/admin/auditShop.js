let _id;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {
  initList();
  $('body').on('click', '.audit-shop', doAuditShop);
}

function initList(param = pageData) {
  TmplData(TMPL_ADMIN_SHOP_LIST, [URL_ADMIN_ALL_SHOP, encodeQuery(param)].join('?'), null, cbListShop)
}

function cbListShop(r, e) {
  let data = e[0];
  if (data.code == 0) {
    data.imgPrefix = IMG_PREFIX;
    Object.assign(data, pageData);
    totalPages = Math.ceil(data.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body .table-data").append($.templates(r[0]).render(data, rdHelper));
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

function doAuditShop(e) {
  var sid = $(this).data('id')
  var type = $(this).data('type')
  var obj = {
    id: sid,
    approve: (type=='pass')?1:2,
    reason: (type=='pass')?'数据正确！':'数据有误!'
  }

  promiseData('POST',URL_ADMIN_SHOP_AUDIT,JSON.stringify(obj), cbAuditShop)
}

function cbAuditShop(e) {
  if (e.code == 0) {
    initList()
  } else if (e.code == -1) {
    relogin();
  } else {
    errorInfo(e.message);
  }
}
