// BASIC DEF
const CODE_COUNT = 10
const BUY = 0
const SELL = 1
const HOST = 'http://114.116.31.36:8011'
const IMG_PREFIX = HOST + '/file/'
const AUDIT_PASS = 2
const AUDIT_FAIL = 3

const PLATFORM_DATA = {
  jingdong: {
    type: '京东',
    creditType: '白条',
    levels: ['注册会员','铜牌会员','银牌会员','金牌会员','钻石会员'],
    cko: 'jingdongList',
  },
  taobao: {
    type: '淘宝',
    creditType: '花呗',
    levels: [
      '一星','二星','三星','四星','五星',
      '一钻','二钻','三钻','四钻','五钻',
      '一皇冠','二皇冠','三皇冠','四皇冠','五皇冠',
      '一金冠','二金冠','三金冠','四金冠','五金冠',
    ],
    cko: 'taobaoList',
  } 
}

const AUDIT_STATUS = {
  0: '未审核',
  1: '待审核',
  2: '审核通过',
  3: '审核不通过',
}

const BANKS = ['工商银行', '农业银行', '建设银行', '中国银行', '招商银行']

// URL DEF

const URL_SMS_SEND          = '/sms_send'
const URL_EXIT              = '/exist'
const URL_UPLOAD_FILE       = '/upload'

const URL_SELL_REG          = '/shoper/shoper_reg'
const URL_SELL_LOGIN        = '/shoper/shoper_login'
const URL_TASK_PUBLISH      = '/task/task_publish'
const URL_TASK_ALL_PLATFORM = '/task/all_platform'
const URL_SELL_SHOPS        = '/shoper/shoper_shops/'
const URL_SELL_SHOP_DEL     = '/shoper/shop_del/'
const URL_SELL_SHOP_UPDATE  = '/shoper/shop_update/'
const URL_SELL_ALL_TASK     = '/task/all_tasks/'
const URL_SELL_ALL_RECHARGE = '/shoper/shoper_transfer_list'
const URL_SELL_UPDATE       = '/shoper/shoper_update'
const URL_SELL_PASSWD       = '/edit_password'
const URL_SELL_PAY_TASK     = '/task/prePayForTask?taskId='


const URL_ADMIN_ALL_TASK    = '/admin/all_tasks'
const URL_ADMIN_TASK_AUDIT  = '/admin/task_approve'
const URL_ADMIN_ALL_IDCARD  = '/admin/buyer_list'
const URL_ADMIN_IDCARD_AUDIT= '/admin/buyer_approve'
const URL_ADMIN_ACOUNT_LIST = '/admin/buyer_acount_list'
const URL_ADMIN_ACOUNT_AUDIT= '/admin/buyer_acount_approve'
const URL_ADMIN_LOGIN       = '/admin/admin_login'
const URL_ADMIN_ALL_RECHARGE= '/admin/shoper_transfer_list'
const URL_ADMIN_AUDIT_RECHARGE = '/admin/shoper_transfer_approve'


const URL_SHOP_BIND         = '/shoper/shop_bind'
const URL_BUYER_GET_TASK    = '/buyertask/receive_task'
const URL_BUY_REG           = '/buyer/buyer_reg'
const URL_BUY_LOGIN         = '/buyer/buyer_login'
const URL_BUY_BIND_ID_CARD  = '/buyer/buyer_validate'
const URL_BUY_BIND_BANK     = '/buyer/buyer_bankbind'
const URL_BUY_BIND_ACCOUNT  = '/buyer/buyer_acountbind'
const URL_BUYER_ALL_TASK    = '/buyertask/all_tasks'

const URL_BUYER_ALL_ORDER   = '/buyertask/all_tasks'


// TMPL DEF

// SELL
const TMPL_SELL_SRH_WITHDRAW      = '/tmpl/sell/srh_withdraw.tmpl'
const TMPL_SELL_SRH_CAPITAL       = '/tmpl/sell/srh_capital.tmpl'
const TMPL_SELL_RECHARGE_LIST     = '/tmpl/sell/list_recharge.tmpl'
const TMPL_SELL_CAPITAL_LIST      = '/tmpl/sell/list_capital.tmpl'
const TMPL_SELL_WITHDRAW_LIST     = '/tmpl/sell/list_withdraw.tmpl'
const TMPL_SELL_TASK_LIST         = '/tmpl/sell/list_task.tmpl'
const TMPL_SELL_SHOP_LIST         = '/tmpl/sell/list_shop.tmpl'
const TMPL_SELL_CREATETASK_P      = '/tmpl/sell/createtask_plain.tmpl'
const TMPL_SELL_CREATETASK_I      = '/tmpl/sell/createtask_img.tmpl'
const TMPL_SELL_SHOP_SELECT       = '/tmpl/sell/select_shop.tmpl'
const TMPL_SELL_PLAT_SELECT       = '/tmpl/sell/select_platform.tmpl'



// ADMIN
const TMPL_ADMIN_TASK_LIST        = '/tmpl/admin/list_task.tmpl'
const TMPL_ADMIN_IDCARD_LIST      = '/tmpl/admin/list_idcard.tmpl'
const TMPL_ADMIN_ACOUNT_LIST      = '/tmpl/admin/list_account.tmpl'
const TMPL_ADMIN_RECHARGE_LIST    = '/tmpl/admin/list_admin_recharge.tmpl'


// BUYER
const TMPL_BUY_BIND_IDCARD        = '/tmpl/buy/bind_idcard.tmpl'
const TMPL_BUY_BIND_BKCARD        = '/tmpl/buy/bind_bkcard.tmpl'
const TMPL_BUY_BIND_ACCOUNT       = '/tmpl/buy/bind_account.tmpl'
const TMPL_BUY_ALL_TASK           = '/tmpl/buy/list_all_task.tmpl'
const TMPL_BUY_ALL_ORDER          = '/tmpl/buy/list_all_order.tmpl'

const TMPL_ADDR                   = '/tmpl/addr.tmpl'
const TMPL_REG                    = '/tmpl/reg.tmpl'


// MSG DEF
const MSG_LOGIN_SUCCESS   = '登录成功！'
const MSG_REGIS_SUCCESS   = '注册成功！'
const MSG_PUBLISH_SUCCESS = '发布成功！'
const MSG_BIND_SUCCESS    = '绑定成功！'
const MSG_UPDATE_SUCCESS  = '修改信息成功'
const MSG_RECHARGE_SUCCESS  = '充值成功！'

const TEXT_BIND_SUCCESS = '已绑定'

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
  password: /\w{6,16}/,
};


// FUNCTION DEF
function relogin() {
  top.location.href = '/index.html';
}

function errorInfo(info) {
  alertify.set({ delay: 5000 });
  alertify.error(info);
}

function notifyInfo(info) {
  alertify.set({ delay: 5000 });
  alertify.success(info);
}

function msgbox(info,titleA,titleB,cb) {
  bootbox.confirm({
    message: info,
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
    message: info,
    size: 'small',
    callback: cb
  });
}

function goto(url) {
  $("#mainframe", parent.document.body).attr("src", url);
}


// AJAX FUNCTION DEF
function promiseData(method, url, data, cb) {
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
  promise.done(cb);
}


function TmplData(urlTmpl, urlData, data, cb) {
  $.when($.ajax(urlTmpl), 
    $.ajax({
      type: 'GET',
      url: HOST + urlData,
      dataType: "json",
      contentType: "application/json",
      data: data,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
  })).done(cb)
}



// TMPL FUNCTION DEF
var timeHelp = {
  formatTime: (t) => { return moment(t).format("YYYY-M-D h:mm:ss") }
}


// RENDER TMPL FUNCTION
const renderTmpl = (url, data, help = null) => {
  return new Promise((resolve, reject) => {
    $.ajax(url).done(tmpl => {
      resolve($.templates(tmpl).render(data, help));
    })
  })
}



// UPLOAD IMAGE FUNCTION
var uploadFile = function(target) {
  return new Promise(function(resolve, reject){
    var file = target;
    var fileSize = file.size;
    var maxSize = 5048576;    //最大5MB
    if(parseInt(fileSize) >= parseInt(maxSize)){
        notifyInfo('上传的文件不能超过1MB');
        return false;  
    }else{    
      var form = new FormData();
      form.append("file", file);
      $.ajax({    
          url: HOST + URL_UPLOAD_FILE,
          type: 'POST',
          data: form,
          async:false,
          processData: false,
          contentType: false,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
      }).done(function(e) {
        console.log('上传图片成功！');
        resolve(e.data);
      })   
    }
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