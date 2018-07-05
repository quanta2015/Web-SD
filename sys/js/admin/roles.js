let _id;
let pageData = Object.assign({}, PAGE_DATA);
$(init);

function init() {
  initList(pageData);
  $('body').on('click','.detail-role',roleDetail);
  $('body').on('click','.detail-role-menu',roleMenuDetail);
}

function initList() {
  let param = Object.assign(pageData);
  promiseTmpl('GET', '/tmpl/admin/role_list.tmpl', ['/permission/role/get_roles', encodeQuery(param)].join('?'),null, cbList)
}

function roleMenuDetail(){
	
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
  $('.g-detail').hide();
}