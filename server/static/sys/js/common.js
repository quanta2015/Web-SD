const CODE_COUNT = 10
const BUY = 0
const SELL = 1
const HOST = 'http://localhost:8011'

const URL_SELL_REG          = HOST + '/users/shoper_reg'
const URL_SMS_SEND          = HOST + '/users/sms_send'
const URL_SELL_LOGIN        = HOST + '/users/shoper_login'
const URL_SHOP_BIND         = HOST + '/users/shop_bind'
const URL_TASK_PUBLISH      = HOST + '/task/task_publish'
const URL_TASK_ALL_PLATFORM = HOST + '/task/all_platform'
const URL_SELL_SHOPS        = HOST + '/users/shoper_shops/'
const URL_SELL_SHOP_DEL     = HOST + '/users/shop_del/'
const URL_SELL_SHOP_UPDATE  = HOST + '/users/shop_update/'
const URL_SELL_ALL_TASK     = HOST + '/task/all_tasks/'

const TEPL_ADDR = './tmpl/addr.tmpl'

const MSG_LOGIN_SUCCESS = '登录成功！'
const MSG_REGIS_SUCCESS = '注册成功！'
const MSG_PUBLISH_SUCCESS = '发布成功！'



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

function jsonData(urlTmpl, urlData, cb, err) {
  $.when($.ajax(urlTmpl), $.ajax(urlData)).done(cb).fail(err);
}

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
          url: HOST + "/users/upload",   
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

function relogin() {
  top.location.href = 'index.html';
}
