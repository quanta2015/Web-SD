var _id;
var _shop = {};
let pageData;

$(init);

function init() {
  type = getUrlParam('type');
  pageData =  Object.assign({mainType: type}, PAGE_DATA);
  (type==='pay')?$('.u-task-title').text('垫付'):$('.u-task-title').text('浏览');
  if (type === 'browse') $(".group-browser").remove();
  
  status = getUrlParam('status')
  $("#task-status option[value='"+status+"']").prop("selected", true);



  initTime();
  initShops()
  initList(pageData);
  
  $('#shop-name').on('change', doChangeShop);
  $('#search-order').on('click', cbRefresh);
  $('#batch-pay').on('click', doBatchPay);
  $('#batch-cancel').on('click', doBatchCancel);
  $('#batch-send').on('click', doBatchSend);
  $('#export').on('click', doExport);


  

  $('body').on('click', '.sub-goods', doSubmitGoods);
  $('body').on('click', '.pay-task', doPayTask);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click', '.detail-task', doDetail);
  $('body').on('click','.complain-task',doComplainTask);
  $('body').on('click','.change-money',doChangeMoney);
  $('body').on('click','.btn-defriend',doDefriend);
}


function doDefriend() {
  id = $(this).data('id') 


  bootbox.prompt(`请输入拉黑理由！`, function(ret){ 
    if(( ret !== "")&&( ret!== null)) {
      var obj = {
        buyerId: id,
        reason: ret
      }
      promise('POST','/shoper/save_black_buyer', JSON.stringify(obj), (e)=>{
        notifyInfo(`拉黑改买家成功！`)
      }, null)
    }
  });
}

function doChangeMoney() {
  id = $(this).attr('id') 

  promise('POST','/task/update_buyertask_goodsmoney',JSON.stringify({buyerTaskId: id}), (e)=>{
    bootbox.prompt(`请输入修改的价格！此次修改最大的范围是<span class="font-red">${e}</span>元。<br>如果修改价格超过最大修改范围，请发起申诉。`, function(ret){ 
      if ( (!ret)||(!$.isNumeric(ret)) ) return;

        var obj = {
          buyerTaskId: id,
          goodsMoney: ret
        }
        promise('POST','/task/update_buyertask_goodsmoney',JSON.stringify(obj), cbChangeMoney, null)
    });
  }, null)
}

function cbChangeMoney(e) {
  console.log(e);
  notifyInfo('价格修改成功！')
  initList(pageData);
}



function doDetail() {
  id = $(this).attr('id')
  url = '/task/buyer_task/'+ id
  promiseTmpl('GET', '/tmpl/sell/show_detail.tmpl', url ,null, cbDetail)
}

function cbDetail(r, e) {
  let ret = e;
  ret.data.imgPrefix = IMG_PREFIX;
  ret.data.mainType = type;
  $(".g-detail").empty();
  $(".g-detail").append($.templates(r).render(ret.data, rdHelper));
  // $("#ig-info").toggle("slide", { direction: "left" }, 200);
  $(".g-detail").show();
}


function doClose() {
  $('.g-detail').hide()
}


function doSubmitGoods(e) {
  var obj = {
    id: $(this).attr('id'),
    tid: $(this).attr('tid'),
    pid: $(this).attr('pid')
  }
  location.href = ['submitGoods.html', encodeQuery(obj)].join('?')
}


function doPayTask(e) {
  var obj = {
    id: $(this).attr('id'),
    tid: $(this).attr('tid'),
    pid: $(this).attr('pid'),
    type: $(this).attr('type'),
  }
  location.href = ['payTask.html', encodeQuery(obj)].join('?')
}

function getCheckedVal() {
  var r = [];

  if ($('.u-tid:checked').length === 0) {
    notifyInfo('请选择订单！');
    return null;
  }

  $('.u-tid:checked').each(function(){
    status = $(this).parent().parent().find('.status').text().trim();
    if ( status !== '待发货') {
      notifyInfo('请选择正确状态的订单！');
      r = null;
    }else{
      r.push($(this).val())
    }
  })

  return r;
}

function doComplainTask(e){
	var obj = {
    id: $(this).prop('id'),
    tid: $(this).attr('tid'),
    type: 'sel'
  }
  location.href = ['/html/appealOrder.html', encodeQuery(obj)].join('?')
}

function doBatchCancel() {
  var ret = getCheckedVal();
  if ( ret === null ) return;
  var obj = {
    buyerTaskIds: ret
  }
  promise('POST', '/task/cancel_task_batch', JSON.stringify(obj), cbRefresh, null);
}

function doBatchPay() {
  var ret = getCheckedVal();
  if ( ret === null ) return;
  var obj = {
    buyerTaskIds: ret
  }
  promise('POST', '/task/approve_buyer_task_batch', JSON.stringify(obj), cbRefresh, null);
}

function doBatchSend() {
  var ret = getCheckedVal();
  if ( ret === null ) return;
  var obj = {
    buyerTaskIds: ret
  }
  promise('POST', '/task/shoper_delivery_batch', JSON.stringify(obj), cbRefresh, null);
}


function cbRefresh() {
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
  promise('GET', URL_TASK_ALL_PLATFORM, null, cbShops, null);
}

function cbShops(e) {
  for(i=0; i< e.length; i++) {
    for(j=0; j< e[i].shops.length; j++) {
      _shop[e[i].shops[j].name] = e[i].platform;
      let val = e[i].shops[j].name;
      let sid = e[i].shops[j].id;
      let cnt = $.format('<option value="{0}">{1}</option>', sid, val )
      $("#shop-name").append(cnt)
    }
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
  promiseTmpl('GET', URL_SELL_LIST_ORDER, ['/task/task_accept_list_all', encodeQuery(cdt)].join('?'), null, cbListTask)
}


function cbListTask(r,e) {
  let ret = e;
  Object.assign(ret, pageData);
  ret.data[0].complainStatus = 1;
  ret.type = type;
  totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
  $(".portlet-body .u-wrap").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, rdHelper));
  if ($('.table-pg').text() == '') initPage(totalPages);
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

function doExport() {
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
  window.open([HOST+URL_SELL_EXPORT_TASKS, encodeQuery(cdt)].join('?'));
}