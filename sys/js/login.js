$(init);

function init() {
  $('body').on('click', '.login-hd li', toggleUserLogin);
  $('body').on('click', '.action-login', goLoginPage);
  $('body').on('click', '.action-register', goRegisterPage);
  $('body').on('click', '.action-reg', goRegisterPage);
  $('body').on('click', '#regSellBtn', showRegSell);
  $('body').on('click', '#reg-btn', doRegister);
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
  const ids = ['mobile', 'qq', 'code', 'weixin', 'login-password', 'repassword'];
  const infoMap = {};
  const errMap = {};
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
  if (infoMap['repassword'].val !== infoMap['login-password'].val) {
    infoMap['repassword'].isValid = false;
  }
  // 展示结果
  ids.forEach(id => {
    if (!infoMap[id].val || infoMap[id].val === '' || !infoMap[id].isValid) {
      $(`#${id}`).siblings('p').find('span').removeClass('hide');
    } else {
      $(`#${id}`).siblings('p').find('span').addClass('hide');
    }
  })
}
