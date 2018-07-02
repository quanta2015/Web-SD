let _id;
let _listtask;
let pageData;
let tasktype;
let typeicon;
let type;

$(init);

function init() {

  type = getUrlParam('type');
  pageData =  Object.assign({mainType: type}, PAGE_DATA);

  tasktype = getUrlParam('tasktype')
  if (tasktype == 1) {
    typeicon = HOST + '/img/taobao.png'
  }else{
    typeicon = HOST + '/img/jingdong.png'
  }
  console.log(tasktype);

  // $('#task-capacity').text(cookie('remainderNumberOfMonth'))

  initList(pageData);
  $('body').on('click', '.audit-task', doDetail);
}

function initList(obj) {
  (tasktype == 1)? pl = '淘宝':pl='京东';
  param = Object.assign(obj, {platform: pl });
  promiseTmpl('GET', TMPL_BUY_ALL_TASK, [URL_BUYER_ALL_TASK, encodeQuery(param)].join('?'),null, cbList)
}

function cbList(r, e) {
  let ret = e;
  _listtask = ret.data;
  Object.assign(ret, pageData);
  Object.assign(ret, {typeicon: typeicon, type:type });
  totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
  $(".portlet-body .u-wrap").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, rdHelper));
  if ($('.table-pg').text() == '') initPage(totalPages);
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

function doDetail() {
  id = $(this).data('kid');
  location.href = `detailTask.html?id=${id}&type=${type}`;
}

