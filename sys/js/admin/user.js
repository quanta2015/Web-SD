let _id;
let pageData = Object.assign({}, PAGE_DATA);
let userId;
let userType=1;
$(init);

function init() {
  initList(pageData);

  $('body').on('click', '.btn-render', doRenderAdd);
  $('body').on('click','.btn-adduser',doSave);
  $('body').on('click', '.btn-render-rights', doRenderRights);
  $('body').on('click', '.btn-bindrights', doSaveRights);
  $('body').on('click', '.u-close', doClose);
  $('body').on('click','.delete-user',doDelete);
}

function initList() {
  let param = Object.assign(pageData,{userType: 1});
  promiseTmpl('GET', '/tmpl/admin/list_user.tmpl', ['/permission/user/get_users', encodeQuery(param)].join('?'),null, cbList)
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

function doRenderAdd() {
    $.ajax('/tmpl/admin/create_user.tmpl').then((e)=>{
        console.log(e)
        $('.g-detail').empty();
        $('.g-detail').append(e);
        $('.g-detail').show();
    })
}

function doSave(){
    let data={
        userName:$("#userName").val(),
        password:$("#password").val(),
    };
    promise('post', '/permission/user/add_admin_user' , JSON.stringify(data), cbSave, null);
}

function cbSave(){
  $('.g-detail').hide();
  alertBox('创建用户成功',refresh);
}


function doRenderRights(){
     userId=$(this).data('id');
     let param = Object.assign(pageData);
     promiseTmpl('GET', '/tmpl/admin/user_rights.tmpl', ['/permission/role/get_roles', encodeQuery(param)].join('?'),null, cbRoleList)
}

function cbRoleList(r,e){
  let ret = e;
  ret.imgPrefix = IMG_PREFIX;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/pageData.pageSize);
  $(".g-detail .m-detail-wrap").remove();
  $(".g-detail").prepend($.templates(r).render(ret, rdHelper));
  $(".g-detail").show();
}

function doDelete(){
	promise('DELETE', '/permission/user/del_admin_user/'+$(this).data("id") , null, cbDelete);
}

function cbDelete(){
  $('.g-detail').hide();
	alertBox('删除成功',refresh);
}

function doSaveRights(){
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
	promiseTmpl('GET','',['/permission/user/save_user_role',encodeQuery(data)].join('?'), null, cbSaveRights);
}

function cbSaveRights(){
  $('.g-detail').hide();
	alertBox('绑定用户权限成功！',refresh);
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

function refresh() {
  initList(pageData);
}


function doClose() {
  $(".g-detail").hide();
}