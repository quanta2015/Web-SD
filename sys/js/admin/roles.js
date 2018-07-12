let _id;
let pageData = Object.assign({}, PAGE_DATA);
$(init);

function init() {
  initList(pageData);
 
  $('body').on('click', '.btn-create-user', doCreateUser);
  $('body').on('click','.detail-role-menu',roleMenuDetail);
  $('body').on('click','.do-role-edit',doRoleEdit);
  $('body').on('click','#submit-role',roleEdit);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click', '.b-close', doClose);
  $('body').on('click','.delete-role',deleteRole);
}

function initList() {
  let param = Object.assign(pageData);
  promiseTmpl('GET', '/tmpl/admin/role_list.tmpl', ['/permission/role/get_roles', encodeQuery(param)].join('?'),null, cbList)
}

function doCreateUser() {
  $.ajax('/tmpl/admin/create_role.tmpl').then((e)=>{
    console.log(e)
    $('.g-detail').empty();
    $('.g-detail').append(e);
    $('.g-detail').show();
  })
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

function cbDelete(){
	alertBox('删除成功',gotoPage);
}

function doRoleEdit(){
  $(".g-detail .m-detail-wrap").remove();
  $(".g-detail").prepend($("#coverTmpl").render());
  $(".g-detail").show();
}

function roleEdit(){
	let data={
			name:$("#name").val(),
			description:$("#description").val(),
      sellPermission:checkBox('sel'),
      buyPermission:checkBox('buy'),
      finPermission:checkBox('fin'),
	};
	promise('post', '/permission/role/save_role' , JSON.stringify(data), cbSubmitEval, null);
}

function checkBox(id) {
  let arr = []
  $(`input[name="${id}"]:checked`).each( (i,e)=>{ 
    console.log(e); 

    if (typeof($(e).data('type')) == "undefined") {
      type = '';
    }else{
      type = $(e).data('type');
    }

    item = `${$(e).val()}:${$(e).attr('title')}:${type}`; 
    arr.push(item)
  })
  return arr.join(';')
}

function cbSubmitEval(){
	alertBox('创建角色成功并去授权',gotoPage);
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
	location.href="rolelist.html";
}


function doClose() {
  $('.g-detail').hide();
}