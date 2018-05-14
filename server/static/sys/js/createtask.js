var _cid;

$(init);

function init() {
  $('body').on('click', '.btn-pre', doPre);
  $('body').on('click', '.btn-next', doNext);


  $('#rp-tb').prop('checked',true);
  $('#rt-mobile').prop('checked',true);
  $('#rm-money').prop('checked',true);

}

PREV = 0;
NEXT = 1;

function doPre() {
  renderTask(PREV)
}

function doNext() {
  renderTask(NEXT)
}

function renderTask(type) {
  _cid =  parseInt($('.active .mt-step-number').text()) - 1;
  type?next=_cid+1:next=_cid-1

  switch(_cid) {
    case 0: doFirst();break;
    case 1: doSecond(type); break;
    case 2: doThird(type); break;
    case 3: doFour(); break;
  }

  if ( type == NEXT) {
    next=_cid+1
    $('.mt-element-step .mt-step-col:eq('+ next + ')').addClass('active');
    $('.mt-element-step .mt-step-col:eq('+ _cid + ')').removeClass('active').addClass('done');
  } else {
    $('.mt-element-step .mt-step-col:eq('+ next + ')').addClass('active').removeClass('done')
    $('.mt-element-step .mt-step-col:eq('+ _cid + ')').removeClass('active')
  }
}

function doFirst() {
   $('.btn-pre').removeClass('hide');
}

function doSecond(type) {
  !type?$('.btn-pre').addClass('hide'):null;
}

function doThird(type) {
  if (type == NEXT) {
    $('.btn-next').addClass('hide');
    $('.btn-finish').removeClass('hide');
  }
}

function doFour() {
  $('.btn-next').removeClass('hide');
  $('.btn-finish').addClass('hide');
}