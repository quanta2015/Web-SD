let _id;
let pageData = Object.assign({}, PAGE_DATA);
// pageData.pageSize= 1
$(init);

function init() {
  initList();
  $('body').on('click', '.commit-task', doCommit);
  $('body').on('click', '.cancel-task', doCancelTask);
}

function initList(param = pageData) {
  TmplData(TMPL_BUY_ALL_ORDER, [URL_BUYER_ALL_ORDER, encodeQuery(param)].join('?'),null, cbList)
}

function cbList(r, e) {
  let ret = e[0];
  if (ret.code == 0) {
    _listtask = ret.data;
    Object.assign(ret, pageData);
    totalPages = Math.ceil(ret.total/pageData.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(ret, rdHelper));
    if ($('.table-pg').text() == '') initPage(totalPages);
  } else if (e[0].code == 99) {
    notifyInfo(e.message);
  } else if (e[0].code == -1) {
    relogin();
  }
}

function doCommit() {
  var obj = {
    id: $(this).data("id"),
    tid: $(this).data("tid")
  }
  location.href = ['submitOrder.html', encodeQuery(obj)].join('?') 
}

function doCancelTask() {
  var obj = {
    buyerTaskId: $(this).data('id')
  }
  promiseData('GET',[URL_BUY_CANCEL_TASK, encodeQuery(obj)].join('?') ,null, cbCancelTask)
}

function cbCancelTask(e)  {
  if (e.code == 0) {
    notifyInfo('退单成功！');
    initList()
  } else if (e.code == 99) {
    notifyInfo(e.message);
  } else if (e.code == -1) {
    relogin();
  }
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
