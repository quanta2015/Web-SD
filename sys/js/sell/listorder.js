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
}

function doChangeShop(e) {
  shopname = $(e.currentTarget).find("option:selected").text();
  $("#platform").find("option[value=" + _shop[shopname] +"]").attr("selected",true);
}

function initTime() {
  let from =  moment().subtract('days',7).format('YYYY-MM-DD') + ' 00:00';
  let to = moment().format('YYYY-MM-DD') + ' 23:59'
  $("#task-from").datetimepicker({ value: from});
  $("#task-to").datetimepicker({value: to});
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

function initList(param) {
  Object.assign( param, { taskId: _id });
  TmplData(URL_SELL_LIST_ORDER, [URL_SELL_ACCEPT_LIST, encodeQuery(param)].join('?'), null, cbListTask)
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


