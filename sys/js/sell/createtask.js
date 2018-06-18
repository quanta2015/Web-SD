let rules_step1 = {
  "platform-list": {
    required: !0
  },
  "shop-list": {
    required: !0
  }
};

let rules_step2 = {
  "goods-url": {
    required: !0,
    url: true
  },
  "goods-name": {
    required: !0
  },
  "color-size-info": {
    required: !0
  },
  "real-price": {
    required: !0
  },
  "mobile-price": {
    required: !0
  },
  "buy-count": {
    required: !0
  },
  "pub-itl-time": {
    required: !0
  },
  "pub-itl-amount": {
    required: !0
  }
};

let _cid;
let _vip;
let PREV = 0;
let NEXT = 1;
let platformMap = {};
let taskObj;

$(init);

function init() {

  $('body').on('click', '.btn-pre', doPre);
  $('body').on('click', '.btn-next', doNext);
  $('body').on('click', '.alladdress', getAddr);
  $('body').on('click', '.task-del', delTask);
  $('body').on('click', '#publish-task-btn', doComplete);
  $('body').on('change', '#platform-list', doInitShop);
  $('body').on('change', '#shop-list', doInitArea);
  $('body').on('change', '#color-size-chk', doColorSize);
  $('body').on('input propertychange', '.task-count', doCountTask);

  $('body').on('click', '.task-add', addTask);



  //初始化第一步验证对象
  $("#form-step1").validate({
    rules: rules_step1,
    submitHandler: (e) => { GotoStep2() }
  })

  //初始化第二步验证对象
  $("#form-step2").validate({
    rules: rules_step2,
    submitHandler: (e) => { GotoStep3() }
  })

  //设置VIP过滤
  _vip = cookie("memberValid");
  if (!_vip) $('.u-vip').attr('disabled',true);

  //设置发货地下拉框
  $('#pick').distpicker();
  //设置VIP地区下拉框宽度
  $("#limit-location").select2({ width: 'resolve'});
  //设置任务开始时间
  $("#start-date").val(moment().format('YYYY-MM-DD'));

  // 初始化平台、店铺下拉栏
  initPlatforms();


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
  $('#show-first').mask("#,##0", {reverse: true});
  $('.u-task-count').mask("#,##0", {reverse: true});
}


function doColorSize() {
  if( $(this).prop('checked')  ) {
    $('#color-size-info').attr('readonly',true);
    $('#color-size-info').val('无规格')
  }else{
    $('#color-size-info').attr('readonly',false)
    $('#color-size-info').val('')
  }
}


function doPre() {
  renderTask(PREV)
}

function doNext() {
  _cid =  parseInt($('.active .mt-step-number').text()) - 1;
  switch(_cid) {
    case 0: $('#form-step1').submit();break;
    case 1: $('#form-step2').submit();break;
    case 2: renderTask(NEXT);break;
  }
}


function GotoStep2() {
  renderTask(NEXT)
}

function GotoStep3() {
  var pic = $('#upload').attr('picurl');
  if (isNull(pic)) {
    notifyInfo('请上传图片！')
    return;
  }

  if ( (!$("#normaltask")[0].checked)&&(!$("#keywordtask")[0].checked)&&(!$("#picturetask")[0].checked)&&(!$("#wordtask")[0].checked) ) {
    notifyInfo(MSG_SELECT_ONE);
    return;
  }

  if ( $('.task-wrap-item .u-task-key').length == 0 ) {
    notifyInfo('请添加任务！');
    return;
  }


  if (checkInput('.task-wrap-item .u-task-key',MSG_INPUT_KEYWORD)) return;
  if (checkInput('.task-wrap-item .u-task-count',MSG_INPUT_TASK_COUNT))  return;

  if ( $('.task-wrap-item .ipt-keyword').length > 0 ) {
    if (checkInputHasOne('.task-wrap-item .ipt-keyword',MSG_INPUT_KEYWORD_EX)) return;
  }

  if ( $('.task-wrap-item .u-task-keyword').length > 0 ) {
    if (checkInput('.task-wrap-item .u-task-keyword',MSG_INPUT_TEXT)) return;
  }

  doPublish()
}

function checkInputHasOne(cls, msg) {
  let ret = 1;

  $(cls).each(function() {
    if ($(this).val() !== "") {
        ret = 0;
        return ret;
    }
  })
  if (ret == 1) {
    notifyInfo(msg)
  }
  return ret;
}


function checkInput(cls, msg) {
  let ret = 0;
  $(cls).each(function() {
    if ($(this).val() === "") {
        ret = 1;
        return ret;
    }
  })
  if (ret == 1) {
    notifyInfo(msg)
  }
  return ret;
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

function initTime() {
  $('.timepicker-24').timepicker({ showMeridian: false });
  $('.timepicker-from').timepicker('setTime', moment().format('HH:mm'));

  if (moment().diff(moment().set('hour',21).set('minute', 0)) > 0 ) {
    $('.timepicker-to').timepicker('setTime', '23:59');
  }else{
    $('.timepicker-to').timepicker('setTime', moment().add('hours',3).format('HH:mm'));
  }
}

async function addTask() {
  var count = $('.task-wrap-item').length + 1;
  var key   = $('#keywordtask').prop('checked');
  var img   = $('#picturetask').prop('checked');
  var word  = $('#wordtask').prop('checked');
  $('#keywordtask').prop('checked', false)
  $('#picturetask').prop('checked', false)
  $('#wordtask').prop('checked', false);

  $(".task-wrap").append(await renderTmpl('/tmpl/sell/createtask.tmpl', { type:'nor-task', count:count, key:key, img:img, word:word, list:[1,1,1,1,1] }));
  initTime()
}

function delTask() {
  $(this).parents('.task-wrap-item').remove();
}

function doPublish() {

  taskObj = {
    tasktype: $("input[name='r-task-type']:checked").val(),
    // returntype: $("input[name='r-return-type']:checked").val(),
    goodsList: [{
      colorSize: $('#color-size-chk').prop('checked')?'':$('#color-size-info').val(),
      factprice: $('#real-price').val().replace(/,/g, ''),
      goodsmainimg: $('#upload').attr('picurl'),
      goodsimg1: '',
      goodsimg2: '',
      goodsname: $('#name').val(),
      goodsposition: $('#goods-province').val()+$('#goods-city').val(),
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
    
    startdate: $('#start-date').val(),
    num: $('#task-count').val().replace(/,/g, ''),
    addcharges: $('#award-money').val().replace(/,/g, ''),
    share: $('#share').val(),
    matchLabel: $('#match-label').val(),
    sex: $('#sex').val(),
    ageLimit: $('#age').val(),
    location: ( $('#limit-location').val() === null)? "":$('#limit-location').val().join(';'),
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
    jdLocation: getCheckedVal('jd-location'),
    tbLocation: getCheckedVal('tb-location'),
    buyExpress: $('#buy-express').val(),
    auditFirst: $('#audit-first').val(),
    showFirst: $('#show-first').val(),
    taskKeyList: getTaskData(),
    explains: $('#other').val()
  }

  promiseTmpl('POST', TMPL_SELL_TASK_COST, URL_TASK_CAL_MONEY, JSON.stringify(taskObj), cbInfo)
}



function getArrVal(obj, type) {
  let arr = [];
  obj.each(function() {
    type?arr.push($(this).val()):arr.push( { picture:$(this).attr('picurl') } );
  }) 
  if (type) {
    return arr.join(';')
  }else{
    return arr
  }
}

function getTaskData() {
  let result = []

  $('.task-wrap-item').each(function() {
    let item = this;
    let typeArr = $(this).find('.task-type')
    let taskItem = {
      taskkeyType: typeArr.text(),
      keyword: $(this).find('.u-task-key').val(),
      taskkeyNum: $(this).find('.u-task-count').val(),
      from: $(this).find('.timepicker-from').val(),
      to: $(this).find('.timepicker-to').val(),
      appoints: '',
      taskPictureList: [],
      goodComment: ''
    }

    typeArr.each(function() {
      if( $(this).text() == '1' ) return;
      if( $(this).text() == '2' ) {
        taskItem.appoints = getArrVal( $(item).find('.ipt-keyword'), true)
      }
      if( $(this).text() == '3' ) {
        taskItem.taskPictureList = getArrVal( $(item).find('.ipt-img'), false)
      }
      if( $(this).text() == '4' ) {
        taskItem.goodComment = getArrVal( $(item).find('.u-task-keyword'), true)
      }
    })

    result.push( taskItem )
  })
  return result;
}

function formatCost(ret) {
  let index =0;
  let result = Object.assign({}, ret[0]);
  result.data = []
  if (ret.length>1) {
    index = 1;
  }
  for(i=index;i<ret.length;i++) {
    result.data.push(ret[i]);
  }
  return result;
}


function cbInfo(r, e) {
  let ret = e;
  let obj = formatCost(ret.data)
  Object.assign(obj, {balance: $('#u-money', parent.document).text()})
  $('.step3').empty()
  $('.step3').append($.templates(r).render(obj, rdHelper))

  renderTask(NEXT)
}

function doComplete() {
  promiseTmpl('POST', TMPL_SELL_TASK_COST, URL_TASK_PUBLISH, JSON.stringify(taskObj), cbComplete)
}

function cbComplete() {
  msgbox(MSG_TASK_SAVE_SUCC,MSG_CONT_CREATE_TASK,MSG_PUB_TASK, function(ret) {
    if (ret) {
      goto('createTask.html')
    }else{
      goto('listTask.html')
    }
  })
}


function initPlatforms() {
  promise('GET', URL_TASK_ALL_PLATFORM, null, cbPlatformInfo, null);
}

function cbPlatformInfo(e) {
  initPlatformList(e);
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
  if ( platform === '淘宝' ) {
    $('.form-group-tb').removeClass('hide')
    $('.form-group-jd').addClass('hide')
    $('#r-task-mtb').prop('checked',true)
    $('#r-task-mjd').prop('checked',false)
  }else if(platform === '京东') {
    $('.form-group-tb').addClass('hide')
    $('.form-group-jd').removeClass('hide')
    $('#r-task-mtb').prop('checked',false)
    $('#r-task-mjd').prop('checked',true)
  }
  $("#shop-list").empty().append(await renderTmpl(TMPL_SELL_SHOP_SELECT, { list:platformMap[platform] }));
}


function doInitArea() {
  let province =  $('#shop-list option:selected').data("province");
  let city =  $('#shop-list option:selected').data("city");

  $("#goods-province option[value='"+province+"']").attr("selected", "selected");
  $("#goods-province").trigger("change");
  $("#goods-city option[value='"+city+"']").attr("selected", "selected");
}

function doCountTask() {
  let count = 0;
  $('.task-count').each(function() {
    count += parseInt($(this).val() || 0);
  });
  $('#task-count').val(count);
}
