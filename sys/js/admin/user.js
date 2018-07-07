let _id;
let pageData = Object.assign({}, PAGE_DATA);
let userId;
let userType=1;
$(init);

function init() {
  initList(pageData);
  $('body').on('click','#btn-search',initList);
  $('body').on('click','.set-role',setRole);
  $('body').on('click','#submit-role-set',saveRoleSet);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click', '.b-close', doClose);
}

function initList() {
  userType=$("#userType").val();
  let param = Object.assign(pageData,{userType: userType});
  promiseTmpl('GET', '/tmpl/admin/user_list.tmpl', ['/permission/user/get_users', encodeQuery(param)].join('?'),null, cbList)
}

function roleMenuDetail(){
	var obj = {
		    id: $(this).data('id')
		  };
	location.href = ['rolemenu.html', encodeQuery(obj)].join('?')
}

function deleteRole(){
	promise('DELETE', '/permission/role/del_role/'+$(this).data("id") , null, cbDelete);
}

function setRole(){
	 userId=$(this).data('id');
	 let param = Object.assign(pageData);
	 promiseTmpl('GET', '', ['/permission/role/get_roles', encodeQuery(param)].join('?'),null, cdRoleList)
}

function cdRoleList(r,e){
	let ret = e;
	ret.imgPrefix = IMG_PREFIX;
	Object.assign(ret, pageData);
	totalPages = Math.ceil(ret.total/pageData.pageSize);
	$(".g-detail .m-detail-wrap").remove();
	$(".g-detail").prepend($("#coverTmpl").render(ret));
	$(".g-detail").show();
}

function cbDelete(){
	alertBox('删除成功',gotoPage);
}

function saveRoleSet(){
	let roleIds="";
	$("[_roleId]").each(function(){
		if($(this).prop("checked")){
			roleIds+=$(this).attr("_roleId")+",";
		}
	});
	let data={
			userType:userType,
			userId:userId,
			roleIds:roleIds
	};
	promiseTmpl('GET','',['/permission/user/save_user_role',encodeQuery(data)].join('?'), null, cbSubmitEval);
}

function cbSubmitEval(){
	alertBox('设置角色成功',gotoPage);
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

function gotoPage(){
	location.href="userlist.html";
}


function doClose() {
  $('.g-detail').hide();
}