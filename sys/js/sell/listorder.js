var _id;
var _shop = {};
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {
  _id = '201806021905000011'

  initTime();
  initShops()
  initList(pageData);
  
  $('#shop-name').on('change', doChangeShop);
  $('#search-order').on('click', doSearch);
  $('#batch-pay').on('click', null);
  $('#batch-cancel').on('click', null);
  $('#batch-send').on('click', null);
  $('#export').on('click', null);
}


function doSearch() {
  $('.portlet-body .table-pg').remove();
  $('.portlet-body').append('<div class="table-pg"></div>');
  initList(pageData)
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

function initList(pg) {
  let cdt = {
    shopId: $("#shop-name").val(),
    taskId: $("#task-id").val(),
    buyTaskId: $("#order-id").val(),
    buyerId: $("#buyer-id").val(),
    orderid: $("#taobao-id").val(),
    shopType: $("#platform").val(),
    taskType: $("#task-type").val(),
    buyTaskStatus: $("#task-status").val(),
    commentType: $("#comment-type").val(),
    acceptStart: $("#task-from").val() + ':00',
    acceptEnd: $("#task-to").val()+ ':00'
  }
  Object.assign( cdt, pg);
  TmplData(URL_SELL_LIST_ORDER, ['/task/task_accept_list_all', encodeQuery(cdt)].join('?'), null, cbListTask)
}


function cbListTask(r,e) {
  let ret = e[0];
  if (ret.code == 0) {
    Object.assign(ret, pageData);
    totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(ret, rdHelper));
    if ($('.table-pg').text() == '') initPage(totalPages);
  } else if (ret.code == 99) {
    notifyInfo(ret.message);
  } else if (ret.code == -1) {
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


