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
let _tid;
let subTaskCount = 0;



$(init);

function init() {
  $('body').on('click', '.btn-pre', doPre);
  $('body').on('click', '.btn-next', doNext);
  $('body').on('click', '.task-add', addTask);
  $('body').on('click', '.task-del', delTask);
  $('body').on('click', '#publish-task-btn', doComplete);
  $('body').on('change', '#platform-list', doInitShop);
  $('body').on('change', '#shop-list', doInitArea);
  $('body').on('change', '#color-size-chk', doColorSize);
  $('body').on('input propertychange', '.task-count', doCountTask);


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


  _tid = getUrlParam('id');
  
}


function doColorSize() {
  if( $(this).prop('checked')  ) {
    $('#color-size-info').attr('readonly',true);
    $('#color-size-info').val('自选任意规格')
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

  if ( $('.task-wrap-item .u-task-key').length == 0 ) {
    notifyInfo('请添加任务！');
    return;
  }


  if (checkInput('.task-wrap-item .u-task-key',MSG_INPUT_KEYWORD)) return;
  if (checkInput('.task-wrap-item .u-task-count',MSG_INPUT_TASK_COUNT))  return;


  doPublish()
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



function initTime(index) {
  $(`.task-wrap-item-${index} .timepicker-24`).timepicker({ showMeridian: false });
  $(`.task-wrap-item-${index} .timepicker-from`).timepicker('setTime', moment().format('HH:mm'));
  $(`.task-wrap-item-${index} .timepicker-to`).timepicker('setTime', '23:59');
}

async function addTask() {
  var nor = $('#normaltask').prop('checked');
  var store   = $('#keywordtask').prop('checked');
  var follow   = $('#picturetask').prop('checked');
  var add  = $('#wordtask').prop('checked');
  $('#keywordtask').prop('checked', false)
  $('#picturetask').prop('checked', false)
  $('#wordtask').prop('checked', false);

  subTaskCount++

  $(".task-wrap").append(await renderTmpl( TMPL_SELL_CREATE_TASKSEE , { count:subTaskCount, nor:nor, store:store, follow:follow, add:add }));
  initTime(subTaskCount)
  doCountTask()
}

function delTask() {
  $(this).parents('.task-wrap-item').remove();
  doCountTask()
}

function doPublish() {

  taskObj = {
    tasktype: $("input[name='r-task-type']:checked").val(),
    goodsList: [{
      colorSize: $('#color-size-info').val(),
      factprice: $('#real-price').val().replace(/,/g, ''),
      goodsmainimg: $('#upload').attr('picurl'),
      goodsname: $('#name').val(),
      goodsposition: $('#goods-province').val()+$('#goods-city').val(),
      goodsurl: $('#url').val(),
      highprice: $('#price-to').val().replace(/,/g, ''),
      lowprice: $('#price-from').val().replace(/,/g, ''),
      locationway: $("input[name='r-locationway']:checked").val(),
      orderwords: $('#order-message').val(),
      salesVolume: $('#sell-count').val().replace(/,/g, ''),
      searchprice: $('#mobile-price').val().replace(/,/g, ''),
      goodsimg1: '',
      goodsimg2: '',
      number:''
    }],
    goodsname: $('#name').val(),
    
    startdate: $('#start-date').val(),
    num: $('#task-count').val().replace(/,/g, ''),   
    addcharges: $('#award-money').val().replace(/,/g, ''), 
    sex: $('#sex').val(),
    ageLimit: $('#age').val(),
    location: ( $('#limit-location').val() === null)? "":$('#limit-location').val().join(';'),
    huabeiStart: $('#huabei-start').val(),
    jingdongLevel: $('#jingdong-level').val(),
    taobaoLevel: $('#taobao-level').val(),
    chatNecessary: $("input[name='r-chat-necessary']:checked").val(),
    shopId: $('#shop-list').val(),
    singleAmount: $('#pub-itl-amount').val(),
    intervals: $('#pub-itl-time').val(),
    jdLocation: getCheckedVal('jd-location'),
    tbLocation: getCheckedVal('tb-location'),
    auditFirst: $('#audit-first').val(),
    showFirst: $('#show-first').val(),
    taskKeyList: getTaskData(),
    explains: $('#other').val(),
    askContent: "",
    answerContent: "",
    share: $('#share').val(),
    matchLabel: $('#match-label').val(),
    useHuabei: $('#use-huabei').val(),
    isRecieve: $('#is-recieve').val(),
    rebuy: $('#rebuy').val(),
    expressCompany: $('#express-company').val(),
    expressWeight: $('#express-weight').val(),
    buyExpress: $('#buy-express').val(),
    ask: 0,
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
    }
    let typeList = [];
    typeArr.each(function() {
      typeList.push( $(this).text() );
    })

    result.push( taskItem )
  })
  return result;
}



function cbInfo(r, e) {
  let ret = e;
  let obj = formatCost(ret.data)
  Object.assign(obj, {balance: $('#u-money', parent.document).text(), type: 'browse'})
  $('.step3').empty()
  $('.step3').append($.templates(r).render(obj, rdHelper))

  renderTask(NEXT)
}

function doComplete() {

  promise('POST', URL_TASK_PUBLISH, JSON.stringify(taskObj), (e) => {
      promise('GET', URL_SELL_PAY_TASK + e.id, null, (e)=>{
        alertBox("成功发布任务", (e)=>{
          clickMenu('browserTaskList')
        })
      }, (e)=>{
        msgbox('提示信息',e.message,MSG_WAIT,MSG_RECHARGE, (ret)=>{
          if (!ret) {
            goto('rechargeTask.html')
          }else{
            clickMenu('browserTaskList')
          }
        })
      });
  })
}



function initPlatforms() {
  promise('GET', URL_TASK_ALL_PLATFORM, null, (ret)=>{
    let platforms = ret.map(v => v.platform);
    ret.forEach(v => {
      platformMap[v.platform] = v.shops;
    })

    platformData = $.templates('<option value="">请选择平台</option>{{for list}}<option value="{{:#data}}">{{:#data}}</option>{{/for}}').render({ list:platforms });
    shopData = $.templates('<option value="">请选择店铺</option>{{for list}}<option value="{{:#data.id}}" data-province="{{:#data.addressProvince}}" data-city="{{:#data.addressCity}}">{{:#data.name}}</option>{{/for}}').render({ list:platformMap[platforms[0]] });
    $("#platform-list").append(platformData);
    $("#shop-list").append(shopData);


    //重新发布 - 初始化任务
    if (_tid !== null) initTask();


  }, null);
}



async function doInitShop() {
  let platform = $(this).val();
  changeType(platform);

  $("#shop-list").empty().append(await renderTmpl(TMPL_SELL_SHOP_SELECT, { list:platformMap[platform] }));
}


function doInitArea() {
  let province =  $('#shop-list option:selected').data("province");
  let city =  $('#shop-list option:selected').data("city");

  $("#goods-province option[value='"+province+"']").attr("selected", "selected");
  $("#goods-province").trigger("change");
  $("#goods-city option[value='"+city+"']").attr("selected", "selected");
}





function initTask() {
  promise('GET','/task/task_detail/'+_tid, null, (e)=>{

    $(`#platform-list option[value=${e.shop.type}]`).prop('selected','selected');
    $(`#shop-list option[value=${e.shop.id}]`).prop('selected','selected');

    changeType(e.shop.type);

    $('.btn-next').trigger('click');

    //商品信息
    $('#url').val(e.goodsList[0].goodsurl);
    $('#name').val(e.goodsList[0].goodsname);
    $('#uploadImg').attr('src', IMG_PREFIX + e.goodsList[0].goodsmainimg);
    $('#upload').attr('picurl', e.goodsList[0].goodsmainimg);

    if (e.goodsList[0].colorSize === '自选任意规格') {
      $('#color-size-chk').trigger('click')
    }else{
      $('#color-size-info').val(e.goodsList[0].colorSize)
    }

    $('#real-price').val(e.goodsList[0].factprice)
    $('#mobile-price').val(e.goodsList[0].searchprice)


    //设置如何找到商品
    $(`.r-locationway[value='${e.goodsList[0].locationway}']`).prop('checked',true)
    $(`#goods-province option[value='${e.shop.addressProvince}']`).attr("selected", "selected");
    $("#goods-province").trigger("change");
    $(`#goods-city option[value='${e.shop.addressCity}']`).attr("selected", "selected");
    $('#price-from').val(e.goodsList[0].lowprice)
    $('#price-to').val(e.goodsList[0].highprice)
    $('#sell-count').val(e.goodsList[0].salesVolume)
    $('#order-message').val(e.goodsList[0].orderwords)

    //淘宝定位
    e.tbLocation.split(';').forEach((v)=>{
      val = parseInt(v);
      $(`.tb-location[value='${val}']`).prop('checked',true)
    })

    //任务类型和单数
    e.taskKeyList.forEach((el,index)=>{

      nor = false;
      store = false;
      follow = false;
      add = false;

      typeList = el.taskkeyType.split("");

      typeList.forEach((v)=>{
        if (1 === parseInt(v)) nor = true;
        if (2 === parseInt(v)) store = true;
        if (3 === parseInt(v)) follow = true;
        if (4 === parseInt(v)) add = true;
      })

      ret = { count:index+1, nor:nor, store:store, follow:follow, add:add, data:el, imgPrefix:IMG_PREFIX.trim()};

      (function(dat) {
          renderTmpl('/tmpl/sell/createtaskseeEx.tmpl', dat ).then(function(h) {
            $(".task-wrap").append(h);
            initTimeControl(index+1)
          })
      })(ret);
    })

    doCountTask()


    //增值服务
    $('#show-first').val(e.showFirst)
    $('#award-money').val(e.addcharges)
    $(`#audit-first option[value='${e.auditFirst}']`).prop('selected','selected')
    $(`#sex option[value='${e.sex}']`).prop('selected','selected')
    $(`#age option[value='${e.ageLimit}']`).prop('selected','selected')
    $(`#taobao-level option[value='${e.taobaoLevel}']`).prop('selected','selected')
    $(`#huabei-start option[value='${e.huabeiStart}']`).prop('selected','selected')
    $('#limit-location').select2('val', e.location.split(';') );

    $('#other').val(e.explains)

  },null)
}