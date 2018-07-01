let _id;
let pageData = Object.assign({}, PAGE_DATA);
let appealtype=getUrlParam("appealtype");
$(init);

function init() {
  initList(pageData);
  $('body').on('click', '.detail-task', doDetail);
  $('body').on('click', '.m-close', doClose);
}

function initList() {
  let param = Object.assign(pageData, {type:appealtype});
  promiseTmpl('GET', '/tmpl/admin/defriendlog.tmpl', ['/admin/get_black_buyers', encodeQuery(param)].join('?'),null, cbList)
}


function cbList(r, e) {
  let ret = e;
  _listtask = ret.data;
  ret.imgPrefix = IMG_PREFIX;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/pageData.pageSize);
  $(".portlet-body .table").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, rdHelper));
  if ($('.table-pg').text() == '') initPage(totalPages);

  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
}






function initPage(totalPages) {
  $('.portlet-body .table-pg').twbsPagination({
    totalPages: totalPages || 1,
    onPageClick: function(event, page) {
      pageData.pageIndex = page - 1;
    }
  })
}


function doClose() {
  $('.g-detail').hide()
}