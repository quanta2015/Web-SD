let _id;
let _listshop;
let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {

  
  initTime();
  initList();
  // $('body').on('click', '.audit-shop', doAudit);
  $('body').on('click', '.btn-detail-shopname', doDetailShop);
  $('body').on('click', '.btn-detail-pay', doDetailPay);
  $('body').on('click', '.btn-detail-browse', doDetailBrowse);
  $('body').on('click', '.btn-detail-oneappeal', doDetailOneappeal);
  $('body').on('click', '.btn-detail-zeroappeal', doDetailZeroappeal);
  // $('body').on('click', '.btn-detail-balance', doDetailBalance);
  // $('body').on('click', '.btn-detail-recharge', doDetailRecharge);
  // $('body').on('click', '.btn-detail-putforward', doDetailPuforward);
  // $('body').on('click', '.btn-detail-express', doDetailExpress);
  
  $('body').on('click', '.m-close', doClose);
  $('body').on('click', '.btn-setvip', doSetVip);
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
  e = {
  "data": [
    {
      "id": 48,
      "name": null,
      "idcard": null,
      "idcardpng1": null,
      "idcardpng2": null,
      "bank": null,
      "bankcard": null,
      "mobile": "15990184849",
      "password": "",
      "salt": "",
      "regtime": 1531455290000,
      "updatetime": 1531467088000,
      "qq": "463699272",
      "weixin": "zhaoqiaoqing",
      "cancelled": 0,
      "invitecode": "354480",
      "memberEndDate": "2021-02-14",
      "frozen": 0,
      "nickname": null,
      "inviteId": 0,
      "doOnejob": 1,
      "smscode": null,
      "randomcode": null,
      "shopList": [
        {
          "id": 105,
          "shopurl": "https://shop435508824.taobao.com",
          "name": "肖美丽beauty",
          "wangid": "新新泽西",
          "address": "下沙文化中心金沙大厦20层",
          "addressProvince": "浙江省",
          "shopimg1": "7c48a21c-564d-4726-ace3-29e7f1e2b983",
          "mobile": "15990184849",
          "addressCity": "杭州市",
          "addressCounty": "江干区",
          "shoperId": 48,
          "type": "淘宝",
          "businesstype": "服饰鞋履",
          "subtype": "女装",
          "createtime": 1531455872000,
          "updatetime": null,
          "cancelled": 0,
          "approveState": 1,
          "approveReason": "",
          "approver": "tt",
          "approvetime": 1531456266000,
          "approveStr": "审核通过",
          "frozen": 0,
          "frozenReason": null,
          "frozenDate": null,
          "taskNumber": 0,
          "orderNumber": 0
        },
        {
          "id": 106,
          "shopurl": "https://shop435508824.taobao.com",
          "name": "肖美丽beauty2",
          "wangid": "新新泽西",
          "address": "下沙文化中心金沙大厦20层",
          "addressProvince": "浙江省",
          "shopimg1": "7c48a21c-564d-4726-ace3-29e7f1e2b983",
          "mobile": "15990184849",
          "addressCity": "杭州市",
          "addressCounty": "江干区",
          "shoperId": 48,
          "type": "淘宝",
          "businesstype": "服饰鞋履",
          "subtype": "女装",
          "createtime": 1531455872000,
          "updatetime": null,
          "cancelled": 0,
          "approveState": 1,
          "approveReason": "",
          "approver": "tt",
          "approvetime": 1531456266000,
          "approveStr": "审核通过",
          "frozen": 0,
          "frozenReason": null,
          "frozenDate": null,
          "taskNumber": 0,
          "orderNumber": 0
        }
      ],
      "memberValid": true
    },
    {
      "id": 50,
      "name": null,
      "idcard": null,
      "idcardpng1": null,
      "idcardpng2": null,
      "bank": null,
      "bankcard": null,
      "mobile": "17706652364",
      "password": "",
      "salt": "",
      "regtime": 1531735526000,
      "updatetime": null,
      "qq": "897472975",
      "weixin": "chen_xin1234567",
      "cancelled": 0,
      "invitecode": "B32282",
      "memberEndDate": "2019-01-16",
      "frozen": 0,
      "nickname": null,
      "inviteId": 0,
      "doOnejob": 0,
      "smscode": null,
      "randomcode": null,
      "shopList": [],
      "memberValid": true
    },
    {
      "id": 51,
      "name": null,
      "idcard": null,
      "idcardpng1": null,
      "idcardpng2": null,
      "bank": null,
      "bankcard": null,
      "mobile": "15869181925",
      "password": "",
      "salt": "",
      "regtime": 1531886204000,
      "updatetime": null,
      "qq": "513064773",
      "weixin": "rebeca_516",
      "cancelled": 0,
      "invitecode": "B76318",
      "memberEndDate": null,
      "frozen": 0,
      "nickname": null,
      "inviteId": 0,
      "doOnejob": 0,
      "smscode": null,
      "randomcode": null,
      "shopList": [
        {
          "id": 108,
          "shopurl": "https://shengwalundingjiaju.tmall.com/shop/view_shop.htm?shop_id=108407442",
          "name": "圣瓦伦丁家居旗舰店",
          "wangid": "wangkeyou323",
          "address": "杭州市下城区",
          "addressProvince": "浙江省",
          "shopimg1": "34e61cbc-104e-41ad-bea9-c432fe5d3359",
          "mobile": "18357110006",
          "addressCity": "杭州市",
          "addressCounty": "西湖区",
          "shoperId": 51,
          "type": "淘宝",
          "businesstype": "家居家纺",
          "subtype": "家装软饰",
          "createtime": 1532151448000,
          "updatetime": null,
          "cancelled": 0,
          "approveState": 0,
          "approveReason": null,
          "approver": null,
          "approvetime": null,
          "approveStr": "等待审核",
          "frozen": 0,
          "frozenReason": null,
          "frozenDate": null,
          "taskNumber": 0,
          "orderNumber": 0
        }
      ],
      "memberValid": false
    }
  ],
  "code": 0,
  "message": null,
  "total": 1
}

  let ret = e;
    _listshop = ret.data;
    Object.assign(ret, pageData);
    totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body .table-data").append($.templates(r).render(ret,rdHelper));
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





function doDetailShop() {
  var obj ={
    shoperId: $(this).data("id")
  }
  promiseTmpl('get', '/tmpl/admin/list_shoper_shop.tmpl' ,['/adminshoper/shoper_shops', encodeQuery(obj)].join('?'), null,cbDetailShop)
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



