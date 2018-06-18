let _code;

let _invite;

$(init);

function init() {


  checkInvite();

  $('body').on('click', '.login-hd li', toggleUserLogin);
  $('body').on('click', '.action-login', goLoginPage);
  $('body').on('click', '.action-register', goRegisterPage);
  $('body').on('click', '.action-reg', goRegisterPage);
  $('body').on('click', '#regSellBtn', showRegSell);
  $('body').on('click', '#regBuyBtn', showRegBuy);
  $('body').on('click', '#reg-btn', doRegister);
  $('body').on('click', '#getcode-btn', doGetCode);
  $('body').on('click', '#loginBtn', doLogin);
  $('body').on('keydown', doPressLogin);
}

function checkInvite() {
  _invite = getUrlParam('invite')
  if (( _invite !== "" )&&( _invite !== null )) {
    showRegBuy(_invite);
  }
}

function doPressLogin(e) {
  (e.keyCode == 13) ? doLogin():null;
}

function hideAllPages() {
  PAGES.forEach(page => {
    if (!$(`.${page}`).is('.hide')) {
      $(`.${page}`).addClass('hide');
    }
  })
}

function showUserLogin(type) {
  $('section').addClass('hide');
  $('.login').removeClass('hide');
  $('.login-hd li').removeClass('on');
  type?$('.loginSj').addClass('on'):$('.loginYh').addClass('on');
}

function toggleUserLogin() {
  const el = $(this);
  $('.login-hd li').removeClass('on');
  (!el.is('.on'))?el.addClass('on'):null;
  $('.login-logo>img').attr('src', LOGIN_IMGS[el.index()])
}

function goLoginPage() {
  hideAllPages();
  $('.login').removeClass('hide');
}

function goRegisterPage() {
  hideAllPages();
  $('.register').removeClass('hide');
}

async function showRegSell() {
  hideAllPages();
  $('.regs').empty().addClass('reg-sj').removeClass('hide').append(await renderTmpl(TMPL_REG, { type:'sell' }));
}

async function showRegBuy() {
  hideAllPages();
  $('.regs').empty().removeClass('hide reg-sj').append(await renderTmpl(TMPL_REG, { type:'buy' }));
  $("#invitecode").val(_invite)
}

function doRegister() {
  const ids = ['mobile', 'qq', 'smscode', 'weixin', 'password', 'repassword', 'invitecode'];
  const infoMap = {};
  let success = true;
  let newIds = [];
  ids.forEach(id => {
    if ($(`#${id}`).length < 1) return;
    let val = $(`#${id}`).val()
    infoMap[id] = {
      val: val,
      isValid: REGISTER_REGEXS[id] ? REGISTER_REGEXS[id].test(val) : true,
    };
    newIds.push(id);
  });
  // 确认密码
  if (infoMap['repassword'].val !== infoMap['password'].val) {
    infoMap['repassword'].isValid = false;
  }
  // 展示结果
  newIds.forEach(id => {
    if (id === 'invitecode') return;
    if (!infoMap[id].val || infoMap[id].val === '' || !infoMap[id].isValid ) {
      $(`#${id}`).siblings('p').find('span').removeClass('hide');
      success = false;
      return;
    } else {
      $(`#${id}`).siblings('p').find('span').addClass('hide');
    }
  })

  if (success) {
    obj = {};
    for(key in infoMap) {
      if (key == 'repassword') continue;
      obj[key]=infoMap[key].val
    }

    $('.regs').is('.reg-sj') ? type = SELL : type = BUY;
    if (type == BUY) {
      promise('POST', URL_BUY_REG, JSON.stringify(obj), cbInfo, null);
    } else {
      promise('POST', URL_SELL_REG, JSON.stringify(obj), cbInfo, null);
    }
  }
}


function cbInfo(e) {
  showUserLogin(BUY)
  notifyInfo(MSG_REGIS_SUCCESS);
}

function cbCode(e) {
  $('#reg-btn').attr("disabled",false);
}

function doGetCode() {
  var obj = {
    'mobilephone':$('#mobile').val()
  }
  $('#getcode-btn').attr("disabled",true);
  promiseNoMask('GET', URL_SMS_SEND, obj, cbCode);
  let count = CODE_COUNT;
  doCounter(count);
}

function doCounter(count) {
  setTimeout( () => {
    $('#getcode-btn').text(--count);
    if (count) {
      doCounter(count)
    }else{
      $('#getcode-btn').text('获取验证码');
      $('#getcode-btn').attr("disabled",false);
    }
  }, 1000 );
}


function doLogin() {
  let url = $('.loginYh').is('.on') ? URL_BUY_LOGIN : URL_SELL_LOGIN;
  let obj = { mobile:$('#login-mobile').val(), password: $('#login-password').val() };
  promiseNoMask('POST', url, JSON.stringify(obj), cbLogin, null);
}

function cbLogin(e) {
  e.userType = $('.loginYh').is('.on')?BUY:SELL;
  e.password = $('#login-password').val();
  saveCookie(e);
  location.href = $('.loginYh').is('.on')? 'html/buyer/mainBuy.html' : 'html/seller/mainSell.html';
  notifyInfo(MSG_LOGIN_SUCCESS);
}