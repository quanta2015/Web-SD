let _id;
let pageData = Object.assign({}, PAGE_DATA);
// pageData.pageSize= 1
$(init);

function init() {

  initList();
  $('body').on('click', '.commit-task', doCommit);
  $('body').on('click', '.cancel-task', doCancelTask);
  $('body').on('click', '.evaluate-task', doEvalTask);
  $('body').on('click', '.detail-task', doDetail);
}

function initList(param = pageData) {
  promiseTmpl('GET', TMPL_BUY_ALL_ORDER, [URL_BUYER_ALL_ORDER, encodeQuery(param)].join('?'),null, cbList)
}

function cbList(r, e) {
  let ret = e;
  _listtask = ret.data;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/pageData.pageSize);
  $(".portlet-body .table").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, rdHelper));
  if ($('.table-pg').text() == '') initPage(totalPages);
}

function doCommit() {
  var obj = {
    id: $(this).data("id"),
    tid: $(this).data("tid")
  }
  location.href = ['submitOrder.html', encodeQuery(obj)].join('?') 
}

function doEvalTask(e) {
  var obj = {
    id: $(this).data("id"),
    tid: $(this).data("tid")
  }
  location.href = ['evalOrder.html', encodeQuery(obj)].join('?') 
}


function doDetail() {
  
  if ($('#ig-info').hasClass('hide')) {
    var obj = { taskkeyid: $(this).data('tid') }
    promiseTmpl('GET', TMPL_BUY_TASK_DETAIL, [URL_BUY_TASKDETAIL, encodeQuery(obj)].join('?'),null, cbDetail)
  }else{
    $("#ig-info").empty();
    $("#ig-info").addClass("hide");
  }
}

function cbDetail(r, e) {
  let ret = e;
  ret.data.imgPrefix = IMG_PREFIX;
  $("#ig-info").append($.templates(r).render(ret.data, rdHelper));
  // $("#ig-info").toggle("slide", { direction: "left" }, 200);
  $("#ig-info").removeClass("hide");
}

function doCancelTask() {
  var obj = {
    buyerTaskId: $(this).data('id')
  }
  promise('GET',[URL_BUY_CANCEL_TASK, encodeQuery(obj)].join('?') ,null, cbCancelTask, null)
}

function cbCancelTask(e)  {
  notifyInfo('退单成功！');
  initList()
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
