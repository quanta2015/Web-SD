let _code;

$(init);

function init() {
  $('body').on('click', '.login-hd li', toggleUserLogin);
  $('body').on('click', '.action-login', goLoginPage);
  $('body').on('click', '.action-register', goRegisterPage);
  $('body').on('click', '.action-reg', goRegisterPage);
  $('body').on('click', '#regSellBtn', showRegSell);
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
  $('.regs').removeClass('hide');
}

function doRegister() {
  const ids = ['mobile', 'qq', 'code', 'weixin', 'password', 'repassword'];
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
  // 验证码
  if ((infoMap['code'].val)!==_code) {
    infoMap['code'].isValid = false;
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
      if ((key === 'code')||(key == 'repassword')) continue;
      obj[key]=infoMap[key].val
    }
    promiseData('POST', '/users/shoper_reg', JSON.stringify(obj), cbInfo);
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
  _code = e.message;
  $('#reg-btn').attr("disabled",false);
}

function doGetCode() {
  var obj = {
    'mobilephone':$('#mobile').val()
  }
  $('#getcode-btn').attr("disabled",true);
  promiseData('GET', '/users/sms_send', obj, cbCode);
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
    promiseData('POST', '/users/shoper_login', JSON.stringify(obj), cbLogin);
  }
}

function cbLogin(e) {
  if (e.code == 0) {
    // 跳转到管理页面
    notifyInfo(MSG_LOGIN_SUCCESS);
  }else if (e.code==99) {
    notifyInfo(e.message);
  }else if (e.code==-1) {
    relogin();
  };
}