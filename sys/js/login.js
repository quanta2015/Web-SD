const LOGIN_IMGS = [
  'img/login01.jpg',
  'img/login02.jpg'
];

$(init);

function init() {
  $('body').on('click', '.login-hd li', toggleUserLogin);
  $('body').on('click', '.action-login', goLoginPage);
  $('body').on('click', '.action-register', goRegisterPage);
}

function toggleUserLogin() {
  const index = $(this).index();
  $('.login-hd li').toggleClass('on');
  $('.login-logo>img').attr('src', LOGIN_IMGS[index]);
}

function goLoginPage() {
  if ($('.login').is('.hide')) {
    $('.login').toggleClass('hide');
    $('.register').toggleClass('hide');
  }
}

function goRegisterPage() {
  if ($('.register').is('.hide')) {
    $('.login').toggleClass('hide');
    $('.register').toggleClass('hide');

  }
}
