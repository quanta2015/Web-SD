let _listtask;
let _id;
var _shop = {};
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {
  initTime();
  initShops();
  initList(pageData);

  $('#shop-name').on('change', doChangeShop);

  $('body').on('click', '.pay-task', doPayTask);
  $('body').on('click', '.del-task', doDelTask);
  $('body').on('click', '.mag-task', doMagTask);
  $('body').on('click', '.search-task', doSearch);
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
  promiseData('GET', URL_TASK_ALL_PLATFORM, null, cbShops);
}

function cbShops(e) {
  if (e.code == 0) {
    for(i=0; i< e.data.length; i++) {
      for(j=0; j< e.data[i].shops.length; j++) {
        _shop[e.data[i].shops[j].name] = e.data[i].platform;
        let val = e.data[i].shops[j].name;
        let sid = e.data[i].shops[j].id;
        let cnt = $.format('<option value="{0}">{1}</option>', sid, val )
        $("#shop-name").append(cnt)
      }
    }
  } else if (e.code == -1) {
    relogin();
  } else if (e.code == 99){
    notifyInfo(MSG_DEL_FAILED);
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
  TmplData(TMPL_SELL_TASK_LIST, [URL_SELL_LIST_TASK, encodeQuery(param)].join('?'), null, cbListTask)
}


function doDelTask(e) {
  let id = $(e.target).attr('id');
  promiseData('DELETE', URL_SELL_DEL_TASK + id, null, cbDelTask);
}

function doMagTask(e) {
  let id = $(this).attr('id');
  location.href = 'listTaskItem.html?id=' + id
}

function doPayTask() {
  let id = $(this).attr('id');
  promiseData('GET', URL_SELL_PAY_TASK + id, null, cbPayTask);
}

function cbPayTask(e) {
  if (e.code == 0) {
    notifyInfo(MSG_TASK_PUB_SUCC);
    initList();
  } else if (e.code == -1) {
    relogin();
  } else if (e.code == 99){

    // notifyInfo(e.message);
     msgbox(e.message,MSG_WAIT,MSG_RECHARGE, cbRecharge)
  }
}

function cbListTask(r,e) {
  let ret = e[0];
  if (ret.code == 0) {
    _listtask = ret.data;
    Object.assign(ret, pageData);
    ret.data = ret.data.map(v => {
      v.statusName = STATUS_MAP[v.status];
      return v;
    });
    totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(ret, rdHelper));
    if ($('.table-pg').text() == '') initPage(totalPages);
  } else if (e[0].code == -1) {
    relogin();
  } else if (e.code == 99){
    notifyInfo(e.message);
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


function cbDelTask(e) {
  if (e.code == 0) {
    notifyInfo(MSG_TASK_DEL_SUCC);
    initList();
  } else if (e.code == -1) {
    relogin();
  } else if (e.code == 99){
    notifyInfo(e.message);
  }
}

function cbRecharge(ret) {
  if (!ret) {
    goto('rechargeTask.html')
  }
}

