let withdrawtype = getUrlParam('type');
let pageData =  Object.assign({}, PAGE_DATA);
$(init);

function init() {
  type = getUrlParam('type');
  $("#sr-status option[value='0']").prop("selected", true);

  initTime();
  initList();
  // $('body').on('click', '#btn-leading-in', doLeadingIn);
  $('body').on('click', '#btn-search', doSearch);
  $('body').on('click', '#btn-leading-out', doLeadingOut);
}

function initList() {
  $("#sr-status option[value='0']").prop("selected", true);
  let param = {
    
    sdate: $("#sr-time-from").val() + ' 00:00:00',
    edate: $("#sr-time-to").val() + ' 23:59:00',
    status: $('#sr-status').val(),
  };
  if((withdrawtype == 'buy')){
    $(".caption").text("买家提现处理");
    joggle = '/adminbuyer/buyer_withdraw_list';
  }else if(withdrawtype == 'sell'){
    $(".caption").text("卖家提现处理");
    joggle = '/adminshoper/shoper_withdraw_list';
  } 
  Object.assign(param, pageData);
  promiseTmpl('GET','/tmpl/admin/list_withdraw.tmpl', [joggle, encodeQuery(param)].join('?'), null, cbListTask)
}



function cbListTask(r, e) {
  let ret = e;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
  $(".portlet-body .table").remove();
  $(".portlet-body .table-data").append($.templates(r).render(ret, rdHelper));
  if ($('.table-pg').text() == '') initPage(totalPages);
}

function initPage(totalPages) {
  $('.portlet-body .table-pg').twbsPagination({
    totalPages: totalPages || 1,
    onPageClick: function(event, page) {
      pageData.pageIndex = page - 1;
      initList();
    }
  })
}


function initTime() {
  let from =  moment().subtract('days',7).format('YYYY-MM-DD');
  let to = moment().format('YYYY-MM-DD');
  $("#sr-time-from").datetimepicker({ value: from, format:'Y-m-d', timepicker:false});
  $("#sr-time-to").datetimepicker({value: to, format:'Y-m-d', timepicker:false});
}


function doSearch() {
  $('.portlet-body .table-pg').remove();
  $('.portlet-body').append('<div class="table-pg"></div>');
  initList();
}


function doLeadingOut() {
    
    if(withdrawtype == 'buy'){
      joggle = '/adminbuyer/expoert_buyer_withdraw_list?';
      param = {
      fromDate: $("#sr-time-from").val() + ' 00:00:00',
      toDate: $("#sr-time-to").val() + ' 23:59:00',
      status: $('#sr-status').val(),
      };
      
    }else if(withdrawtype == 'sell'){
      joggle = '/adminshoper/expoert_shoper_withdraw_list?';
      param = {
      fromDate: $("#sr-time-from").val() + ' 00:00:00',
      toDate: $("#sr-time-to").val() + ' 23:59:00',
      status: $('#sr-status').val(),
      };
    }
    location.href = [HOST+joggle+encodeQuery(param)]
}



function doLeadingIn(filename) {
    if((withdrawtype == 'buy')){
      joggle = '/adminshoper/import_buyer_withdraw_list';
    }else if(withdrawtype == 'sell'){
      joggle = '/adminshoper/import_shoper_withdraw_list';
    } 
    location.href = [HOST+joggle]
}

