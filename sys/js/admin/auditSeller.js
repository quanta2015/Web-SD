let _id;
let _listshop;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {
  
  initTime();
  initList();
  // $('body').on('click', '.audit-shop', doAudit);
  // $('body').on('click', '.shop-name', doShowDetail);
  $('body').on('click', '.btn-setvip', doSetVip);
}

function doSetVip() {

  id = $(this).data("id")
  bootbox.prompt(`请输入设置VIp的数量（以月为单位）！`, function(ret){ 
    if(( ret !== "")&&( ret!== null)&&($.isNumeric(ret))) {
      var obj = {
        shoperId: id,
        month: ret
      };
      promise('POST','/admin/give_vip_shoper', JSON.stringify(obj), (e)=>{
        notifyInfo(`设置VIP充值成功！`)
        initList()
      }, null)
    }else{
      notifyInfo(`请输入正确的充值数量！`)
    }
  });
}

function initList() {
  let param = {
    sdate: $("#sr-time-from").val() + ' 00:00:00',
    edate: $("#sr-time-to").val() + ' 23:59:00',
  };
  Object.assign(param, pageData);
  promiseTmpl('GET', '/tmpl/sell/list_seller.tmpl', ['/admin/shoper_acount_list', encodeQuery(param)].join('?'), null, cbList)
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