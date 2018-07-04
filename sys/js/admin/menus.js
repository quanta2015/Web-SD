let _id;
let pageData = Object.assign({}, PAGE_DATA);
$(init);

function init() {
  initList(pageData);
  $('body').on('click','.detail-role',doMenuDetail);
  $('body').on('click','.add-menu',doAddMenu);
}

function initList() {
  let param = Object.assign(pageData);
  promiseTmpl('GET', '/tmpl/admin/menu_list.tmpl', ['/permission/menu/get_menus', encodeQuery(param)].join('?'),null, cbList)
}

function doAddMenu(){
	alert($(this).data("id"));
}

function doMenuDetail(){
	
}


function cbList(r, e) {
  let ret = e;
  _listtask = ret.data;
  ret.imgPrefix = IMG_PREFIX;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/pageData.pageSize);
  $(".portlet-body .panel").remove();
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