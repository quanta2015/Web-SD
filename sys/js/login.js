$(init);

function init() {
  $('body').on('click', '.login-hd li', toggleUserLogin);
  $('body').on('click', '.action-login', goLoginPage);
  $('body').on('click', '.action-register', goRegisterPage);
  $('body').on('click', '.action-reg', goRegisterPage);
  $('body').on('click', '#regSellBtn', showRegSell);
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
