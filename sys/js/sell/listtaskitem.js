var _id;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {
  _id = getUrlParam('id')

  initList(pageData);
  $('body').on('click', '.return-list', doReturnList);
  $('body').on('click', '.sub-goods', doSubmitGoods);
  $('body').on('click', '.pay-task', doPayTask);
}

function initList(param) {
  Object.assign( param, { taskId: _id });
  promiseTmpl('GET', TMPL_SELL_TASKITEM_LIST, [URL_SELL_ACCEPT_LIST, encodeQuery(param)].join('?'), null, cbListTask)
}

function doReturnList() {
  location.href = 'listTask.html'
}

function doSubmitGoods(e) {
  var obj = {
    id: $(this).attr('id'),
    tid: $(this).attr('tid'),
    pid: $(this).attr('pid')
  }
  location.href = ['submitGoods.html', encodeQuery(obj)].join('?')
}


function doPayTask(e) {
  var obj = {
    id: $(this).attr('id'),
    tid: $(this).attr('tid'),
    pid: $(this).attr('pid')
  }
  location.href = ['payTask.html', encodeQuery(obj)].join('?')
}


function caluPG(ret) {
  for(i=0; i< ret.length; i++) {
    switch(ret[i].status) {
      case 0: ret[i].percent = 0;break;
      case 10: ret[i].percent = 20;break;
      case 20: ret[i].percent = 40;break;
      case 30: ret[i].percent = 60;break;
      case 40: ret[i].percent = 80;break;
      case 70: ret[i].percent = 100;break;
      default: ret[i].percent = 0;break;
    }
  }
}

function cbListTask(r,e) {
  let ret = e;
  Object.assign(ret, pageData);
  caluPG(ret.data);
  totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
  $(".portlet-body .table").remove();
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
