let _id;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {
  initList();
  $('body').on('click', '.audit-task', doAuditTask);
  $('body').on('click', '.detail-task', doDetailTask);
  $('body').on('click', '.g-detail', doClose);
}

function initList(param = pageData) {
  TmplData(TMPL_ADMIN_TASK_LIST, [URL_ADMIN_ALL_TASK, encodeQuery(param)].join('?'), null, cbListTask)
}

function cbListTask(r, e) {
  let data = e[0];
  if (data.code == 0) {
    Object.assign(data, pageData);
    totalPages = Math.ceil(data.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body .table-data").append($.templates(r[0]).render(data, rdHelper));
    if ($('.table-pg').text() == '') initPage(totalPages);
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

function doDetailTask(e) {
  id = $(e.currentTarget).data('id')
  TmplData('/tmpl/admin/detail_task.tmpl','/task/task_detail/'+ id, null, cbDetail)
}


function cbDetail(r, e) {
  let ret = e[0];
  if (ret.code == 0) {
    $(".g-detail").empty();
    $(".g-detail").append($.templates(r[0]).render(ret.data, rdHelper));
    $(".g-detail").show()
  } else if (ret.code == 99) {
    notifyInfo(e.message);
  } else if (ret.code == -1) {
    relogin();
  }
}

function doAuditTask(e) {
  bootbox.prompt(MSG_INPUT_AUDIT_INFO, function(ret){ 
    if( ret !== null) {
      var obj = {
        id: sid = $(e.currentTarget).data('id'),
        approve: ($(e.currentTarget).data('type')=='pass')?1:2,
        reason: ret
      }
      promiseData('POST',URL_ADMIN_TASK_AUDIT,JSON.stringify(obj), cbAuditTask)
    }; 
  }); 
}

function cbAuditTask(e) {
  if (e.code == 0) {
    initList()
  } else if (e.code == 99) {
    notifyInfo(e.message)
  }  else if (e.code == -1) {
    relogin();
  }
}


function doClose() {
  $('.g-detail').hide()
}