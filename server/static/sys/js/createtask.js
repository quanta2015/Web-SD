var _cid;
PREV = 0;
NEXT = 1;

$(init);

function init() {
  $('body').on('click', '.btn-pre', doPre);
  $('body').on('click', '.btn-next', doNext);
  $('body').on('click', '.alladdress', getAddr);
  $('body').on('click', '.task-del', delTask);
  $('body').on('click', '.imgtask-del', delImgTask);


  //初始化普通好评任务栏
  $(".nor-task-add").before($("#taskTmpl").render({ data:1, show:false }));

  //初始化普通好评任务栏
  $(".nor-task-add").before($("#taskTmpl").render({ type:'nor-task', data:1, show:false }));
  $(".key-task-add").before($("#taskTmpl").render({ type:'key-task', data:1, show:false }));
  $(".img-task-add").before($("#imgTaskTmpl").render({ data:1,list:[1,1,1,1,1], show:false }));


  //地区下拉框
  $('#goods-location').on('mouseover mouseout', toggleAddress)
  $('.alladdress').on('mouseover', showAddress).on('mouseout', hideAddress)

  //好评任务切换显示
  $("#normaltask").change( ()=> $('.nor-task-wrap').toggle() );
  $("#keywordtask").change( ()=> $('.key-task-wrap').toggle() );
  $("#picturetask").change( ()=> $('.img-task-wrap').toggle() );

  //添加好评任务
  $('.nor-task-add a').on('click', addNorTaskItem);
  $('.key-task-add a').on('click', addKeyTaskItem);
  $('.img-task-add a').on('click', addImgTaskItem);

  

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


function addNorTaskItem() {
  var count = $('.nor-task').length + 1
  $(".nor-task-add").before($("#taskTmpl").render({ type:'nor-task', data:count, show:true }));
}

function addKeyTaskItem() {
  var count = $('.key-task').length + 1
  $(".key-task-add").before($("#taskTmpl").render({ type:'key-task', data:count, show:true }));
}

function addImgTaskItem() {
  var count = $('.img-task-title').length + 1
  $(".img-task-add").before($("#imgTaskTmpl").render({ data:count,list:[1,1,1,1,1], show:true }));
}

function delTask() {
  $(this).parent().remove();
}

function delImgTask() {
  $(this).parents('.img-task-wrap-item').remove();
}


function doPublish() {
  let obj = {
    tasktype: $("input[name='r-task-type']:checked").val(),
    returntype: $("input[name='r-return-type']:checked").val(),
    goodsurl: $('#url').val(),
    goodsname: $('#name').val(),
    goodsmainimg: '',
    colorSize: $('#color-size-info').val(),
    factprice: $('#real-price').val(),
    searchprice: $('#mobile-price').val(),
    number: $('#buy-count').val(),
    locationway: $("input[name='r-locationway']:checked").val(),
    lowprice: $('#price-from').val(),
    highprice: $('#price-to').val(),
    goodsposition: $('#goods-location').val(),
    sales_volume: $('#sell-count').val(),
    orderwords: $('#order-message').val(),
    // TODO：需要补第三步好评数据
    commontask: [],
    keywordtask: [],
    picturetask: [],
    commenttask: [],
    startdate: $('#start-date').val(),
    num: $('#task-count').val(),
    addcharges: $('#addcharges').val(),
    share: $('#share').val(),
    matchLabel: $('#match-label').val(),
    sex: $('#sex').val(),
    lowage: $('#age').val().split('-')[0],
    highage: $('#age').val().split('-')[1],
    location: $('#limit-location').val(),
    useHuabei: $('#use-huabei').val(),
    huabeiStart: $('#huabei-start').val(),
    jingdongLevel: $('#jingdong-level').val(),
    taobaoLevel: $('#taobao-level').val(),
    rebuy: $('#rebuy').val(),
    isRecieve: $('#is-recieve').val(),
    expressCompany: $('#express-company').val(),
    ask: $('#ask').val(),
    chartNecessary: $("input[name='r-chart-necessary']:checked").val(),
  }
  promiseData('POST', '/task/task_publish', JSON.stringify(obj), cbInfo);
}

function cbInfo(e) {
  if (e.code == 0) {
    notifyInfo(MSG_PUBLISH_SUCCESS);
  }else if (e.code==99) {
    notifyInfo(e.message);
  }else if (e.code==-1) {
    relogin();
  };
}
