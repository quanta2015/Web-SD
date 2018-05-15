const CODE_COUNT = 10
const BUY = 0
const SELL = 1
const HOST = 'http://localhost:8011'

const MSG_LOGIN_SUCCESS = '登录成功！'
const MSG_REGIS_SUCCESS = '注册成功！'

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