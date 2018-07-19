let pageData = Object.assign({}, PAGE_DATA);
let type = 'capital'

$(init);

function init() {

  initTime();
  initList();
  $('body').on('click', '#btn-search', doSearch);
  $('body').on('click', '.frazen-detail', doFrazenDetail);
  $('body').on('click', '.m-close', doClose);
  
  $('.tab').on('click', (e)=>{
    type = $(e.currentTarget).data('type');
    initList()
  });
}

function doClose() {
  $(".g-detail").hide();
}

function doFrazenDetail() {
  let obj = {
    taskId: $(this).attr('id')
  }

  promiseTmpl('GET', '/tmpl/sell/list_forzen_detail.tmpl', ['/shoper/task_frozen_detail', encodeQuery(obj)].join('?') ,null, cbForzenDetail)
}

function cbForzenDetail(r, e) {
  $(".g-detail").empty();
  $(".g-detail").append($.templates(r).render(e, rdHelper));
  $(".g-detail").show();
}


function initTime() {
  let from =  moment().subtract('days',7).format('YYYY-MM-DD');
  let to = moment().format('YYYY-MM-DD');
  $("#sr-time-from").datetimepicker({ value: from, format:'Y-m-d', timepicker:false});
  $("#sr-time-to").datetimepicker({value: to, format:'Y-m-d', timepicker:false});
}

// TODO: 目前把佣金tab隐藏了
function initList() {
  if (type === 'capital') {
    let param = {
      // status: $('#sr-type').val(),
      // content: $('#sr-cnt').val(),
      fromDate: $("#sr-time-from").val(),
      toDate: $("#sr-time-to").val(),
    };
    Object.assign(param, pageData);
    promiseTmpl('GET', TMPL_SELL_CAPITAL_LIST, [URL_SELL_TRADE_LIST, encodeQuery(param)].join('?'), null, cbList)
  }else{
    promiseTmpl('GET', TMPL_SELL_FORZEN_LIST, ['/shoper/frozen_list', encodeQuery(pageData)].join('?'), null, cbList)
  }
}

function cbList(r, e) {
  let ret = e;
  Object.assign(ret, pageData, {name: cookie('name')});
  totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
  $("#tab-capital .table").remove();
  $('#tab-capital .table-data').prepend($.templates(r).render(ret, rdHelper));
  if ($('#tab-capital .table-pg').text() == '') initPage(totalPages);
}

function initPage(totalPages) {
  $('#tab-capital .table-pg').twbsPagination({
    totalPages: totalPages || 1,
    onPageClick: function(event, page) {
      pageData.pageIndex = page - 1;

      initList();
    }
  })
}

function doSearch() {
  $('#tab-capital .portlet-body .table-pg').remove();
  $('#tab-capital .portlet-body').append('<div class="table-pg"></div>');
  initList();
}
