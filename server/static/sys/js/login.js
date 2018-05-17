let _code;

$(init);

function init() {
  $('body').on('click', '.login-hd li', toggleUserLogin);
  $('body').on('click', '.action-login', goLoginPage);
  $('body').on('click', '.action-register', goRegisterPage);
  $('body').on('click', '.action-reg', goRegisterPage);
  $('body').on('click', '#regSellBtn', showRegSell);
  $('body').on('click', '#regBuyBtn', showRegBuy);
  $('body').on('click', '#reg-btn', doRegister);
  $('body').on('click', '#getcode-btn', doGetCode);
  $('body').on('click', '#loginBtn', doLogin);
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

function showRegSell() {
  hideAllPages();
  $('.regs').empty().removeClass('hide').append($("#regTmpl").render({ type:'sell' }));
}

function showRegBuy() {
  hideAllPages();
  $('.regs').empty().removeClass('hide').append($("#regTmpl").render({ type:'buy' }));
}

function doRegister() {
  const ids = ['mobile', 'qq', 'smscode', 'weixin', 'password', 'repassword'];
  const infoMap = {};
  const errMap = {};
  let success = true;

  ids.forEach(id => {
    infoMap[id] = {
      val: $(`#${id}`).val(),
      isValid: true
    };
  });
  for(let id in REGISTER_REGEXS) {
    infoMap[id].isValid = REGISTER_REGEXS[id].test(infoMap[id].val);
  }
  // 确认密码
  if (infoMap['repassword'].val !== infoMap['password'].val) {
    infoMap['repassword'].isValid = false;
  }
  // 展示结果
  ids.forEach(id => {
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
    promiseData('POST', URL_SELL_REG, JSON.stringify(obj), cbInfo);
  }
}

function cbInfo(e) {
  if (e.code == 0) {
    showUserLogin(BUY)
    notifyInfo(MSG_REGIS_SUCCESS);
  }else if (e.code==99) {
    notifyInfo(e.message);
  }else if (e.code==-1) {
    relogin();
  };
}

function cbCode(e) {
  if (e.code == 0) {
     $('#reg-btn').attr("disabled",false);
  }
}

function doGetCode() {
  var obj = {
    'mobilephone':$('#mobile').val()
  }
  $('#getcode-btn').attr("disabled",true);
  promiseData('GET', URL_SMS_SEND, obj, cbCode);
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
  $('.loginYh').is('.on')?type=BUY:type=SELL;
  if (type == BUY) {
    //BUY login
  }else{
    //SELL login
    obj = { mobile:$('#login-mobile').val(), password:$('#login-password').val() };
    promiseData('POST', URL_SELL_LOGIN, JSON.stringify(obj), cbLogin);
  }
}

function cbLogin(e) {
  if (e.code == 0) {
    $.cookie('mobile', e.data.mobile, {expires: 30});
    $.cookie('password', $('#login-password').val, { expires: 30 });
    $.cookie('id', e.data.id, { expires: 30 });
    location.href = "mainSell.html";
    notifyInfo(MSG_LOGIN_SUCCESS);
  }else if (e.code==99) {
    notifyInfo(e.message);
  }else if (e.code==-1) {
    relogin();
  };
}