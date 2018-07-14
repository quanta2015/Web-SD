// BASIC DEF
const CODE_COUNT = 60
const BUY = 0
const SELL = 1
const ADMIN = 2
const HOST = 'http://103.251.90.136'
// const HOST = 'http://122.152.199.90'


const AUDIT_PASS = 1
const AUDIT_FAIL = 2
const WITHDRAW_FEE = 0.05
const REFRESH_TIME = 30000

const MENU = {
  selMgr: ['auditShop;审核店铺;;:auditTask;审核垫付任务;pay;:auditTask;审核浏览任务;browse;:auditRecharge;审核充值;;:auditVipRecharge;审核卖家VIP缴费;1;:appealHandle;卖家申诉处理;1;:defriendLog;卖家拉黑记录;;'],
  buyMgr: ['auditIdCard;审核身份证;;:auditAccount;审核账号;;:auditQQ;审核QQ;;:auditVipRecharge;审核买家VIP缴费;0;:appealHandle;买家申诉处理;0;'],
  finMgr: [';XXXX;;:;XXXX;;']
}

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


const appealType = [
{ id: 0, type: 'buy',desc: '找不到该商品'},
{ id: 1,type: 'buy',desc: '垫付价格不一致'},
{ id: 2,type: 'buy',desc: '其他问题'},
{ id: 3,type: 'sel',desc: '买家在操作聊天过程中出现刷单字眼、催促商家返款等'},
{ id: 4,type: 'sel',desc: '买家未按商家提出的额外要求操作'},
{ id: 5,type: 'sel',desc: '买家未按任务要求操作'},
{ id: 6,type: 'sel',desc: '返款金额问题'},
{ id: 7,type: 'sel',desc: '垫付价格不一致'},
{ id: 8,type: 'sel',desc: '买家提供虚假收货地址导致商家无法发货'},
{ id: 9,type: 'sel',desc: '商家判定的买家其他违规操作'}]

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
const TMPL_SELL_FORZEN_LIST      = '/tmpl/sell/list_forzen.tmpl'
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
const MSG_BIND_SUCCESS        = '提交成功，待审核!'
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
  'img/login01.png',
  'img/login02.png'
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
      case 6: ret = '抽佣奖励';break;
      case 7: ret = '初次任务赏金';break;
      case 8: ret = '买家超时取消任务罚款';break;
      case 9: ret = '卖家罚款';break;
      case 10: ret = '预付资金';break;
      case 11: ret = '结账';break;
      case 12: ret = '首单现金奖励';break;
      case 13: ret = '购买vip奖励';break;
    }
    return ret;
  },
  formatOrderStatus: (s)=> {
    switch(s) {
      case  0: ret = '待处理';    break;
      case 10: ret = '待发货';    break;
      case 20: ret = '待评价';    break;
      case 30: ret = '待审核'; break;
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
  formatSex: (s)=> {
    return (((parseInt(s)===0)||(s===''))?'无要求':s)
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
    switch(parseInt(s)) {
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
  },
  formatAppeal: (s) => {
    switch(s) {
      case 0: ret = '找不到该商品'; break;
      case 1: ret = '垫付价格不一致'; break;
      case 2: ret = '其他问题'; break;
      case 3: ret = '买家聊天出现刷单、催促商家返款等'; break;
      case 4: ret = '买家未按商家提出的额外要求操作'; break;
      case 5: ret = '买家未按任务要求操作'; break;
      case 6: ret = '返款金额问题'; break;
      case 7: ret = '垫付价格不一致'; break;
      case 8: ret = '买家提供虚假收货地址导致商家无法发货'; break;
      case 9: ret = '商家判定的买家其他违规操作'; break;
      default: ret = ''; break;
    }
    return ret;
  },
  isArrayNull: (s) => {
    (s.length>0)?ret=true:ret=false;
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
  // data.password ? null : data.password = cookie('password');
  // data.userType || data.userType === 0 ? null : data.userType = cookie('userType');
  $.cookie('cko', JSON.stringify(data), { expires: 365 });
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


function fix(val) {
  return parseFloat(val).toFixed(2)
}


function doCountTask() {
  let count = 0;
  $('.task-count').each(function() {
    count += parseInt($(this).val() || 0);
  });
  $('#task-count').val(count);

  let taskCount = 1;
  $('.task-index').each( (i,e)=>{
    $(e).text(`第 ${taskCount} 单任务`)  
    taskCount ++;
  })
}


function getTaskType(s) {
  if(s.split('')[0] === 'L') {
    ret = 'browse'
  }else{
    ret = 'pay'
  }
  return ret;
}


function updateBuyMoney() {
  promiseNoMask('GET','/buyer/buyer_balance',null, (e)=>{
    $("#u-money", window.parent.document).text( fix(e.balance+e.servicefee) );
    $("#u-balance", window.parent.document).text( fix(e.balance) );
    
  }, null)
}


function updateSellMoney() {
  promiseNoMask('GET',URL_SELL_BALANCE,null, (e)=>{
    $("#u-money", window.parent.document).text( fix(e.balance));
  }, null)
}


function changeType(platform) {
  if ( platform === '淘宝' ) {
    $('.form-group-tb').removeClass('hide')
    $('.form-group-jd').addClass('hide')
    $('#r-task-mtb').prop('checked',true)
    $('#r-task-mjd').prop('checked',false)
  }else if(platform === '京东') {
    $('.form-group-tb').addClass('hide')
    $('.form-group-jd').removeClass('hide')
    $('#r-task-mtb').prop('checked',false)
    $('#r-task-mjd').prop('checked',true)
  }
}

function initTimeControl(index) {
  $(`.task-wrap-item-${index} .timepicker-24`).timepicker({ showMeridian: false });
}

function initNotice() {
  promiseTmpl('GET', '/tmpl/list_notice.tmpl','/admin/notice_list', null, (r, ret)=>{
    $(".m-notice").after($.templates(r).render(ret, rdHelper));
  })
}





function isMobile (ua) {
  if (!ua && typeof navigator != 'undefined') ua = navigator.userAgent;
  if (ua && ua.headers && typeof ua.headers['user-agent'] == 'string') {
    ua = ua.headers['user-agent'];
  }
  if (typeof ua != 'string') return false;

  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4));
}



function doReloadCode() {
  $('#vertifyCode').attr('src',HOST + `/getVerify?${Math.random()}`)
}