const CODE_COUNT = 10

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
    url: url,
    dataType: "json",
    contentType: "application/json",
    data:data
  });
  promise.done(cb);
}