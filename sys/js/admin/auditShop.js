let _id;
let _listshop;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {
  
  initList();
  $('body').on('click', '.audit-shop', doAudit);
  $('body').on('click', '.shop-name', doShowDetail);
}

function initList(param = pageData) {
  TmplData(TMPL_ADMIN_SHOP_LIST, [URL_ADMIN_ALL_SHOP, encodeQuery(param)].join('?'), null, cbListShop)
}

function cbListShop(r, e) {
  let data = e[0];
  if (data.code == 0) {
    _listshop = e[0].data;
    data.imgPrefix = IMG_PREFIX;
    Object.assign(data, pageData);
    totalPages = Math.ceil(data.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body .table-data").append($.templates(r[0]).render(data, rdHelper));
    $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
    if ($('.table-pg').text() == '') initPage(totalPages);

  } else if (e.code == -1) {
    relogin();
  } else if (e.code == 99) {
    notifyInfo(e.message);
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
        approve: ($(e.currentTarget).data('type')=='pass')?1:2,
        reason: ret
      }
      promiseData('POST',URL_ADMIN_SHOP_AUDIT,JSON.stringify(obj), cbAudit)
    }; 
  }); 
}

function cbAudit(e) {
  if (e.code == 0) {
    initList()
  } else if (e.code == -1) {
    relogin();
  } else if (e.code == 99) {
    notifyInfo(e.message);
  } 
}

function doShowDetail() {
  let index = $(this).data('index');
  $('#shop-url').val(_listshop[index].shopurl);
  $('#shop-addr').val(_listshop[index].address);
}
