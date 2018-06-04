let _listtask;
let _id;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {

  $("#fromdate").datepicker({
        dateFormat: "yy-mm-dd",
        defaultData: '-12M'
    });
    $("#todate").datepicker({
        dateFormat: "yy-mm-dd"
    });

  initList();
  $('body').on('click', '.pay-task', doPayTask);
  $('body').on('click', '.del-task', doDelTask);
  $('body').on('click', '.mag-task', doMagTask);
}

function initList(param = pageData) {
  let id = parseInt(cookie('id'));
  TmplData(TMPL_SELL_TASK_LIST, [URL_SELL_ALL_TASK, encodeQuery(param)].join('?'), null, cbListTask)
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
    initList();
  } else if (e.code == -1) {
    relogin();
  } else if (e.code == 99){
    notifyInfo(MSG_PUBLISH_FAILED);
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
    initList();
  } else if (e.code == -1) {
    relogin();
  } else if (e.code == 99){
    notifyInfo(MSG_DEL_FAILED);
  }
}
