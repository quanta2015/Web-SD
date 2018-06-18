$(init);

function init() {
  $('body').on('keydown', doPressLogin);
  
}

function doPressLogin(e) {
  (e.keyCode == 13) ? doLogin():null;
}

function doLogin() {
  let obj = { userName: $('#usr').val(), password: $('#pwd').val() };
  promiseNoMask('POST', URL_ADMIN_LOGIN, JSON.stringify(obj), cbLogin, null);
}

function cbLogin(e) {
    saveCookie(e);
    location.href = 'html/admin/mainSys.html';
}
