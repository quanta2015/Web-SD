let _id;
let _listshop;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {

  
  initTime();
  initList();
  // $('body').on('click', '.audit-shop', doAudit);
  $('body').on('click', '.btn-detail-task', doDetailShop);
  $('body').on('click', '.btn-detail-oneappeal', doDetailOneappeal);
  $('body').on('click', '.btn-detail-zeroappeal', doDetailZeroappeal);
  $('body').on('click', '.btn-detail-capital', doDetailCapital);
  $('body').on('click', '.btn-detail-commission', doDetailCommission);
  // $('body').on('click', '.btn-detail-balance', doDetailBalance);
  // $('body').on('click', '.btn-detail-recharge', doDetailRecharge);
  // $('body').on('click', '.btn-detail-putforward', doDetailPuforward);
  // $('body').on('click', '.btn-detail-activity', doActivity);
  
  $('body').on('click', '.m-close', doClose);
  $('body').on('click', '.btn-setvip', doRemarks);
}


function doDetailShop() {
  var obj ={
    shoperId: $(this).data("id")
  }
  promiseTmpl('get', '/tmpl/admin/list_buyer.tmpl' ,['/adminbuyer/buyer_shops', encodeQuery(obj)].join('?'), null,cbDetailShop)
}


function cbDetailShop(r,ret) {

  $(".g-detail").empty();
  $(".g-detail").prepend($.templates(r).render(ret));
  showModel('.g-detail')
}



function doDetailPay() {
  pageData =  Object.assign({mainType:'pay'}, PAGE_DATA);
  $("#sr-status option[value='-1']").prop("selected", true);
  var param ={
    shoperId: $(this).data("id"),
    tasktype: $('#sr-tasktype').val(),
    num: $('#sr-num').val(),
    isRecieve: $('#sr-isRecieve').val(),
  }
  Object.assign(param, pageData);
  promiseTmpl('get', '/tmpl/admin/list_shoper_tasks.tmpl' ,['/adminshoper/shoper_tasks', encodeQuery(param)].join('?'), null, cbDetailPay)
}


function cbDetailPay(r,ret) {

  $(".g-detail").empty();
  $(".g-detail").prepend($.templates(r).render(ret,rdHelper));
  showModel('.g-detail')
}


function doDetailBrowse() {
  pageData =  Object.assign({mainType:'browse'}, PAGE_DATA);
  $("#sr-status option[value='-1']").prop("selected", true);
  var param ={
    shoperId: $(this).data("id"),
    tasktype: $('#sr-tasktype').val(),
    isRecieve: $('#sr-isRecieve').val(),
  }
  Object.assign(param, pageData);
  promiseTmpl('get', '/tmpl/admin/list_shoper_tasks.tmpl' ,['/adminshoper/shoper_tasks', encodeQuery(param)].join('?'), null, cbDetailBrowse)
}


function cbDetailBrowse(r,ret) {

  $(".g-detail").empty();
  $(".g-detail").prepend($.templates(r).render(ret,rdHelper));
  showModel('.g-detail')
}



function doDetailOneappeal() {
  pageData =  Object.assign({mainType:'browse'}, PAGE_DATA);
  $("#sr-status option[value='-1']").prop("selected", true);
  var param ={
    shoperId: $(this).data("id"),
    tasktype: $('#sr-tasktype').val(),
    isRecieve: $('#sr-isRecieve').val(),
  }
  Object.assign(param, pageData);
  promiseTmpl('get', '/tmpl/admin/list_shoper_oneappeal.tmpl' ,['/adminshoper/get_shoper_complains_list', encodeQuery(param)].join('?'), null, cbDetailBrowse)
}



function cbDetailOneappeal(r,ret) {

  $(".g-detail").empty();
  $(".g-detail").prepend($.templates(r).render(ret,rdHelper));
  showModel('.g-detail')
}



function doDetailZeroappeal() {
  pageData =  Object.assign({mainType:'browse'}, PAGE_DATA);
  $("#sr-status option[value='-1']").prop("selected", true);
  var param ={
    shoperId: $(this).data("id"),
    tasktype: $('#sr-tasktype').val(),
    num: $('#sr-num').val(),
    isRecieve: $('#sr-isRecieve').val(),
  }
  Object.assign(param, pageData);
  promiseTmpl('get', '/tmpl/admin/list_shoper_tasks.tmpl' ,['/adminshoper/shoper_tasks', encodeQuery(param)].join('?'), null, cbDetailBrowse)
}



function cbDetailZeroappeal(r,ret) {

  $(".g-detail").empty();
  $(".g-detail").prepend($.templates(r).render(ret,rdHelper));
  showModel('.g-detail')
}



function doClose() {
  $('.g-detail').hide()
}







// function doRemarks() {

//   id = $(this).data("id")

// }



function initList() {
  let param = {
    sdate: $("#sr-time-from").val() + ' 00:00:00',
    edate: $("#sr-time-to").val() + ' 23:59:00',
  };
  Object.assign(param, pageData);
  promiseTmpl('GET', '/tmpl/buy/list_buyer.tmpl', ['/admin/shoper_acount_list', encodeQuery(param)].join('?'), null, cbList)
}

function cbList(r, e) {
  let ret = e;
    _listshop = ret.data;
    Object.assign(ret, pageData);
    totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body .table-data").append($.templates(r).render(ret, rdHelper));
    $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
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

