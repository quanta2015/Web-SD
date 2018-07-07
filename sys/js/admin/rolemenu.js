let _id;
let pageData = Object.assign({}, PAGE_DATA);
let _roleMenuList;
$(init);
function init() {
  _id = getUrlParam('id');
  let obj={
		  roleId:_id
  }
  promiseTmpl('GET','',['/permission/menu/get_menus',encodeQuery(obj)].join('?'), null, cbRoleMenu);
  initList(pageData);
  $('body').on('click','.detail-role-menu',roleMenuDetail);
  $('body').on('click','.save-role-menu',saveRoleMenu);
  $('body').on('click','.gotopage',gotopage);
}

function initList() {
  let param = Object.assign(pageData);
  promiseTmpl('GET', '/tmpl/admin/rolemenu.tmpl', ['/permission/menu/get_menus', encodeQuery(param)].join('?'),null, cbList)
}

function cbRoleMenu(r, e){
	_roleMenuList=e.data;	
}

function roleMenuDetail(){
	var obj = {
		    id: $(this).data('id')
		 };
	location.href = ['rolemenu.html', encodeQuery(obj)].join('?')
}

function saveRoleMenu(){
	let menuIds="";
	$("[_id]").each(function(){
		if($(this).prop("checked")){
			menuIds+=$(this).attr("_id")+",";
		}
	})
	var obj={
		roleId:_id,
		menuIds:menuIds
	}
	promiseTmpl('GET','',['/permission/role/save_role_menu',encodeQuery(obj)].join('?'), null, cbSaveSuccess);
}

function cbSaveSuccess(){
	alertBox('绑定成功',gotopage);
}

function gotopage(){
	location.href="rolelist.html"
}


function cbList(r, e) {
  let ret = e;
  _listtask = ret.data;
  ret.imgPrefix = IMG_PREFIX;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/pageData.pageSize);
  $(".portlet-body .card-columns").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, rdHelper));
  $("[_id]").each(function(i){
	  for(var i=0;i<_roleMenuList.length;i++){
		  if($(this).attr("_id")==_roleMenuList[i].id){
			  $(this).prop("checked",true);
			  break;
		  }else{
			  for(var j=0;j<_roleMenuList[i].secondMenu.length;j++){
				  if($(this).attr("_id")==_roleMenuList[i].secondMenu[j].id){
					  $(this).prop("checked",true);
					  break;
				  }
			  }
		  }
	  }
  })
  
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