$(init);

function init() {
  $('body').on('keydown', doPressLogin);
  

  doReloadCode()
}

function doPressLogin(e) {
  (e.keyCode == 13) ? doLogin():null;
}

function doLogin() {
  let obj = { 
    userName: $('#usr').val(), 
    password: $('#pwd').val(),
    randomcode: $('#login-vertify').val()
  };
  promise('POST', URL_ADMIN_LOGIN, JSON.stringify(obj), cbLogin, null);
}

function cbLogin(e) {
    e.userType = ADMIN;
    saveCookie(e);
    location.href = 'html/admin/mainSys.html';
}