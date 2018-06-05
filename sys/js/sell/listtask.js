let _listtask;
let _id;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {

let from =  moment().format('YYYY-MM-DD') + ' 00:00';
  let to = moment().subtract('days',7).format('YYYY-MM-DD') + ' 23:59'
  $("#task-from").datetimepicker({ value: from});
  $("#task-to").datetimepicker({value: to});

  

  initShops()

  

  initList();
  $('body').on('click', '.pay-task', doPayTask);
  $('body').on('click', '.del-task', doDelTask);
  $('body').on('click', '.mag-task', doMagTask);
}

function initShops() {
  promiseData('GET', URL_TASK_ALL_PLATFORM, null, cbShops);
}

function cbShops(e) {
  if (e.code == 0) {

    for(i=0; i< e.data.length; i++) {
      for(j=0; j< e.data[i].shops.length; j++) {
        let val = e.data[i].shops[j].name;
        let cnt = $.format('<option value="{0}">{1}</option>', val, val )
        $("#shop-name").append( cnt )
      }
    }
    
  } else if (e.code == -1) {
    relogin();
  } else if (e.code == 99){
    notifyInfo(MSG_DEL_FAILED);
  }
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
    notifyInfo("发布任务成功！");
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
    notifyInfo("删除任务成功！");
    initList();
  } else if (e.code == -1) {
    relogin();
  } else if (e.code == 99){
    notifyInfo(MSG_DEL_FAILED);
  }
}



$.format = function (source, params) {
    if (arguments.length == 1)
        return function () {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.format.apply(this, args);
        };
    if (arguments.length > 2 && params.constructor != Array) {
        params = $.makeArray(arguments).slice(1);
    }
    if (params.constructor != Array) {
        params = [params];
    }
    $.each(params, function (i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    });
    return source;
};