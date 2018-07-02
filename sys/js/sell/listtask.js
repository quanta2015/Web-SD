let _listtask;
let _id;
var _shop = {};
let pageData; 

$(init);

function init() {
  type = getUrlParam('type');
  pageData =  Object.assign({mainType: type}, PAGE_DATA);
  (type==='pay')?$('.u-task-title').text('垫付'):$('.u-task-title').text('浏览');

  initTime();
  initShops();
  initList(pageData);

  $('#shop-name').on('change', doChangeShop);

  $('body').on('click', '.pay-task', doPayTask);
  $('body').on('click', '.del-task', doDelTask);
  $('body').on('click', '.mag-task', doMagTask);
  $('body').on('click', '.search-task', doSearch);
  $('body').on('click', '.detail-task', doDetailTask);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click', '.republish-task', doRepublish);
  $('body').on('click', '.pay-detail', doPayDetail);
  $('body').on('click', '.end-task', doEndTask);
}


function doEndTask(e) {
  msgbox('温馨提示', '<span class="font-red">确认结束此任务？请核对清楚！</span>','取消','确认', 
    (ret)=>{
      if (!ret) {
        var obj = { taskId: $(this).data('id') }
        promise('GET',['/task/end_task/', encodeQuery(obj)].join('?') ,null, cbEndTask, null)
      }
  })  
}

function cbEndTask(e) {
  notifyInfo('结束任务成功！')
  doSearch()
}


function doPayDetail(e) {
    pid = $(this).attr('id');
    promise('GET','/task/task_detail/'+pid, null, cbPayDetail, null)
}


function cbPayDetail(e) {
  let obj = formatCost(e.taskMoneys)
  obj.type = type
  renderTmpl(TMPL_SELL_TASK_COST, obj).then(ret => {
    $(".g-detail").empty();
    $(".g-detail").append(ret);
    $(".g-detail").height( $("body").height() )
    $(".g-detail").show();
    $(".g-detail").height( $(document).height() );
  })
}


function doRepublish(e) {
  id = $(e.currentTarget).data('id');
  goto('createTask.html?id='+id)
}




function doDetailTask(e) {
  id = $(e.currentTarget).data('id')
  promiseTmpl('GET', '/tmpl/admin/detail_task.tmpl','/task/task_detail/'+ id, null, cbDetail)
}

function doClose() {
  $('.g-detail').hide()
}

function cbDetail(r, e) {
  let ret = e;
  $(".g-detail").empty();
  ret.data.imgPrefix = IMG_PREFIX;
  ret.data.type = type
  $(".g-detail").append($.templates(r).render(ret.data, rdHelper));
  $(".g-detail").show()
  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
}


function doChangeShop(e) {
  shopname = $(e.currentTarget).find("option:selected").text();
  $("#platform").find("option[value=" + _shop[shopname] +"]").attr("selected",true);
}

function initTime() {
  let from =  moment().subtract('days',7).format('YYYY-MM-DD') + ' 00:00';
  let to = moment().format('YYYY-MM-DD') + ' 23:59'
  $("#task-from").datetimepicker({ value: from, format:'Y-m-d H:i'});
  $("#task-to").datetimepicker({value: to, format:'Y-m-d H:i'});
}

function initShops() {
  promise('GET', URL_TASK_ALL_PLATFORM, null, cbShops, null);
}

function cbShops(e) {
  for(i=0; i< e.length; i++) {
    for(j=0; j< e[i].shops.length; j++) {
      _shop[e[i].shops[j].name] = e[i].platform;
      let val = e[i].shops[j].name;
      let sid = e[i].shops[j].id;
      let cnt = $.format('<option value="{0}">{1}</option>', sid, val )
      $("#shop-name").append(cnt)
    }
  }
}

function doSearch() {
  $('.portlet-body .table-pg').remove();
  $('.portlet-body').append('<div class="table-pg"></div>');
  initList(pageData)
}


function initList(pg) {
  let cdt = {
    shopId: $("#shop-name").val(),
    publishtime_s: $("#task-from").val() + ':00',
    publishtime_e: $("#task-to").val()+ ':00',
    shopType: $("#platform").val(),
    taskType: $("#task-type").val(),
    status: $("#task-status").val(),
    taskId: $("#task-id").val()
  }
  param = Object.assign(cdt, pg);
  promiseTmpl('GET', TMPL_SELL_TASK_LIST, [URL_SELL_LIST_TASK, encodeQuery(param)].join('?'), null, cbListTask)
}


function doDelTask(e) {
  let id = $(e.target).attr('id');
  promise('DELETE', URL_SELL_DEL_TASK + id, null, cbDelTask);
}

function doMagTask(e) {
  let id = $(this).attr('id');
  location.href = 'listTaskItem.html?id=' + id
}

function doPayTask() {
  let id = $(this).attr('id');
  promise('GET', URL_SELL_PAY_TASK + id, null, cbPayTask, cbPayErr);
}

function cbPayTask(e) {
  notifyInfo(MSG_TASK_PUB_SUCC);
  initList(pageData);
}

function cbPayErr(e) {
  msgbox('提示信息',e.message,MSG_WAIT,MSG_RECHARGE, cbRecharge)
}

function cbListTask(r,ret) {
  _listtask = ret.data;
  Object.assign(ret, pageData);
  ret.data = ret.data.map(v => {
    v.statusName = STATUS_MAP[v.status];
    return v;
  });
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


function cbDelTask(e) {
  notifyInfo(MSG_TASK_DEL_SUCC);
  initList(pageData);
}

function cbRecharge(ret) {
  if (!ret) {
    goto('rechargeTask.html')
  }
}

