// BASIC DEF
const CODE_COUNT = 60
const BUY = 0
const SELL = 1
const HOST = 'http://103.251.90.136:8011'
// const IMG_PREFIX = HOST + '/file/'
const AUDIT_PASS = 1
const AUDIT_FAIL = 2
const WITHDRAW_FEE = 0.05


const IMG_PREFIX = 'https://abc-1256878718.cos.ap-shanghai.myqcloud.com/'

const PLATFORM_DATA = {
  jingdong: {
    type: '京东',
    creditType: '白条',
    levels: ['注册会员','铜牌会员','银牌会员','金牌会员','钻石会员', 'PLUS会员'],
    cko: 'jingdongList',
  },
  taobao: {
    type: '淘宝',
    creditType: '花呗',
    levels: [
      '一星','二星','三星','四星','五星',
      '一钻','二钻','三钻','四钻','五钻',
    ],
    cko: 'taobaoList',
  } 
}

const AUDIT_STATUS = {
  '-1': '未绑定',
  '0': '待审核',
  '1': '绑定成功',
  '2': '审核不通过',
}

const STATUS_MAP = {
  0: '未支付',
  20: '待审核', // 支付完成后的状态
  30: '任务进行中', // 审核通过，任务进行中
  40: '审核不通过', // 需要重新修改发布
  50: '任务完成',
  60: '任务已过时',
}

const BANKS = ['工商银行', '农业银行', '建设银行', '中国银行', '招商银行','其他银行']

const PAGE_DATA = {
  pageIndex: 0,
  pageSize: 10,
}


const LOADER = '<div class="mask" id="i-mask" style="position:absolute; top:0; left:0;right:0; bottom:0;z-index:9999999;background:rgba(0,0,0,.4);display:flex;justify-content: center;align-items: center;"><div class="loaded"><div class="loaders "><div class="loader"><div class="loader-inner ball-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></div></div>'

// URL DEF

const URL_SMS_SEND          = '/sms_send'
const URL_EXIT              = '/exist'
const URL_UPLOAD_FILE       = '/upload'

const URL_SELL_REG          = '/shoper/shoper_reg'
const URL_SELL_LOGIN        = '/shoper/shoper_login'
const URL_TASK_PUBLISH      = '/task/task_publish'
const URL_TASK_CAL_MONEY    = '/task/cal_taskmoney'

const URL_TASK_ALL_PLATFORM = '/task/all_platform'
const URL_SELL_SHOPS        = '/shoper/shoper_shops/'
const URL_SELL_SHOP_DEL     = '/shoper/shop_del/'
const URL_SELL_SHOP_UPDATE  = '/shoper/shop_update/'
const URL_SELL_ALL_TASK     = '/task/all_tasks/'
const URL_SELL_ALL_RECHARGE = '/shoper/shoper_transfer_list'
const URL_SELL_UPDATE       = '/shoper/shoper_update'
const URL_SELL_PASSWD       = '/edit_password'
const URL_SELL_PAY_TASK     = '/task/prePayForTask?taskId='
const URL_SELL_BALANCE      = '/shoper/shoper_balance'
const URL_SELL_DEL_TASK     = '/task/task_del/'
const URL_SELL_ACC_TASK_DETAIL = '/task/task_accept_detail'
const URL_SELL_DELIVERY     = '/task/shoper_delivery'
const URL_SELL_ACCEPT_LIST  = '/task/task_accept_list'
const URL_SELL_TRANSFER     = '/shoper/shoper_transfer'
const URL_SELL_LIST_ORDER   = '/tmpl/sell/list_order.tmpl'

const URL_SELL_LIST_TASK    = '/task/search_tasks'
const URL_SELL_PAY_ORDER     = '/task/approve_buyer_task'
const URL_SELL_TRADE_LIST   = '/shoper/shoper_trade_list'
const URL_SELL_EXPORT_TASKS   = '/task/export_tasks'

const URL_ADMIN_ALL_SHOP       = '/admin/all_shops'
const URL_ADMIN_ALL_TASK       = '/admin/all_tasks'
const URL_ADMIN_ALL_IDCARD     = '/admin/buyer_list'
const URL_ADMIN_LOGIN          = '/admin/admin_login'
const URL_ADMIN_TASK_AUDIT     = '/admin/task_approve'
const URL_ADMIN_IDCARD_AUDIT   = '/admin/buyer_approve'
const URL_ADMIN_ACOUNT_LIST    = '/admin/buyer_acount_list'
const URL_ADMIN_ALL_RECHARGE   = '/admin/shoper_transfer_list'
const URL_ADMIN_ACOUNT_AUDIT   = '/admin/buyer_acount_approve'
const URL_ADMIN_AUDIT_RECHARGE = '/admin/shoper_transfer_approve'
const URL_ADMIN_SHOP_AUDIT     = '/admin/shop_approve'
const URL_SAVE_NOTICE ='/admin/save_notice';
const URL_ADMIN_NOTICE_LIST ='/admin/notice_list';
const URL_ADMIN_NOTICE_DEL='/admin/notice_del';

const URL_ADMIN_QQ_LIST='/admin/buyer_qq_list'
const URL_ADMIN_AUDITQQ='/admin/buyer_qq_approve'


const URL_SHOP_BIND         = '/shoper/shop_bind'
const URL_BUYER_GET_TASK    = '/buyertask/receive_task'
const URL_BUY_REG           = '/buyer/buyer_reg'
const URL_BUY_LOGIN         = '/buyer/buyer_login'
const URL_BUY_BIND_ID_CARD  = '/buyer/buyer_validate'
const URL_BUY_BIND_BANK     = '/buyer/buyer_bankbind'
const URL_BUY_BIND_ACCOUNT  = '/buyer/buyer_acountbind'
const URL_BUYER_ALL_TASK    = '/buyertask/all_tasks'
const URL_BUY_CANCEL_TASK   = '/buyertask/cancel_task'
const URL_BUY_WITHDRAW      = '/buyer/withdraw_apply'
const URL_BUY_FEE_WITHDRAW  = '/buyer/buyer_withdraw_apply'
const URL_BUY_CHECK_SHOP    = '/buyertask/check_shop'
const URL_BUY_SUBMIT_ORDER  = '/buyertask/task_submit'
const URL_BUY_TASKDETAIL    = '/buyertask/taskdetail'
const URL_BUY_BALANCE       = '/buyer/buyer_balance'
const URL_BUY_TASK_EVALUATE = '/buyertask/submit_evaluate'
const URL_BUYER_ALL_ORDER   = '/buyertask/received_tasks'
const URL_BUY_TRADE_RECORD  = '/buyer/buyer_trade_records'
const URL_BUY_INFO          = '/buyer/person_info'


const URL_MEMBERSHIP_FEE_TYPE = '/membership_fee_type';//获取 会员套餐
const URL_MEMBERSHIP_TRANSFER='/membership_transfer';//vip充值保存
const URL_MEMBERSHIP_LIST='/membership_list';//获取当前用户会员充值记录
const TMPL_VIP_RECHARGE_LIST = '/tmpl/list_vipRecharge.tmpl';


// TMPL DEF

// SELL
const TMPL_SELL_SRH_WITHDRAW      = '/tmpl/sell/srh_withdraw.tmpl'
const TMPL_SELL_SRH_CAPITAL       = '/tmpl/sell/srh_capital.tmpl'
const TMPL_SELL_RECHARGE_LIST     = '/tmpl/sell/list_recharge.tmpl'
const TMPL_SELL_CAPITAL_LIST      = '/tmpl/sell/list_capital.tmpl'
const TMPL_SELL_WITHDRAW_LIST     = '/tmpl/sell/list_withdraw.tmpl'
const TMPL_SELL_TASK_LIST         = '/tmpl/sell/list_task.tmpl'
const TMPL_SELL_SHOP_LIST         = '/tmpl/sell/list_shop.tmpl'
const TMPL_SELL_CREATETASK        = '/tmpl/sell/createtask.tmpl'
const TMPL_SELL_SHOP_SELECT       = '/tmpl/sell/select_shop.tmpl'
const TMPL_SELL_PLAT_SELECT       = '/tmpl/sell/select_platform.tmpl'
const TMPL_SELL_WITHDRAW          = '/tmpl/sell/withdraw.tmpl'
const TMPL_SELL_TASKITEM_LIST     = '/tmpl/sell/list_taskitem.tmpl'
const TMPL_SELL_COMMISSION_LIST   = '/tmpl/sell/list_commission.tmpl'
const TMPL_SELL_TASK_COST         = '/tmpl/sell/task_cost.tmpl'

const TMPL_SELL_CREATE_TASKSEE    =  '/tmpl/sell/createtasksee.tmpl'

// ADMIN
const TMPL_ADMIN_SHOP_LIST        = '/tmpl/admin/list_shop.tmpl'
const TMPL_ADMIN_TASK_LIST        = '/tmpl/admin/list_task.tmpl'
const TMPL_ADMIN_IDCARD_LIST      = '/tmpl/admin/list_idcard.tmpl'
const TMPL_ADMIN_ACOUNT_LIST      = '/tmpl/admin/list_account.tmpl'
const TMPL_ADMIN_RECHARGE_LIST    = '/tmpl/admin/list_admin_recharge.tmpl'
const TMPL_ADMIN_NOTICE = '/tmpl/admin/list_notice.tmpl'
const TMPL_ADMIN_QQ_LIST='/tmpl/admin/list_qq.tmpl'


// BUYER
const TMPL_BUY_BIND_IDCARD        = '/tmpl/buy/bind_idcard.tmpl'
const TMPL_BUY_BIND_BKCARD        = '/tmpl/buy/bind_bkcard.tmpl'
const TMPL_BUY_BIND_ACCOUNT       = '/tmpl/buy/bind_account.tmpl'
const TMPL_BUY_ALL_TASK           = '/tmpl/buy/list_all_task.tmpl'
const TMPL_BUY_ALL_ORDER          = '/tmpl/buy/list_all_order.tmpl'
const TMPL_BUY_ORDER_DETAIL       = '/tmpl/buy/detail_order.tmpl'
const TMPL_BUY_CHOOSE_DETAIL       = '/tmpl/buy/detail_task.tmpl'
const TMPL_BUY_UPLOAD_IMG         = '/tmpl/buy/upload_img.tmpl'
const TMPL_BUY_WITHDRAW           = '/tmpl/buy/withdraw.tmpl'
const TMPL_BUY_TASK_DETAIL        = '/tmpl/buy/show_detail.tmpl'
const TMPL_BUY_TRADE_RECORD       = '/tmpl/buy/list_trade_record.tmpl'


const TMPL_ADDR                   = '/tmpl/addr.tmpl'
const TMPL_REG                    = '/tmpl/reg.tmpl'


// MSG DEF
const MSG_LOGIN_SUCCESS       = '登录成功！'
const MSG_REGIS_SUCCESS       = '注册成功！'
const MSG_PUBLISH_SUCCESS     = '发布成功！'
const MSG_BIND_SUCCESS        = '绑定成功！'
const MSG_UPDATE_SUCCESS      = '修改信息成功'
const MSG_RECHARGE_SUCCESS    = '充值成功！'
const MSG_SHOPNAME_CORRECT    = '店铺名称正确!'
const MSG_SUBMIT_BUY_CORRECT  = '提交购买任务成功！'
const MSG_PUBLISH_FAILED      = '发布失败！'
const MSG_DEL_FAILED          = '删除失败！'
const MSG_DELIVERY_SUCCESS    = '发货成功！'
const MSG_DELIVERY_ERR        = '发货出错！'
const MSG_PAY_SUCC            = '支付成功！'
const MSG_PAY_ERR             = '支付出错！'
const MSG_GET_TASK_DETAIL_ERR = '取买家任务详细信息出错！'
const MSG_BIND_SHOP_SUCC      = '绑定商店成功！'
const MSG_CONT_BIND_SHOP      = '继续绑定商店'
const MSG_GOTO_SHOP_LIST      = '进入店铺管理'
const MSG_GOON_RECHARGE       = '继续充值'
const MSG_LOOKUP_RECHARGE     = '查看充值记录'
const MSG_ACCEPT_TASK_SUCC    = '接单成功！'
const MSG_GOON_ACCEPT         = '继续接单'
const MSG_LOOKUP_TASK         = '查看任务'
const MSG_UPDATE_FAILED       = '更新数据失败！'
const MSG_INPUT_AUDIT_INFO    = '请填写审批内容!'
const MSG_WITHDRAW_SUCCESS    = '提现成功！'
const MSG_WITHDRAW_FAILED     = '提现失败！'
const MSG_TASK_SAVE_SUCC      = '任务保存成功！'
const MSG_CONT_CREATE_TASK    = '继续创建任务'
const MSG_PUB_TASK            = '去发布任务'
const MSG_UPDATE_SHOP_SUCC    = '更新店铺数据成功！'
const MSG_CONF_DEL_SHOP       = '请确认是否要删除店铺！'
const MSG_CANCEL              = '取消'
const MSG_OK                  = '确定'
const MSG_TASK_PUB_SUCC       = '发布任务成功！'
const MSG_WAIT                = '等会再说'
const MSG_RECHARGE            = '马上充值'
const MSG_TASK_DEL_SUCC       = '删除任务成功！'
const MSG_UPLOAD_PIC          = '请上传图片！'
const MSG_EVALUATE_SUCC       = '提交评价成功！'
const MSG_SELECT_ONE          = '请至少选择一个任务'
const MSG_INPUT_KEYWORD       = '请输入关键字！'
const MSG_INPUT_TASK_COUNT    = '请输入任务数量！'
const MSG_INPUT_KEYWORD_EX    = '请输入指定关键词！'
const MSG_INPUT_TEXT          = '请输入指定文字！'
const MSG_CONF_DEL_NOTICE = "请确认是否要删除该公告！"



const TEXT_BIND_SUCCESS = '已绑定'
const TEXT_PAY_TASK_INFO = '请于60分钟内完成任务，超时平台会自动取消任务并扣取0.5金！若于15分钟内主动撤单，将不会扣取佣金，15分钟后主动撤单，扣取0.2金！';
const TEXT_BROWSER_TASK_INFO = '请于60分钟内完成任务，超时平台会自动取消任务并扣取0.2金！若于15分钟内主动撤单，将不会扣取佣金，15分钟后主动撤单，扣取0.1金！';


// ARRAY & OBJ DEF
const LOGIN_IMGS = [
  'img/login01.jpg',
  'img/login02.jpg'
];

const PAGES = ['login', 'register', 'regs'];

const REGISTER_REGEXS = {
  mobile: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
  qq: /[1-9][0-9]{4,14}/,
  weixin: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
  password: /\w{6,16}/
};



// FUNCTION DEF
function relogin() {
  top.location.href = '/index.html';
}

function errorInfo(info) {
  toastr.error(info)
}

function notifyInfo(info) {
  toastr.success(info)
}


function msgbox(title, msg,titleA,titleB,cb) {
  bootbox.confirm({
    title: title,
    message: msg,
    buttons: {
        confirm: {
            label: '<i class="fa fa-times"></i> '+ titleA
        },
        cancel: {
            label: '<i class="fa fa-check"></i> '+ titleB
        }
    },
    callback: cb
  })
}

function alertBox(info, cb) {
  bootbox.alert({
    title:'温馨提示',
    message: info,
    size: 'small',
    callback: cb
  });
}

function goto(url) {
  // $("#mainframe", parent.document.body).attr("src", url);
  location.href = url
}

function isNull(exp) {
  if( (typeof(exp) == "undefined")||(typeof(exp) == "null")||(exp == "") ) {
    return true;
  } else {
    return false;
  }
}




// new ajax def
function promise(method, url, data, cb, err) {
  $("body").append(LOADER);
  var promise = $.ajax({
    type: method,
    url: HOST + url,
    dataType: "json",
    contentType: "application/json",
    data: data,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true
  });
  promise.then((e)=>{
    $("#i-mask").remove();
    if (e.code == 0) {
      cb(e.data);
    } else if (e.code == 99) {
      errorInfo(e.message);
      if (err !== null) err(e);
    } else if (e.code == -1) {
      relogin();
    }
  })
}


function promiseNoMask(method, url, data, cb, err) {
  var promise = $.ajax({
    type: method,
    url: HOST + url,
    dataType: "json",
    contentType: "application/json",
    data: data,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true
  });
  promise.then((e)=>{
    if (e.code == 0) {
      cb(e.data);
    } else if (e.code == 99) {
      errorInfo(e.message);
      if (err !== null) err(e);
    } else if (e.code == -1) {
      relogin();
    }
  })
}

function promiseTmpl(method, urlTmpl, urlData, data, cb) {
  $("body").append(LOADER);
  $.when($.ajax(urlTmpl), 
    $.ajax({
      type: method,
      url: HOST + urlData,
      dataType: "json",
      contentType: "application/json",
      data: data,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
  })).done((tmpl,e)=>{
    $("#i-mask").remove();
    if (e[0].code == 0) {
      cb(tmpl[0],e[0]);
    } else if (e[0].code == 99) {
      errorInfo(e[0].message);
    } else if (e[0].code == -1) {
      relogin();
    }
  })
}


const promiseObj = (url, data) => {
  return new Promise((resolve, reject) => {
    $("body").append(LOADER);
    $.ajax({
      type: 'get',
      url: HOST + url,
      dataType: "json",
      contentType: "application/json",
      data: data,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    }).done(e => {
      $("#i-mask").remove();
      if (e.code == 0) {
        resolve(e);
      } else if (e.code == 99) {
        notifyInfo(e.message);
      } else if (e.code == -1) {
        relogin();
      }
    })
  })
}

//------------------------------------------------------






function promiseData(method, url, data, cb) {
  $("body").append(LOADER);
  var promise = $.ajax({
    type: method,
    url: HOST + url,
    dataType: "json",
    contentType: "application/json",
    data: data,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
  });
  promise.done(cb).always(()=>{
    $("#i-mask").remove()
  })
}


const promiseCall = (url, data) => {
  return new Promise((resolve, reject) => {
    $("body").append(LOADER);
    $.ajax({
      type: 'get',
      url: HOST + url,
      dataType: "json",
      contentType: "application/json",
      data: data,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    }).done(ret => {
      resolve(ret)
    }).always(()=>{
    $("#i-mask").remove()
    })
  })
}

// TMPL FUNCTION DEF
const rdHelper = {
  formatTime: (t) => { return moment(t).format("YYYY-M-D HH:mm:ss") },
  div: (val1,val2) => { return  Number(val1) / Number(val2) * 100},
  add: (val1,val2,val3) => { return Number(val1) + Number(val2) + Number(val3) },
  formatMoneyType: (typeId) => {
    switch(typeId) {
      case 0: ret = '提现本金';break;
      case 1: ret = '商品预付款';break;
      case 2: ret = '佣金';break;
      case 3: ret = '会费';break;
      case 4: ret = '提款佣金';break;
      case 5: ret = '存款';break;
      case 6: ret = '下线佣金';break;
    }
    return ret;
  },
  formatOrderStatus: (s)=> {
    switch(s) {
      case  0: ret = '待处理';    break;
      case 10: ret = '待发货';    break;
      case 20: ret = '待评价';    break;
      case 30: ret = '评价待审核'; break;
      case 50: ret = '刷手撤销';  break;
      case 60: ret = '系统撤销';  break;
      case 70: ret = '已完成';    break;
    }
    return ret;
  },
  formatTaskStatus: (s)=> {
    switch(s) {
      case  0: ret = '未支付';    break;
      case 20: ret = '待审核';    break;
      case 30: ret = '任务进行中';break;
      case 40: ret = '审核不通过';break;
      case 50: ret = '任务完成';  break;
      case 60: ret = '任务已过时';break;
    }
    return ret;
  },
  formatTaobaoPos: (s)=> {
    if (typeof s === 'undefined') return '';
    if (s === '') return '';
    tbArr = ['包邮','天猫','球购 ','消费者保障','淘金币抵钱','到付款 ','7+天退换','呗分期 ','天猫超市','天猫国际','通用排序'];
    retArr = [];
    s.split(';').forEach((v)=>{
      retArr.push(tbArr[v])
    })
    return retArr.join('/');
  },
  formatBool: (s)=> {

    return ((parseInt(s)===1)?'是':'否')
  },
  formatAge: (s)=> {
    switch(s) {
      case -1:
      case 0: ret = '无要求'; break;
      case 1: ret = '15到25岁'; break;
      case 2: ret = '26到35岁'; break;
      case 3: ret = '36岁以上'; break;
    }
    return ret;
  },
  formatTaobaoLevel: (s)=> {
    switch(s) {
      case 1: ret = '1心~2心'; break;
      case 2: ret = '3心~4心'; break;
      case 3: ret = '5心~1钻'; break;
      case 4: ret = '2钻~4钻'; break;
      case 5: ret = '5钻以上'; break;
      default: ret = '无要求'; break;
    }
    return ret;
  },
  formatRepeat: (s)=> {
    switch(s) {
      case 0: ret = '15天不重复'; break;
      case 1: ret = '30天不重复'; break;
      case 2: ret = '60天不重复'; break;
      case 3: ret = '永久不重复'; break;
      default: ret = '无要求'; break;
    }
    return ret;
  },
  formatExpressStatus: (s) => {
    switch(s) {
      case -1: ret = '未发货'; break;
      case 0: ret = '已发'; break;
      case 1: ret = '已收'; break;
    }
    return ret;
  },
  formatPlatformIcon: (s) => {
    switch(s) {
      case -1: ret = '未发货'; break;
      case 0: ret = '已发'; break;
      case 1: ret = '已收'; break;
    }
    return ret;
  },
  formatNull: (s) => {
    ret = (s!=="")?s:"无要求";
    return ret;
  },
  formatEvalReq: (s, t)=> {
    arr = s.split("");
    ret = [];
    arr.forEach( (v)=>{

      if (t === 'pay') {
        switch( parseInt(v) ) {
          case 1: ret.push('普通评价任务'); break;
          case 2: ret.push('关键字好评任务'); break;
          case 3: ret.push('图片好评任务'); break;
          case 4: ret.push('文字好评任务'); break;
        }
      }else{
        switch( parseInt(v) ) {
          case 1: ret.push('浏览任务'); break;
          case 2: ret.push('收藏商品'); break;
          case 3: ret.push('关注店铺'); break;
          case 4: ret.push('加购'); break;
        }
      }
      
    })
    return ret.join('/')
  },
  formatShopType: (s) => {
    if(s === '淘宝') {
      ret = 'taobao.png'
    }else if ( s === '京东' ){
      ret = 'jingdong.png'
    }
    return ret;
  },
  formatPayMoneyType: (s) => {
    if(parseInt(s) === 0) {
      ret = '卖家返款'
    }else{
      ret = '买家返款'
    }
    return ret;
  },
  getTaskType: (s) => {
    if(s.split('')[0] === 'L') {
      ret = 'browse'
    }else{
      ret = 'pay'
    }
    return ret;
  },
  display: (s, t) => {
    if ((s === 'pay')&&(!t)) {
      ret = 'hide'
    }

    if ((s === 'browse')&&(!t)) {
      ret = 'hide'
    }

    return ret;
  }
}



// RENDER TMPL FUNCTION
const renderTmpl = (url, data, help = null) => {
  return new Promise((resolve, reject) => {
    $("body").append(LOADER);
    $.ajax(url).done(tmpl => {
      $("#i-mask").remove()
      resolve($.templates(tmpl).render(data, help));
    })
  })
}


function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

// UPLOAD IMAGE FUNCTION
var uploadFile = function(target) {
  return new Promise(function(resolve, reject){

    let obj = { key: guid() }
    promiseNoMask('get', ['/cloudUploadUrl', encodeQuery(obj)].join('?'), null,  (url)=>{
     
      $.ajax({    
        url: url,
        type: 'PUT',
        data: target,
        async:false,
        cache: false,
        processData: false,
        contentType: false,
        success: function(data,file){
          resolve(obj.key);
        }
      })
    }, null)

  })
}



function saveCookie(data) {
  // 先获取 password 和 userType，防止清空
  data.password ? null : data.password = cookie('password');
  data.userType || data.userType === 0 ? null : data.userType = cookie('userType');
  $.cookie('cko', JSON.stringify(data), { expires: 30 });
}

function cookie(id) {
  var obj = JSON.parse($.cookie('cko'));

  return (obj!= null)?obj[id]:null;
}

function cookie2(id, pid) {
  var obj = JSON.parse($.cookie('cko'));
  return obj[pid][0] ? obj[pid][0][id] : null;
}

function initUserInfo() {
  let obj = { mobile: cookie('mobile'), password: cookie('password') };
  let url = parseInt(cookie('userType')) === 0 ? URL_BUY_LOGIN : URL_SELL_LOGIN;
  promiseData('POST', url, JSON.stringify(obj), (e) => {
    saveCookie(e.data);
  });
}

// 获取url中的参数
function getUrlParam(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}


function saveList(s, list) {
  var data = {};
  for(i=0; i<list.length; i++) {
    data[list[i]] = s[list[i]];
  }
  return data;
}

function encodeQuery(obj) {
  const params = []

  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    // 如果值为undefined我们将其置空
    if (typeof value === 'undefined') {
      value = ''
    }
    // 对于需要编码的文本（比如说中文）我们要进行编码
    params.push([key, encodeURIComponent(value)].join('='))
  })

  return params.join('&')
}


function getCheckedVal(el) {
  let list = []
  $('input:checkbox[name=' + el + ']').each(function(i){
      if($(this).prop('checked')) {
        list.push($(this).val())
      }
   })
   return list.join(';')
}



function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}


function goBack(){  
    //解决Safari中后退功能的兼容问题  
    if (navigator.userAgent && /(iPhone|iPad|iPod|Safari)/i.test(navigator.userAgent)) {  
        window.location.href = window.document.referrer;  
    } else {  
        window.history.back(-1);  //根据需要可使用history.go(-1);  
    }  
}  


function clickMenu(id) {
  $(`#${id}`, parent.document)[0].click();
}



function formatCost(ret) {
  let index =0;
  let result = Object.assign({}, ret[0]);
  result.data = []
  if (ret.length>1) {
    index = 1;
  }
  for(i=index;i<ret.length;i++) {
    result.data.push(ret[i]);
  }
  return result;
}