let _id;
let pageData = Object.assign({}, PAGE_DATA);
let appealtype=getUrlParam("type");
$(init);

function init() {
  initList(pageData);
  $('body').on('click', '.audit-appeal', doAuditAppeal);
  $('body').on('click', '.detail-task', doDetail);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click', '.b-close', doClose);


  $('body').on('click', '.cancel-order', doCancelOrder);
  $('body').on('click', '.change-money', doChangeMoney);
  $('body').on('click', '.platform-pay', doPlatformPay);
  $('body').on('click', '.cancel-pay', doCancelPay);
  $('body').on('click', '.frozen-account', doFrozenAccount);
}

function procAppeal(id, cid, attr, msg, url) {

  bootbox.prompt(`请输入${msg}！`, function(ret){ 
    if(( ret !== "")&&( ret!== null)) {
      var obj = {
        buyerId: 0,
        complainsId: cid,
        buyerTaskId: id,
        goodsMoney: null,
        reason: null,
        returnMoney: null
      };
      obj[attr] = ret
      promise('POST',url, JSON.stringify(obj), (e)=>{
        notifyInfo(`${msg}成功！`)
        initList(pageData)
      }, null)
    }else{
      notifyInfo(`请输入${msg}！`)
    }
  });
}

function doFrozenAccount() {
  procAppeal( $(this).data("id"), $(this).data("cid"), 'reason', '冻结买家', '/complain/admin_frozen_buyer')
}

function doCancelPay() {
  procAppeal( $(this).data("id") , $(this).data("cid"),'reason', '平台卖家都不返佣', '/complain/admin_nofee')
}

function doPlatformPay() {
  procAppeal( $(this).data("id") , $(this).data("cid"),'returnMoney', '平台返佣金额', '/complain/admin_platform_return')
}

function doChangeMoney() {
  procAppeal( $(this).data("id") , $(this).data("cid"),'goodsMoney', '修改价格', '/complain/admin_update_buyertask_goodsMoney')
}

function doCancelOrder() {
  procAppeal( $(this).data("id") , $(this).data("cid"),'reason', '撤销订单结果', '/complain/admin_cancel_buyertask')
}


function initList() {
  if (appealtype==1) {
    $(".caption").text("卖家申诉处理");
  }else if (appealtype==0) {
    $(".caption").text("买家申诉处理");
  }
  let param = Object.assign(pageData, {type:appealtype});
  promiseTmpl('GET', '/tmpl/admin/appealhandle.tmpl', ['/complains_list', encodeQuery(param)].join('?'),null, cbList)
}


function cbList(r, ret) {
  _listtask = ret.data;
  ret.imgPrefix = IMG_PREFIX;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/pageData.pageSize);
  $(".portlet-body .table").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, rdHelper));
  if ($('.table-pg').text() == '') initPage(totalPages);
  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
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


function doAuditAppeal(e) {
  doClose();
  bootbox.prompt("请输入处理结果", function(ret){ 
    if( ret !== null) {
      var obj = {
        id: sid = $(e.currentTarget).data('id'),
        handleStatus: $(e.currentTarget).data('type'),
        handleResult: ret
      };
      promise('POST','/admin/complains_handle',JSON.stringify(obj), cbAuditAppeal, null)
    };
  });
}

function cbAuditAppeal(e) {
  initList(pageData);
}

function doDetail() {
  var obj = {
    id: $(this).data("cid")
  };
  promiseTmpl('GET', '/tmpl/myappeal_detail.tmpl', ['/admin/complains_detail', encodeQuery(obj)].join('?') ,null, cbDetail)
}

function cbDetail(r, e) {
  let ret = e;
  ret.data.imgPrefix = IMG_PREFIX;
  $(".g-detail").empty();
  $(".g-detail").append($.templates(r).render(ret.data, rdHelper));
  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
  $(".g-detail").show();
}



function doClose() {
  $('.g-detail').hide();
}