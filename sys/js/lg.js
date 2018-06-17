$(init);

function init() {
  $('body').on('keydown', doPressLogin);
  
}

function doPressLogin(e) {
  (e.keyCode == 13) ? doLogin():null;
}




function doLogin() {
  let obj = { userName: $('#usr').val(), password: $('#pwd').val() };
  promise('POST', URL_ADMIN_LOGIN, JSON.stringify(obj), cbLogin);
}

function cbLogin(e) {
    saveCookie(e);
    location.href = 'html/admin/mainSys.html';
}
