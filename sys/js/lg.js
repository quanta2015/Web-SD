$(init);

function init() {
  $('body').on('keydown', doPressLogin);
  
}

function doPressLogin(e) {
  (e.keyCode == 13) ? doLogin():null;
}




function doLogin() {
  let obj = { userName: $('#usr').val(), password: $('#pwd').val() };
  promiseData('POST', URL_ADMIN_LOGIN, JSON.stringify(obj), cbLogin);
}

function cbLogin(e) {
  if (e.code == 0) {
    saveCookie(e.data);
    location.href = 'html/admin/mainSys.html';
  }else if (e.code==99) {
    notifyInfo(e.message);
  }else if (e.code==-1) {
    relogin();
  };
}
