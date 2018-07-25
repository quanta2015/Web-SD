let pageData;
let viptype=getUrlParam("type");
let pageData =  Object.assign({mainType:''}, PAGE_DATA);
$(init);

function init() {
  type = getUrlParam('type');
  $("#sr-status option[value='0']").prop("selected", true);
  if (viptype==1) {
    $(".li-title").html("审核卖家提现");
  }else if (viptype==0) {
    $(".li-title").html("审核买家提现");
  }

  initTime();
  initList();
  $('body').on('click', '#btn-leading-in', doLeadingIn);
  $('body').on('click', '#btn-search', doSearch);
  $('body').on('click', '#btn-leading-out', doLeadingOut);
}

function initList() {


  let param = {
    status: $('#sr-status').val(),
    sdate: $("#sr-time-from").val() + ' 00:00:00',
    edate: $("#sr-time-to").val() + ' 23:59:00',
    vipType: $("#sr-viptype").val(),
  };
  Object.assign(param, pageData,{"type":viptype});
  promiseTmpl('GET', '/tmpl/admin/list_withdraw.tmpl', ['/admin/buyer_withdraw_list', encodeQuery(param)].join('?'), null, cbListTask)
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


function doLeadingIn() {

}

function doLeadingOut() {
  
}

