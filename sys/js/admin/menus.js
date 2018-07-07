let _id;
let pageData = Object.assign({}, PAGE_DATA);
$(init);

function init() {
  initList(pageData);
  $('body').on('click','.detail-role',doMenuDetail);
  $('body').on('click','.add-menu',doAddMenu);
  $('body').on('click','.do-menu-one',doAddMenu);
  $('body').on('click','.del-menu',doDelMenu);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click', '.b-close', doClose);
  $('body').on('click','#submit-menu',submitMenu);
}

function initList() {
  let param = Object.assign(pageData);
  promiseTmpl('GET', '/tmpl/admin/menu_list.tmpl', ['/permission/menu/get_menus', encodeQuery(param)].join('?'),null, cbList)
}

function doAddMenu(){
	  $(".g-detail .m-detail-wrap").remove();
	  $(".g-detail").prepend($("#coverTmpl").render());
	  if($(this).data("type")==2){
		  $("#parentId").val($(this).data("id"));
		  $("#parentName").val($(this).data("name"));
	  }else{
		  $("#level").val("1");
	  }
	  $(".g-detail").show();
}

function submitMenu(){
	let data={
			name:$("#name").val(),
			level:$("#level").val(),
			path:$("#path").val(),
			parentId:$("#parentId").val()
			
	};
	promise('post', '/permission/menu/save_menu' , JSON.stringify(data), cbSubmitEval, null);
}

function doDelMenu(){
	promise('DELETE', '/permission/menu/del_menu/'+$(this).data("id") , null, cbDelete);
}

function cbSubmitEval(){
	alertBox('创建成功',gotoPage);
}

function cbDelete(){
	alertBox('删除成功',gotoPage);
}

function doMenuDetail(){
	
}

function gotoPage(){
	location.href="menulist.html";
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