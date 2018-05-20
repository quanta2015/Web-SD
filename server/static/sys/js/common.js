// BASIC DEF
const CODE_COUNT = 10
const BUY = 0
const SELL = 1
const HOST = 'http://localhost:8011'
const AUDIT_PASS = 2
const AUDIT_FAIL = 3



// URL DEF
const URL_SELL_REG          = '/shoper/shoper_reg'
const URL_SMS_SEND          = '/sms_send'
const URL_SELL_LOGIN        = '/shoper/shoper_login'
const URL_SHOP_BIND         = '/shoper/shop_bind'
const URL_TASK_PUBLISH      = '/task/task_publish'
const URL_TASK_ALL_PLATFORM = '/task/all_platform'
const URL_SELL_SHOPS        = '/users/shoper_shops/'
const URL_SELL_SHOP_DEL     = '/shoper/shop_del/'
const URL_SELL_SHOP_UPDATE  = '/shoper/shop_update/'
const URL_SELL_ALL_TASK     = '/task/all_tasks/'
const URL_UPLOAD_FILE       = '/upload'
const URL_BUY_REG           = '/buyer/buyer_reg'
const URL_BUY_LOGIN         = '/buyer/buyer_login'
const URL_BUY_BIND_ID_CARD  = '/buyer/buyer_validate'
const URL_BUY_BIND_BANK     = '/buyer/buyer_bankbind'
const URL_ADMIN_ALL_TASK    = '/admin/all_tasks'
const URL_ADMIN_TASK_AUDIT  = '/admin/task_approve'
const URL_ADMIN_ALL_IDCARD  = '/admin/buyer_list'
const URL_ADMIN_IDCARD_AUDIT  = '/admin/buyer_approve'


// TMPL DEF
const TMPL_ADDR            = './tmpl/addr.tmpl'
const TMPL_REG             = './tmpl/reg.tmpl'
const TMPL_SHOP_SELECT     = './tmpl/shop_select.tmpl'
const TMPL_PLATFORM_SELECT = './tmpl/platform_select.tmpl'
const TMPL_TASK            = './tmpl/task.tmpl'
const TMPL_IMG_TASK        = './tmpl/img_task.tmpl'
const TMPL_TASK_LIST       = './tmpl/list_task.tmpl'
const TMPL_IDCARD_LIST     = './tmpl/list_idcard.tmpl'
const TMPL_BIND_IDCARD     = './tmpl/bind_idcard.tmpl'
const TMPL_BIND_BKCARD     = './tmpl/bind_bkcard.tmpl'

// MSG DEF
const MSG_LOGIN_SUCCESS   = '登录成功！'
const MSG_REGIS_SUCCESS   = '注册成功！'
const MSG_PUBLISH_SUCCESS = '发布成功！'
const MSG_BIND_SUCCESS    = '绑定成功！'

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
  top.location.href = 'index.html';
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

