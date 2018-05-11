$(init);

function init() {
  $('body').on('click', '.login-hd li', toggleUserLogin);
  $('body').on('click', '.action-login', goLoginPage);
  $('body').on('click', '.action-register', goRegisterPage);
  $('body').on('click', '.action-reg', goRegisterPage);
  $('body').on('click', '#regSellBtn', showRegSell);
  $('body').on('click', '#reg-btn', doRegister);
  $('body').on('click', '#getcode-btn', doGetCode);

}

function hideAllPages() {
  PAGES.forEach(page => {
    if (!$(`.${page}`).is('.hide')) {
      $(`.${page}`).addClass('hide');
    }
  })
}

function toggleUserLogin() {
  const index = $(this).index();
  $('.login-hd li').toggleClass('on');
  $('.login-logo>img').attr('src', LOGIN_IMGS[index]);
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
  // 展示结果
  ids.forEach(id => {
    if (!infoMap[id].val || infoMap[id].val === '' || !infoMap[id].isValid) {
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
    promiseData('POST', '/users/shoper_reg', obj, cbInfo)
  }
}

function cbInfo(e) {
  console.log(e);
}


function doGetCode() {
  $('#getcode-btn').attr("disabled",true);
  let count = CODE_COUNT;
  doCounter(count);
}

function doCounter(count) {
  setTimeout(function(){
    $('#getcode-btn').text(--count);
    if (count) {
      doCounter(count)
    }else{
      $('#getcode-btn').text('获取验证码');
      $('#getcode-btn').attr("disabled",false);
    }
  }, 1000 );
}