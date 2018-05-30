let _cid;
let PREV = 0;
let NEXT = 1;
let platformMap = {};

$(init);

function init() {

  $('body').on('click', '.btn-pre', doPre);
  $('body').on('click', '.btn-next', doNext);
  $('body').on('click', '.alladdress', getAddr);
  $('body').on('click', '.task-del', delTask);
  $('body').on('click', '#publish-task-btn', doPublish);
  $('body').on('change', '#platform-list', doInitShop);
  $('body').on('input propertychange', '.task-count', doCountTask);


  //地区下拉框
  $.ajax(TMPL_ADDR).done( (ret) => {
    initLocationSelect('goods-location', ret)
    initLocationSelect('limit-location', ret)
  })

  // 初始化平台、店铺下拉栏
  initPlatforms();
  //初始化普通好评任务栏
  initTaskTmpl();

  //好评任务切换显示
  // $("#normaltask").change( ()=> $('.nor-task-wrap').toggle() );
  $("#keywordtask").change( ()=> $('.key-task-wrap').toggle() );
  $("#picturetask").change( ()=> $('.img-task-wrap').toggle() );
  $("#wordtask").change( ()=> $('.word-task-wrap').toggle() );

  //添加好评任务
  $('.nor-task-add a').on('click', addNorTaskItem);
  $('.key-task-add a').on('click', addKeyTaskItem);
  $('.img-task-add a').on('click', addImgTaskItem);
  $('.word-task-add a').on('click', addWordTaskItem);


  $('#rp-tb').prop('checked',true);
  $('#rt-mobile').prop('checked',true);
  $('#rm-money').prop('checked',true);

  $('#real-price').mask("#,##0", {reverse: true});
  $('#mobile-price').mask("#,##0", {reverse: true});
  $('#buy-count').mask("#,##0", {reverse: true});
  $('#sell-count').mask("#,##0", {reverse: true});
  $('#price-from').mask("#,##0", {reverse: true});
  $('#price-to').mask("#,##0", {reverse: true});
  $('#task-count').mask("#,##0", {reverse: true});
  $('#award-money').mask("#,##0", {reverse: true});
  $('#express-weight').mask("#,##0", {reverse: true});
}

async function initTaskTmpl() {
  $(".nor-task-add").before(await renderTmpl(TMPL_SELL_CREATETASK_P, { type:'nor-task', data:1, show:false }));
  $(".key-task-add").before(await renderTmpl(TMPL_SELL_CREATETASK_P, { type:'key-task', data:1, show:false }));
  $(".img-task-add").before(await renderTmpl(TMPL_SELL_CREATETASK_I, { type:'img-task', data:1,list:[1,1,1,1,1], show:false }));
  $(".word-task-add").before(await renderTmpl(TMPL_SELL_CREATETASK_P, { type:'word-task',data:1, show:false, word: true }));

  $('.timepicker-24').timepicker({ showMeridian: false });
}

function initLocationSelect(id, ret) {
  $("#"+id).after(ret)
      .on('mouseover mouseout', ()=> { $('.alladdress').toggle() });
  $('.alladdress').on('mouseover', ()=> { $('.alladdress').show() })
      .on('mouseout', ()=> { $('.alladdress').hide() })
}

function doPre() {
  renderTask(PREV)
}

function doNext() {
  renderTask(NEXT)
}

//不同步骤页面渲染控制
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

  (type==NEXT)?cur=_cid+2:cur=_cid;
  $('.step').addClass('hide');
  $('.step'+cur).removeClass('hide');
}


function getAddr(e) {
  $(e.target).parents('.alladdress').prev().val(e.target.innerText)
  $('.alladdress').hide()
}


async function addNorTaskItem() {
  var count = $('.nor-task').length + 1
  $(".nor-task-add").before(await renderTmpl(TMPL_SELL_CREATETASK_P, { type:'nor-task', data:count, show:true }));
  $('.timepicker-24').timepicker({ showMeridian: false });
}

async function addKeyTaskItem() {
  var count = $('.key-task').length + 1
  $(".key-task-add").before(await renderTmpl(TMPL_SELL_CREATETASK_P, { type:'key-task', data:count, show:true }));
  $('.timepicker-24').timepicker({ showMeridian: false });
}

async function addImgTaskItem() {
  var count = $('.img-task-title').length + 1
  $(".img-task-add").before(await renderTmpl(TMPL_SELL_CREATETASK_I, { type:'img-task', data:count,list:[1,1,1,1,1], show:true }));
  $('.timepicker-24').timepicker({ showMeridian: false });
}


async function addWordTaskItem() {
  var count = $('.word-task-title').length + 1
  $(".word-task-add").before(await renderTmpl(TMPL_SELL_CREATETASK_P, { type:'word-task',data:count, show:true, word: true }));
  $('.timepicker-24').timepicker({ showMeridian: false });
}

function delTask() {
  $(this).parents('.task-wrap-item').remove();
}


function doPublish() {
  let obj = {
    tasktype: $("input[name='r-task-type']:checked").val(),
    returntype: $("input[name='r-return-type']:checked").val(),
    goodsList: [{
      colorSize: $('#color-size-info').val(),
      factprice: $('#real-price').val().replace(/,/g, ''),
      goodsmainimg: $('#upload').val(),
      goodsimg1: '',
      goodsimg2: '',
      goodsname: $('#name').val(),
      goodsposition: $('#goods-location').val(),
      goodsurl: $('#url').val(),
      highprice: $('#price-to').val().replace(/,/g, ''),
      lowprice: $('#price-from').val().replace(/,/g, ''),
      number: $('#buy-count').val().replace(/,/g, ''),
      locationway: $("input[name='r-locationway']:checked").val(),
      orderwords: $('#order-message').val(),
      salesVolume: $('#sell-count').val().replace(/,/g, ''),
      searchprice: $('#mobile-price').val().replace(/,/g, ''),
    }],
    goodsname: $('#name').val(),
    commontask: $('#normaltask').prop('checked')?1:0,
    commonTaskKeyList: [],
    keywordtask: $('#keywordtask').prop('checked')?1:0,
    keywordTaskKeyList: [],
    picturetask: $('#picturetask').prop('checked')?1:0,
    pictureTaskKeyList: [],
    commenttask: $('#wordtask').prop('checked')?1:0,
    commentTaskKeyList: [],
    startdate: $('#start-date').val(),
    num: $('#task-count').val().replace(/,/g, ''),
    addcharges: $('#award-money').val().replace(/,/g, ''),
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
    expressWeight: $('#express-weight').val(),
    ask: $('#ask').prop('checked')?1:0,
    chatNecessary: $("input[name='r-chat-necessary']:checked").val(),
    shopId: $('#shop-list').val(),
    singleAmount: $('#pub-itl-amount').val(),
    intervals: $('#pub-itl-time').val(),
  }
  obj.commonTaskKeyList = obj.commontask ? getGreatCommentData('nor-task') : [];
  obj.keywordTaskKeyList = obj.keywordtask ? getGreatCommentData('key-task') : [];
  obj.pictureTaskKeyList = obj.picturetask ? getGreatCommentData('img-task') : [];
  obj.commentTaskKeyList = obj.commenttask ? getGreatCommentData('word-task') : [];
  console.log(obj)
  promiseData('POST', URL_TASK_PUBLISH, JSON.stringify(obj), cbInfo);
}

function getGreatCommentData(type) {
  let taskTypeMap = {
    'nor-task': 1,
    'key-task': 2,
    'img-task': 3,
    'word-task': 4,
  };
  let result = [];
  for(let i = 1; i < 5; i++) {
    if ($(`#${type}-ipt-key${i}`).length < 1) break;
    let item = {
      keyword: $(`#${type}-ipt-key${i}`).val(),
      fromHour: $(`#${type}-ipt-time-from${i}`).val().split(':')[0],
      fromMin: $(`#${type}-ipt-time-from${i}`).val().split(':')[1],
      toHour: $(`#${type}-ipt-time-to${i}`).val().split(':')[0],
      toMin: $(`#${type}-ipt-time-to${i}`).val().split(':')[1],
      appoints: '',
      taskPictureList: [],
      taskkeyNum: $(`#${type}-ipt-count${i}`).val(),
      taskkeyType: taskTypeMap[type],
    };
    switch(type) {
      case 'nor-task':
        break;
      case 'key-task':
        item.appoints = [];
        $('.ipt-keyword').each(function() {
          if ($(this).val()) {
            item.appoints.push($(this).val());
          }
        });
        item.appoints = item.appoints.join(',');
        break;
      case 'img-task':
        item.desc = $(`#${type}-ipt-desc${i}`).val();
        for(let j = 1; j <= 5; j++) {
          let imgUrl = ($(`#img-task-upload${i}-${j}`).attr('url'));
          if (!imgUrl) continue;
          item.taskPictureList.push({
            picture: imgUrl
          });
        }
        break;
      case 'word-task':
        item.appoints = $(`#${type}-ipt-word${i}`).val();
        break;
    }
    result.push(item);
  }
  return result;
}

function cbInfo(e) {
  console.log(e)
  if (e.code == 0) {
    notifyInfo(MSG_PUBLISH_SUCCESS);
  }else if (e.code==99) {
    notifyInfo(e.message);
  }else if (e.code==-1) {
    relogin();
  };
}

function initPlatforms() {
  promiseData('GET', URL_TASK_ALL_PLATFORM, null, cbPlatformInfo);
}

function cbPlatformInfo(e) {
  console.log(e);
  if (e.code == 0) {
    initPlatformList(e.data);
  }else if (e.code==99) {
    notifyInfo(e.message);
  } else if (e.code == -1) {
    relogin();
  }
}

async function initPlatformList(data) {
  let platforms = data.map(v => v.platform);
  data.forEach(v => {
    platformMap[v.platform] = v.shops;
  })
  $("#platform-list").append(await renderTmpl(TMPL_SELL_PLAT_SELECT, { list:platforms }));
  $("#shop-list").append(await renderTmpl(TMPL_SELL_SHOP_SELECT, { list:platformMap[platforms[0]] }));
}

async function doInitShop() {
  let platform = $(this).val();
  $("#shop-list").empty().append(await renderTmpl(TMPL_SELL_SHOP_SELECT, { list:platformMap[platform] }));
}

function doCountTask() {
  let count = 0;
  $('.task-count').each(function() {
    count += parseInt($(this).val() || 0);
  });
  $('#task-count').val(count);
}
