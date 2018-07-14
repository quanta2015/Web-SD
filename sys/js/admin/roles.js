let _id;
let pageData = Object.assign({}, PAGE_DATA);
$(init);

function init() {
  initList(pageData);


 
  $('body').on('click', '.btn-render', doRenderAdd);
  $('body').on('click','.btn-addrole',doSave);
  $('body').on('click', '.u-close', doClose);
  $('body').on('click','.delete-role',doDelete);
}

function initList() {
  let param = Object.assign(pageData);
  promiseTmpl('GET', '/tmpl/admin/list_role.tmpl', ['/permission/role/get_roles', encodeQuery(param)].join('?'),null, cbList)
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
  $.ajax('/tmpl/admin/create_role.tmpl').then((e)=>{
    $('.g-detail').empty();
    $('.g-detail').append(e);
    $('input').iCheck({
        checkboxClass: 'icheckbox_flat-red',  
        radioClass: 'iradio_flat-red'
    });
    $('.g-detail').show();
  })
}


function doSave(){
  let data={
      name:$("#name").val(),
      description:$("#description").val(),
      sellPermission:checkBox('sel'),
      buyPermission:checkBox('buy'),
      finPermission:checkBox('fin'),
  };
  promise('post', '/permission/role/save_role' , JSON.stringify(data), cbSave, null);
}

function cbSave(){
  $('.g-detail').hide();
  alertBox('创建角色成功并去授权',refresh);
}


function doDelete(){
	promise('DELETE', '/permission/role/del_role/'+$(this).data("id") , null, cbDelete);
}

function cbDelete(){
  $('.g-detail').hide();
	alertBox('删除成功',refresh);
}


function checkBox(id) {
  let arr = []
  $(`input[name="${id}"]:checked`).each( (i,e)=>{ 

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