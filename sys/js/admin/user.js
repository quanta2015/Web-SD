let _id;
let pageData = Object.assign({}, PAGE_DATA);
let userId;
let userType=1;
$(init);

function init() {
  initList(pageData);

  $('body').on('click', '.set-role', setRole);
  $('body').on('click', '#btn-search', initList);

  $('body').on('click','#submit-role',roleEdit);

  $('body').on('click', '.btn-create-user', doCreateUser);
  $('body').on('click', '#submit-role-set', saveRoleSet);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click', '.b-close', doClose);

  $('body').on('click','.delete-role',deleteRole);
}

function doCreateUser() {
	$.ajax('/tmpl/admin/create_user.tmpl').then((e)=>{
		console.log(e)
		$('.g-detail').empty();
		$('.g-detail').append(e);
		$('.g-detail').show();
	})
	// $(".g-detail .m-detail-wrap").remove();
	// promiseTmpl('GET', '/tmpl/admin/create_user.tmpl', null,null, (e)=>{
	// 	console.log(e)
	// })
}



function deleteRole(){
	promise('DELETE', '/permission/user/del_admin_user/'+$(this).data("id") , null, cbDelete);
}

function cbDelete(){
	alertBox('删除成功',gotoPage);
}



function roleEdit(){
	let data={
			userName:$("#userName").val(),
			password:$("#password").val(),
	};
	promise('post', '/permission/user/add_admin_user' , JSON.stringify(data), createSubmitEval, null);
}

function createSubmitEval(){
	alertBox('创建用户成功',gotoPage);
}

function addAdminUser() {
  let param = Object.assign(pageData,{userType: 1});
  promise('POST', URL_ADD_ADMIN_USER, JSON.stringify(obj), cbAudit, null);
}

function initList() {
  let param = Object.assign(pageData,{userType: 1});
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
	 promiseTmpl('GET', '/tmpl/admin/user_rights.tmpl', ['/permission/role/get_roles', encodeQuery(param)].join('?'),null, cdRoleList)
}

function cdRoleList(r,e){
	let ret = e;
	ret.imgPrefix = IMG_PREFIX;
	Object.assign(ret, pageData);
	totalPages = Math.ceil(ret.total/pageData.pageSize);
	$(".g-detail .m-detail-wrap").remove();
	$(".g-detail").prepend($.templates(r).render(ret, rdHelper));
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