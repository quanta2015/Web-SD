// BASIC DEF
const CODE_COUNT = 60
const BUY = 0
const SELL = 1
const ADMIN = 2
// const HOST = 'http://103.251.90.136'
// const HOST = 'http://122.152.199.90'
 // let dev = true;
let dev = false;

if (dev) {
  HOST = 'http://103.251.90.136'
  // HOST = 'http://122.152.199.90'
}else{
  HOST = ''
}

const AUDIT_PASS = 1
const AUDIT_FAIL = 2
const WITHDRAW_FEE = 0.05
const REFRESH_TIME = 30000




const MENU = {
  selMgr: ['auditShop;审核店铺;;:auditTask;审核垫付任务;pay;:auditTask;审核浏览任务;browse;:auditRecharge;审核充值;;:auditVipRecharge;审核卖家VIP缴费;1;:appealHandle;卖家申诉处理;1;:defriendLog;卖家拉黑记录;;'],
  buyMgr: ['auditIdCard;审核身份证;;:auditAccount;审核账号;;:auditQQ;审核QQ;;:auditVipRecharge;审核买家VIP缴费;0;:appealHandle;买家申诉处理;0;'],
  finMgr: ['chartSelAccount;商家账户报表;;:chartBuyAccount;买家账户报表;;:chartPlatformStats;平台统计报表;;:chartSelFreeze;商家冻结金表;;:chartSelExpenseAudit;商家费用审核表;;:chartBuyExpenseAudit;买家费用审核表;;'],
  opeMgr: ['chartOpeSyn;运营综合报表;;:chartVipCharge;VIP管理报表;;:chartSelService;商家客服报表;;:chartBuyService;买家客服报表;;']
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
    levels: [ {name:'一心', val:0 },
              {name:'二心', val:1 },
              {name:'三心', val:2 },
              {name:'四心', val:3 },
              {name:'五心', val:4 },
              {name:'一钻', val:5 },
              {name:'二钻', val:6 },
              {name:'三钻', val:7 },
              {name:'四钻', val:8 },
              {name:'五钻', val:9 }
    ],
    levelsVal: [
      '0','1','2','3','4',
      '5','6','7','8','9',
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
  $.when(
    $.ajax(urlTmpl), 
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




function promiseUpload(url,file){
      var formData = new FormData();
      formData.append("file", file);
      $.ajax({    
        url: HOST + url,
        type: 'POST',
        data: formData,
        async:false,
        cache: false,
        dataType: "json",
        processData: false,
        contentType: false
      }).done(e=>{
        console.log(e);
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
  getLength: (list) => {    
    if (typeof list === 'undefined') return 0;
    if (list === '') return 0;
    return list.length},
  formatTime: (t) => { return moment(t).format("YYYY-M-D") },
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
      case 30: ret = '待审核';    break;
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
  formatBoolEx: (s)=> {
    return ((s)?'是':'否')
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
  formatFrozen: (s)=> {
    return ((s)?'冻结中':'正常')
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
  },
  formatTaobaoVal: (s) => {
    switch(parseInt(s)) {
      case 0: ret = '一心';break;
      case 1: ret = '二心';break;
      case 2: ret = '三心';break;
      case 3: ret = '四心';break;
      case 4: ret = '五心';break;
      case 5: ret = '一钻';break;
      case 6: ret = '二钻';break;
      case 7: ret = '三钻';break;
      case 8: ret = '四钻';break;
      case 9: ret = '五钻';break;
    }
    return ret;
  },
  isEqual: (v1, v2) => {
    if( parseInt(v1) === parseInt(v2)) {
      return true;
    }else{
      return false;
    }
  },
  formatForzen: (s) => {
    if( parseInt(s) === 0) {
      return "冻结中";
    }else{
      return "已结账";
    }
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
// var uploadFile = function(target) {
//   return new Promise(function(resolve, reject){

//     let obj = { key: guid() }
//     promiseNoMask('get', ['/cloudUploadUrl', encodeQuery(obj)].join('?'), null,  (url)=>{
     
//       $.ajax({    
//         url: url,
//         type: 'PUT',
//         data: target,
//         async:false,
//         cache: false,
//         processData: false,
//         contentType: false,
//         success: function(data,file){
//           resolve(obj.key);
//         }
//       })
//     }, null)

//   })
// }



function saveCookie(data) {
  // 先获取 password 和 userType，防止清空
  // data.password ? null : data.password = cookie('password');
  // data.userType || data.userType === 0 ? null : data.userType = cookie('userType');
  Cookies.set('cko', JSON.stringify(data), { expires: 365 });
}

function cookie(id) {
  var obj = JSON.parse(Cookies.get('cko'));

  return (obj!= null)?obj[id]:null;
}

function cookie2(id, pid) {
  var obj = JSON.parse(Cookies.get('cko'));
  return obj[pid][0] ? obj[pid][0][id] : null;
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
  promiseTmpl('GET', '/tmpl/list_notice.tmpl','/notice_list', null, (r, ret)=>{
    $(".m-notice").after($.templates(r).render(ret, rdHelper));
  })
}



function doReloadCode() {
  $('#vertifyCode').attr('src',HOST + `/getVerify?${Math.random()}`)
}


function isMobile (ua) {
  if (!ua && typeof navigator != 'undefined') ua = navigator.userAgent;
  if (ua && ua.headers && typeof ua.headers['user-agent'] == 'string') {
    ua = ua.headers['user-agent'];
  }
  if (typeof ua != 'string') return false;

  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4));
}



//exif 库
(function(){var debug=false;var root=this;var EXIF=function(obj){if(obj instanceof EXIF){return obj}if(!(this instanceof EXIF)){return new EXIF(obj)}this.EXIFwrapped=obj};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){exports=module.exports=EXIF}exports.EXIF=EXIF}else{root.EXIF=EXIF}var ExifTags=EXIF.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"};var TiffTags=EXIF.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"};var GPSTags=EXIF.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"};var IFD1Tags=EXIF.IFD1Tags={256:"ImageWidth",257:"ImageHeight",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",273:"StripOffsets",274:"Orientation",277:"SamplesPerPixel",278:"RowsPerStrip",279:"StripByteCounts",282:"XResolution",283:"YResolution",284:"PlanarConfiguration",296:"ResolutionUnit",513:"JpegIFOffset",514:"JpegIFByteCount",529:"YCbCrCoefficients",530:"YCbCrSubSampling",531:"YCbCrPositioning",532:"ReferenceBlackWhite"};var StringValues=EXIF.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}};
function addEvent(element,event,handler){if(element.addEventListener){element.addEventListener(event,handler,false)}else{if(element.attachEvent){element.attachEvent("on"+event,handler)}}}function imageHasData(img){return !!(img.exifdata)}function base64ToArrayBuffer(base64,contentType){contentType=contentType||base64.match(/^data\:([^\;]+)\;base64,/mi)[1]||"";base64=base64.replace(/^data\:([^\;]+)\;base64,/gmi,"");var binary=atob(base64);var len=binary.length;var buffer=new ArrayBuffer(len);var view=new Uint8Array(buffer);for(var i=0;i<len;i++){view[i]=binary.charCodeAt(i)}return buffer}function objectURLToBlob(url,callback){var http=new XMLHttpRequest();http.open("GET",url,true);http.responseType="blob";http.onload=function(e){if(this.status==200||this.status===0){callback(this.response)}};http.send()}function getImageData(img,callback){function handleBinaryFile(binFile){var data=findEXIFinJPEG(binFile);img.exifdata=data||{};var iptcdata=findIPTCinJPEG(binFile);img.iptcdata=iptcdata||{};if(EXIF.isXmpEnabled){var xmpdata=findXMPinJPEG(binFile);img.xmpdata=xmpdata||{}}if(callback){callback.call(img)}}if(img.src){if(/^data\:/i.test(img.src)){var arrayBuffer=base64ToArrayBuffer(img.src);handleBinaryFile(arrayBuffer)}else{if(/^blob\:/i.test(img.src)){var fileReader=new FileReader();fileReader.onload=function(e){handleBinaryFile(e.target.result)};objectURLToBlob(img.src,function(blob){fileReader.readAsArrayBuffer(blob)})}else{var http=new XMLHttpRequest();http.onload=function(){if(this.status==200||this.status===0){handleBinaryFile(http.response)}else{throw"Could not load image"}http=null};http.open("GET",img.src,true);http.responseType="arraybuffer";http.send(null)}}}else{if(self.FileReader&&(img instanceof self.Blob||img instanceof self.File)){var fileReader=new FileReader();fileReader.onload=function(e){if(debug){console.log("Got file of length "+e.target.result.byteLength)}handleBinaryFile(e.target.result)};fileReader.readAsArrayBuffer(img)}}}function findEXIFinJPEG(file){var dataView=new DataView(file);if(debug){console.log("Got file of length "+file.byteLength)}if((dataView.getUint8(0)!=255)||(dataView.getUint8(1)!=216)){if(debug){console.log("Not a valid JPEG")}return false}var offset=2,length=file.byteLength,marker;while(offset<length){if(dataView.getUint8(offset)!=255){if(debug){console.log("Not a valid marker at offset "+offset+", found: "+dataView.getUint8(offset))}return false}marker=dataView.getUint8(offset+1);if(debug){console.log(marker)}if(marker==225){if(debug){console.log("Found 0xFFE1 marker")}return readEXIFData(dataView,offset+4,dataView.getUint16(offset+2)-2)}else{offset+=2+dataView.getUint16(offset+2)}}}function findIPTCinJPEG(file){var dataView=new DataView(file);if(debug){console.log("Got file of length "+file.byteLength)}if((dataView.getUint8(0)!=255)||(dataView.getUint8(1)!=216)){if(debug){console.log("Not a valid JPEG")}return false}var offset=2,length=file.byteLength;var isFieldSegmentStart=function(dataView,offset){return(dataView.getUint8(offset)===56&&dataView.getUint8(offset+1)===66&&dataView.getUint8(offset+2)===73&&dataView.getUint8(offset+3)===77&&dataView.getUint8(offset+4)===4&&dataView.getUint8(offset+5)===4)};while(offset<length){if(isFieldSegmentStart(dataView,offset)){var nameHeaderLength=dataView.getUint8(offset+7);if(nameHeaderLength%2!==0){nameHeaderLength+=1}if(nameHeaderLength===0){nameHeaderLength=4}var startOffset=offset+8+nameHeaderLength;var sectionLength=dataView.getUint16(offset+6+nameHeaderLength);return readIPTCData(file,startOffset,sectionLength);break}offset++}}var IptcFieldMap={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};function readIPTCData(file,startOffset,sectionLength){var dataView=new DataView(file);var data={};var fieldValue,fieldName,dataSize,segmentType,segmentSize;var segmentStartPos=startOffset;while(segmentStartPos<startOffset+sectionLength){if(dataView.getUint8(segmentStartPos)===28&&dataView.getUint8(segmentStartPos+1)===2){segmentType=dataView.getUint8(segmentStartPos+2);if(segmentType in IptcFieldMap){dataSize=dataView.getInt16(segmentStartPos+3);segmentSize=dataSize+5;fieldName=IptcFieldMap[segmentType];fieldValue=getStringFromDB(dataView,segmentStartPos+5,dataSize);if(data.hasOwnProperty(fieldName)){if(data[fieldName] instanceof Array){data[fieldName].push(fieldValue)}else{data[fieldName]=[data[fieldName],fieldValue]}}else{data[fieldName]=fieldValue}}}segmentStartPos++}return data}function readTags(file,tiffStart,dirStart,strings,bigEnd){var entries=file.getUint16(dirStart,!bigEnd),tags={},entryOffset,tag,i;for(i=0;i<entries;i++){entryOffset=dirStart+i*12+2;tag=strings[file.getUint16(entryOffset,!bigEnd)];if(!tag&&debug){console.log("Unknown tag: "+file.getUint16(entryOffset,!bigEnd))}tags[tag]=readTagValue(file,entryOffset,tiffStart,dirStart,bigEnd)}return tags}function readTagValue(file,entryOffset,tiffStart,dirStart,bigEnd){var type=file.getUint16(entryOffset+2,!bigEnd),numValues=file.getUint32(entryOffset+4,!bigEnd),valueOffset=file.getUint32(entryOffset+8,!bigEnd)+tiffStart,offset,vals,val,n,numerator,denominator;
switch(type){case 1:case 7:if(numValues==1){return file.getUint8(entryOffset+8,!bigEnd)}else{offset=numValues>4?valueOffset:(entryOffset+8);vals=[];for(n=0;n<numValues;n++){vals[n]=file.getUint8(offset+n)}return vals}case 2:offset=numValues>4?valueOffset:(entryOffset+8);return getStringFromDB(file,offset,numValues-1);case 3:if(numValues==1){return file.getUint16(entryOffset+8,!bigEnd)}else{offset=numValues>2?valueOffset:(entryOffset+8);vals=[];for(n=0;n<numValues;n++){vals[n]=file.getUint16(offset+2*n,!bigEnd)}return vals}case 4:if(numValues==1){return file.getUint32(entryOffset+8,!bigEnd)}else{vals=[];for(n=0;n<numValues;n++){vals[n]=file.getUint32(valueOffset+4*n,!bigEnd)}return vals}case 5:if(numValues==1){numerator=file.getUint32(valueOffset,!bigEnd);denominator=file.getUint32(valueOffset+4,!bigEnd);val=new Number(numerator/denominator);val.numerator=numerator;val.denominator=denominator;return val}else{vals=[];for(n=0;n<numValues;n++){numerator=file.getUint32(valueOffset+8*n,!bigEnd);denominator=file.getUint32(valueOffset+4+8*n,!bigEnd);vals[n]=new Number(numerator/denominator);vals[n].numerator=numerator;vals[n].denominator=denominator}return vals}case 9:if(numValues==1){return file.getInt32(entryOffset+8,!bigEnd)}else{vals=[];for(n=0;n<numValues;n++){vals[n]=file.getInt32(valueOffset+4*n,!bigEnd)}return vals}case 10:if(numValues==1){return file.getInt32(valueOffset,!bigEnd)/file.getInt32(valueOffset+4,!bigEnd)}else{vals=[];for(n=0;n<numValues;n++){vals[n]=file.getInt32(valueOffset+8*n,!bigEnd)/file.getInt32(valueOffset+4+8*n,!bigEnd)}return vals}}}function getNextIFDOffset(dataView,dirStart,bigEnd){var entries=dataView.getUint16(dirStart,!bigEnd);return dataView.getUint32(dirStart+2+entries*12,!bigEnd)}function readThumbnailImage(dataView,tiffStart,firstIFDOffset,bigEnd){var IFD1OffsetPointer=getNextIFDOffset(dataView,tiffStart+firstIFDOffset,bigEnd);if(!IFD1OffsetPointer){return{}}else{if(IFD1OffsetPointer>dataView.byteLength){return{}}}var thumbTags=readTags(dataView,tiffStart,tiffStart+IFD1OffsetPointer,IFD1Tags,bigEnd);if(thumbTags["Compression"]){switch(thumbTags["Compression"]){case 6:if(thumbTags.JpegIFOffset&&thumbTags.JpegIFByteCount){var tOffset=tiffStart+thumbTags.JpegIFOffset;var tLength=thumbTags.JpegIFByteCount;thumbTags["blob"]=new Blob([new Uint8Array(dataView.buffer,tOffset,tLength)],{type:"image/jpeg"})}break;case 1:console.log("Thumbnail image format is TIFF, which is not implemented.");break;default:console.log("Unknown thumbnail image format '%s'",thumbTags["Compression"])}}else{if(thumbTags["PhotometricInterpretation"]==2){console.log("Thumbnail image format is RGB, which is not implemented.")}}return thumbTags}function getStringFromDB(buffer,start,length){var outstr="";for(var n=start;n<start+length;n++){outstr+=String.fromCharCode(buffer.getUint8(n))}return outstr}function readEXIFData(file,start){if(getStringFromDB(file,start,4)!="Exif"){if(debug){console.log("Not valid EXIF data! "+getStringFromDB(file,start,4))}return false}var bigEnd,tags,tag,exifData,gpsData,tiffOffset=start+6;if(file.getUint16(tiffOffset)==18761){bigEnd=false}else{if(file.getUint16(tiffOffset)==19789){bigEnd=true}else{if(debug){console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)")}return false}}if(file.getUint16(tiffOffset+2,!bigEnd)!=42){if(debug){console.log("Not valid TIFF data! (no 0x002A)")}return false}var firstIFDOffset=file.getUint32(tiffOffset+4,!bigEnd);if(firstIFDOffset<8){if(debug){console.log("Not valid TIFF data! (First offset less than 8)",file.getUint32(tiffOffset+4,!bigEnd))}return false}tags=readTags(file,tiffOffset,tiffOffset+firstIFDOffset,TiffTags,bigEnd);if(tags.ExifIFDPointer){exifData=readTags(file,tiffOffset,tiffOffset+tags.ExifIFDPointer,ExifTags,bigEnd);for(tag in exifData){switch(tag){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":exifData[tag]=StringValues[tag][exifData[tag]];break;case"ExifVersion":case"FlashpixVersion":exifData[tag]=String.fromCharCode(exifData[tag][0],exifData[tag][1],exifData[tag][2],exifData[tag][3]);break;case"ComponentsConfiguration":exifData[tag]=StringValues.Components[exifData[tag][0]]+StringValues.Components[exifData[tag][1]]+StringValues.Components[exifData[tag][2]]+StringValues.Components[exifData[tag][3]];break}tags[tag]=exifData[tag]}}if(tags.GPSInfoIFDPointer){gpsData=readTags(file,tiffOffset,tiffOffset+tags.GPSInfoIFDPointer,GPSTags,bigEnd);for(tag in gpsData){switch(tag){case"GPSVersionID":gpsData[tag]=gpsData[tag][0]+"."+gpsData[tag][1]+"."+gpsData[tag][2]+"."+gpsData[tag][3];break}tags[tag]=gpsData[tag]}}tags["thumbnail"]=readThumbnailImage(file,tiffOffset,firstIFDOffset,bigEnd);return tags}function findXMPinJPEG(file){if(!("DOMParser" in self)){return}var dataView=new DataView(file);if(debug){console.log("Got file of length "+file.byteLength)
}if((dataView.getUint8(0)!=255)||(dataView.getUint8(1)!=216)){if(debug){console.log("Not a valid JPEG")}return false}var offset=2,length=file.byteLength,dom=new DOMParser();while(offset<(length-4)){if(getStringFromDB(dataView,offset,4)=="http"){var startOffset=offset-1;var sectionLength=dataView.getUint16(offset-2)-1;var xmpString=getStringFromDB(dataView,startOffset,sectionLength);var xmpEndIndex=xmpString.indexOf("xmpmeta>")+8;xmpString=xmpString.substring(xmpString.indexOf("<x:xmpmeta"),xmpEndIndex);var indexOfXmp=xmpString.indexOf("x:xmpmeta")+10;xmpString=xmpString.slice(0,indexOfXmp)+'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" '+'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '+'xmlns:tiff="http://ns.adobe.com/tiff/1.0/" '+'xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" '+'xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" '+'xmlns:exif="http://ns.adobe.com/exif/1.0/" '+'xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" '+'xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" '+'xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" '+'xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" '+'xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" '+xmpString.slice(indexOfXmp);var domDocument=dom.parseFromString(xmpString,"text/xml");return xml2Object(domDocument)}else{offset++}}}function xml2json(xml){var json={};if(xml.nodeType==1){if(xml.attributes.length>0){json["@attributes"]={};for(var j=0;j<xml.attributes.length;j++){var attribute=xml.attributes.item(j);json["@attributes"][attribute.nodeName]=attribute.nodeValue}}}else{if(xml.nodeType==3){return xml.nodeValue}}if(xml.hasChildNodes()){for(var i=0;i<xml.childNodes.length;i++){var child=xml.childNodes.item(i);var nodeName=child.nodeName;if(json[nodeName]==null){json[nodeName]=xml2json(child)}else{if(json[nodeName].push==null){var old=json[nodeName];json[nodeName]=[];json[nodeName].push(old)}json[nodeName].push(xml2json(child))}}}return json}function xml2Object(xml){try{var obj={};if(xml.children.length>0){for(var i=0;i<xml.children.length;i++){var item=xml.children.item(i);var attributes=item.attributes;for(var idx in attributes){var itemAtt=attributes[idx];var dataKey=itemAtt.nodeName;var dataValue=itemAtt.nodeValue;if(dataKey!==undefined){obj[dataKey]=dataValue}}var nodeName=item.nodeName;if(typeof(obj[nodeName])=="undefined"){obj[nodeName]=xml2json(item)}else{if(typeof(obj[nodeName].push)=="undefined"){var old=obj[nodeName];obj[nodeName]=[];obj[nodeName].push(old)}obj[nodeName].push(xml2json(item))}}}else{obj=xml.textContent}return obj}catch(e){console.log(e.message)}}EXIF.enableXmp=function(){EXIF.isXmpEnabled=true};EXIF.disableXmp=function(){EXIF.isXmpEnabled=false};EXIF.getData=function(img,callback){if(((self.Image&&img instanceof self.Image)||(self.HTMLImageElement&&img instanceof self.HTMLImageElement))&&!img.complete){return false}if(!imageHasData(img)){getImageData(img,callback)}else{if(callback){callback.call(img)}}return true};EXIF.getTag=function(img,tag){if(!imageHasData(img)){return}return img.exifdata[tag]};EXIF.getIptcTag=function(img,tag){if(!imageHasData(img)){return}return img.iptcdata[tag]};EXIF.getAllTags=function(img){if(!imageHasData(img)){return{}}var a,data=img.exifdata,tags={};for(a in data){if(data.hasOwnProperty(a)){tags[a]=data[a]}}return tags};EXIF.getAllIptcTags=function(img){if(!imageHasData(img)){return{}}var a,data=img.iptcdata,tags={};for(a in data){if(data.hasOwnProperty(a)){tags[a]=data[a]}}return tags};EXIF.pretty=function(img){if(!imageHasData(img)){return""}var a,data=img.exifdata,strPretty="";for(a in data){if(data.hasOwnProperty(a)){if(typeof data[a]=="object"){if(data[a] instanceof Number){strPretty+=a+" : "+data[a]+" ["+data[a].numerator+"/"+data[a].denominator+"]\r\n"}else{strPretty+=a+" : ["+data[a].length+" values]\r\n"}}else{strPretty+=a+" : "+data[a]+"\r\n"}}}return strPretty};EXIF.readFromBinaryFile=function(file){return findEXIFinJPEG(file)};if(typeof define==="function"&&define.amd){define("exif-js",[],function(){return EXIF})}}.call(this));




//图片压缩库
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Compress=e():t.Compress=e()}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var a=n[i]={exports:{},id:i,loaded:!1};return t[i].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){var i,a,r;!function(o,u){a=[t,n(1),n(2),n(3),n(4),n(5),n(6)],i=u,r="function"==typeof i?i.apply(e,a):i,!(void 0!==r&&(t.exports=r))}(this,function(t,e,n,i,a,r,o){"use strict";function u(t){return t&&t.__esModule?t:{default:t}}function s(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var d=u(e),l=u(n),c=u(i),h=u(a),v=u(r),p=u(o),g=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),w=function(){function t(){f(this,t)}return g(t,[{key:"attach",value:function(t,e){var n=this;return new Promise(function(i,a){var r=document.querySelector(t);r.setAttribute("accept","image/*"),r.addEventListener("change",function(t){var a=n.compress([].concat(s(t.target.files)),e);i(a)},!1)})}},{key:"compress",value:function(t,e){function n(t,e){var n=new v.default(e);return n.start=window.performance.now(),n.alt=t.name,n.ext=t.type,n.startSize=t.size,p.default.orientation(t).then(function(e){return n.orientation=e,c.default.load(t)}).then(i(n))}function i(t){return function(e){return h.default.load(e).then(function(e){if(t.startWidth=e.naturalWidth,t.startHeight=e.naturalHeight,t.resize){var n=h.default.resize(t.maxWidth,t.maxHeight)(e.naturalWidth,e.naturalHeight),i=n.width,a=n.height;t.endWidth=i,t.endHeight=a}else t.endWidth=e.naturalWidth,t.endHeight=e.naturalHeight;return l.default.imageToCanvas(t.endWidth,t.endHeight,t.orientation)(e)}).then(function(e){return t.iterations=1,t.base64prefix=d.default.prefix(t.ext),a(e,t.startSize,t.quality,t.size,t.minQuality,t.iterations)}).then(function(e){return t.finalSize=d.default.size(e),d.default.data(e)}).then(function(e){t.end=window.performance.now();var n=t.end-t.start;return{data:e,prefix:t.base64prefix,elapsedTimeInSeconds:n/1e3,alt:t.alt,initialSizeInMb:l.default.size(t.startSize).MB,endSizeInMb:l.default.size(t.finalSize).MB,ext:t.ext,quality:t.quality,endWidthInPx:t.endWidth,endHeightInPx:t.endHeight,initialWidthInPx:t.startWidth,initialHeightInPx:t.startHeight,sizeReducedInPercent:(t.startSize-t.finalSize)/t.startSize*100,iterations:t.iterations}})}}function a(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,i=arguments[3],r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,o=arguments[5],u=l.default.canvasToBase64(t,n),s=d.default.size(u);return o+=1,s>i?a(t,s,n-.1,i,r,o):n>r?a(t,s,n-.1,i,r,o):n<.5?u:u}return Promise.all(t.map(function(t){return n(t,e)}))}}],[{key:"convertBase64ToFile",value:function(t,e){return l.default.base64ToFile(t,e)}}]),t}();t.exports=w})},function(t,e,n){var i,a,r;!function(n,o){a=[e],i=o,r="function"==typeof i?i.apply(e,a):i,!(void 0!==r&&(t.exports=r))}(this,function(t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=function(t){var e=t.replace(/^data:image\/\w+;base64,/,"").length;return(e-814)/1.37},n=function(t){return t.split(";")[0].match(/jpeg|png|gif/)[0]},i=function(t){return t.replace(/^data:image\/\w+;base64,/,"")},a=function(t){return"data:"+t+";base64,"};t.default={size:e,mime:n,data:i,prefix:a}})},function(t,e,n){var i,a,r;!function(n,o){a=[e],i=o,r="function"==typeof i?i.apply(e,a):i,!(void 0!==r&&(t.exports=r))}(this,function(t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"image/jpeg",n=window.atob(t),i=[],a=0;a<n.length;a++)i[a]=n.charCodeAt(a);return new window.Blob([new Uint8Array(i)],{type:e})},n=function(t,e,n){var i=document.createElement("canvas"),a=i.getContext("2d");return i.width=t,i.height=e,function(r){if(!n||n>8)return a.drawImage(r,0,0,i.width,i.height),i;switch(n>4&&(i.width=e,i.height=t),n){case 2:a.translate(t,0),a.scale(-1,1);break;case 3:a.translate(t,e),a.rotate(Math.PI);break;case 4:a.translate(0,e),a.scale(1,-1);break;case 5:a.rotate(.5*Math.PI),a.scale(1,-1);break;case 6:a.rotate(.5*Math.PI),a.translate(0,-e);break;case 7:a.rotate(.5*Math.PI),a.translate(t,-e),a.scale(-1,1);break;case 8:a.rotate(-.5*Math.PI),a.translate(-t,0)}return n>4?a.drawImage(r,0,0,i.height,i.width):a.drawImage(r,0,0,i.width,i.height),i}},i=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.75,n=t.toDataURL("image/jpeg",e);return n},a=function(t){return{KB:t/1e3,MB:t/1e6}};t.default={base64ToFile:e,imageToCanvas:n,canvasToBase64:i,size:a}})},function(t,e,n){var i,a,r;!function(n,o){a=[e],i=o,r="function"==typeof i?i.apply(e,a):i,!(void 0!==r&&(t.exports=r))}(this,function(t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=function(t){return new Promise(function(e,n){var i=new window.FileReader;i.addEventListener("load",function(t){e(t.target.result)},!1),i.addEventListener("error",function(t){n(t)},!1),i.readAsDataURL(t)})};t.default={load:e}})},function(t,e,n){var i,a,r;!function(n,o){a=[e],i=o,r="function"==typeof i?i.apply(e,a):i,!(void 0!==r&&(t.exports=r))}(this,function(t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=function(t){return new Promise(function(e,n){var i=new window.Image;i.addEventListener("load",function(){e(i)},!1),i.addEventListener("error",function(t){n(t)},!1),i.src=t})},n=function(t,e){return function(n,i){if(!t&&!e)return{width:n,height:i};var a=n/i,r=t/e,o=void 0,u=void 0;return a>r?(o=Math.min(n,t),u=o/a):(u=Math.min(i,e),o=u*a),{width:o,height:u}}};t.default={load:e,resize:n}})},function(t,e,n){var i,a,r;!function(n,o){a=[e],i=o,r="function"==typeof i?i.apply(e,a):i,!(void 0!==r&&(t.exports=r))}(this,function(t){"use strict";function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function t(n){var i=n.quality,a=void 0===i?.75:i,r=n.size,o=void 0===r?2:r,u=n.maxWidth,s=void 0===u?1920:u,f=n.maxHeight,d=void 0===f?1920:f,l=n.resize,c=void 0===l||l;e(this,t),this.start=window.performance.now(),this.end=null,this.alt=null,this.ext=null,this.startSize=null,this.startWidth=null,this.startHeight=null,this.size=1e3*o*1e3,this.endSize=null,this.endWidth=null,this.endHeight=null,this.iterations=0,this.base64prefix=null,this.quality=a,this.resize=c,this.maxWidth=s,this.maxHeight=d,this.orientation=1};t.default=n})},function(t,e,n){var i,a,r;!function(n,o){a=[e],i=o,r="function"==typeof i?i.apply(e,a):i,!(void 0!==r&&(t.exports=r))}(this,function(t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=function(t){return new Promise(function(e,n){var i=new window.FileReader;i.onload=function(t){var n=new DataView(t.target.result);65496!==n.getUint16(0,!1)&&e(-2);for(var i=n.byteLength,a=2;a<i;){var r=n.getUint16(a,!1);if(a+=2,65505===r){1165519206!==n.getUint32(a+=2,!1)&&e(-1);var o=18761===n.getUint16(a+=6,!1);a+=n.getUint32(a+4,o);var u=n.getUint16(a,o);a+=2;for(var s=0;s<u;s++)274===n.getUint16(a+12*s,o)&&e(n.getUint16(a+12*s+8,o))}else{if(65280!==(65280&r))break;a+=n.getUint16(a,!1)}}e(-1)},i.readAsArrayBuffer(t.slice(0,65536))})};t.default={orientation:e}})}])});




function isEdited(exif, dt) {
  ret = false;
  if (typeof(exif)==='undefined') return false;
  if (typeof(dt)==='undefined') return false;

  exif = exif.toLowerCase()
  if (exif.indexOf('photoshop')>=0) ret = true;
  if (exif.indexOf('acd')>=0) ret = true;
  if (exif.indexOf('snapseed')>=0) ret = true;
  if (dt.length>19) ret = true;

  return ret;
}


// UPLOAD IMAGE 
var uploadFile = function(target, check) {
    return new Promise(function(resolve, reject){


      if (check) {
        EXIF.getData(target, function() {
          sw = EXIF.getTag(this, "Software")
          dt = EXIF.getTag(this, "DateTime") 
          console.log(sw + ' ----- ' +dt);
          if (isEdited(sw,dt)) {
            notifyInfo("请选择原图上传！");
            resolve('0');
          }else{
            notifyInfo('图片通过审核！');

            const compressor = new Compress()
            compressor.compress([target], {
              size: 1,
              quality: .6,
              maxWidth: 1000,
              maxHeight: 1000,
              resize: true
            }).then((results) => {
              // console.log(results) compress results
              const output = results[0]
              const compressfile = Compress.convertBase64ToFile(output.data, output.ext)
              var obj = { key: guid() }
              promiseNoMask('get', ['/cloudUploadUrl', encodeQuery(obj)].join('?'), null,  (url)=>{
                $.ajax({
                  url: url,
                  type: 'PUT',
                  data: compressfile,
                  async:false,
                  cache: false,
                  processData: false,
                  contentType: false,
                  success: function(data,file){
                    resolve(obj.key);
                  }
                })
              }, null)
            })//end then



          }//end if
        })//end EXIF
      }else{

          const compressor = new Compress()
          compressor.compress([target], {
            size: 1,
            quality: .6,
            maxWidth: 1000,
            maxHeight: 1000,
            resize: true
          }).then((results) => {
            // console.log(results) compress results
            const output = results[0]
            const compressfile = Compress.convertBase64ToFile(output.data, output.ext)
            var obj = { key: guid() }
            promiseNoMask('get', ['/cloudUploadUrl', encodeQuery(obj)].join('?'), null,  (url)=>{
              $.ajax({
                url: url,
                type: 'PUT',
                data: compressfile,
                async:false,
                cache: false,
                processData: false,
                contentType: false,
                success: function(data,file){
                  resolve(obj.key);
                }
              })
            }, null)
          })//end then

      }//end if check


    }) //end return promise
}


function showModel(id) {
  $(`${id}`).height( $(document).height())
  $(`${id}`).show();
}



