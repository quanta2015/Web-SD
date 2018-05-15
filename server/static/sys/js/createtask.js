var _cid;
PREV = 0;
NEXT = 1;

$(init);

function init() {
  $('body').on('click', '.btn-pre', doPre);
  $('body').on('click', '.btn-next', doNext);
  $('body').on('click', '.alladdress', getAddr);
  $('body').on('click', '.task-del', delTask);


  //初始化普通好评任务栏
  $(".nor-task-add").before($("#taskTmpl").render({ data:1, show:false }));



  //地区下拉框
  $('#goods-location').on('mouseover mouseout', toggleAddress)
  $('.alladdress').on('mouseover', showAddress).on('mouseout', hideAddress)

  //普通好评任务切换显示
  $("#normaltask").change(function() { 
    $('.nor-task-wrap').toggle()
  });
  
  //添加普通好评任务
  $('.nor-task-add a').on('click', addTaskItem);

  

  $('#rp-tb').prop('checked',true);
  $('#rt-mobile').prop('checked',true);
  $('#rm-money').prop('checked',true);

  $('#real-price').mask("#,##0.0", {reverse: true});
  $('#mobile-price').mask("#,##0.0", {reverse: true});
  $('#buy-count').mask("#,##0", {reverse: true});
  $('#sell-count').mask("#,##0", {reverse: true});
  $('#price-from').mask("#,##0.0", {reverse: true});
  $('#price-to').mask("#,##0.0", {reverse: true});
  $('#task-count').mask("#,##0", {reverse: true});
  $('#award-money').mask("#,##0.0", {reverse: true});
}



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
    case 0: $('.btn-pre').removeClass('hide');break;
    case 1: !type?$('.btn-pre').addClass('hide'):null;; break;
    case 2: if (type == NEXT) { $('.btn-next').addClass('hide'); $('.btn-finish').removeClass('hide'); }; break;
    case 3:  $('.btn-next').removeClass('hide'); $('.btn-finish').addClass('hide'); break;
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

function toggleAddress() {
  $('.alladdress').toggle()
}

function showAddress() {
  $('.alladdress').show()
}

function hideAddress() {
  $('.alladdress').hide()
}

function getAddr(e) {
  $('#goods-location').val(e.target.innerText);
  $('.alladdress').hide()
}


function addTaskItem() {
  var count = $('.nor-task').length + 1
  $(".nor-task-add").before($("#taskTmpl").render({ data:count, show:true }));
}

function delTask() {
  $(this).parent().remove();
}