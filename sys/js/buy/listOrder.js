let _id;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {

  status = getUrlParam('status')
  type = getUrlParam('type')
  console.log(type);

  initList(pageData);
  
  $('body').on('click', '.commit-task', doCommit);
  $('body').on('click', '.cancel-task', doCancelTask);
  $('body').on('click', '.evaluate-task', doEvalTask);
  $('body').on('click', '.detail-task', doDetail);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click','.complain-task',doComplainTask);
  $('body').on('click','.order-money',doOrderMoney);
}

function doOrderMoney() {
  
  var obj = {
    id: $(this).data("id")
  }
  promise('POST','/buyertask/press_money', JSON.stringify(obj), cbOrderMoney, null)
}

function cbOrderMoney(e) {
  notifyInfo('催款成功！请等待商家返款！');
}

function initList() {
  let param = Object.assign(pageData, {status: status});
  promiseTmpl('GET', TMPL_BUY_ALL_ORDER, [URL_BUYER_ALL_ORDER, encodeQuery(param)].join('?'),null, cbList)
}


function cbList(r, e) {
  let ret = e;
  _listtask = ret.data;
  // ret.data[0].complainStatus = 1;
  ret.imgPrefix = IMG_PREFIX;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/pageData.pageSize);
  $(".portlet-body .u-wrap").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, rdHelper));
  if ($('.table-pg').text() == '') initPage(totalPages);

  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
}

function doCommit() {
  var obj = {
    id: $(this).data("id"),
    tid: $(this).data("tid"),
    type: $(this).data("type")
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
  id = $(this).data('id')
  url = '/buyertask/buyer_task/'+ id
  promiseTmpl('GET', TMPL_BUY_TASK_DETAIL, url ,null, cbDetail)
}

function doComplainTask(e){
	var obj = {
    id: $(this).data('id'),
    tid: $(this).data('tid'),
    type: 'buy'
  };
  location.href = ['/html/appealOrder.html', encodeQuery(obj)].join('?')
}

function cbDetail(r, e) {
  let ret = e;
  ret.data.imgPrefix = IMG_PREFIX;
  ret.data.type = type;
  $(".g-detail").empty();
  $(".g-detail").append($.templates(r).render(ret.data, rdHelper));
  // $("#ig-info").toggle("slide", { direction: "left" }, 200);
  showModel('.g-detail')
}

function doCancelTask() {

  msgbox('温馨提示', `请确认取消本任务？`,'取消','确认',(ret)=>{
    if (ret) return;

    var obj = {
      buyerTaskId: $(this).data('id')
    };
    promise('GET',[URL_BUY_CANCEL_TASK, encodeQuery(obj)].join('?') ,null, cbCancelTask, null)
    
  })
}

function cbCancelTask(e)  {
  notifyInfo('退单成功！');
  initList(pageData)
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


function doClose() {
  $('.g-detail').hide()
}