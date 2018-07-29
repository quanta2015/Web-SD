const platform = PLATFORM_DATA[getUrlParam('platform')];
const creditType = getUrlParam('platform')==='jingdong'?'白条':'花呗';
let status;

let rules = {
  acount: {
    required: !0,
  },
  acountLevel: {
    required: !0
  },
  receiver: {
    required: !0
  },
  receiveMobile: {
    required: !0,
    number: !0
  },
  receiveProvince: {
    required: !0,
  },
  receiveAddress: {
    required: !0,
  }
}

$(init);

function init() {

  initBindInfo();
  $('body').on('click', '#returnBtn', doReturn);
  $('body').on('click', '#modifyBtn', doModify );

}

async function doModify() {
  $(".g-account").empty();
  renderTmpl(TMPL_BUY_BIND_ACCOUNT, {
    platform: platform.type,
    creditType: platform.creditType,
    levels: platform.levels,
    buyerId: bindInfo.taobaoList[0].id,
    acount: bindInfo.taobaoList[0].acount,
    acountLevel: bindInfo.taobaoList[0].acountLevel,
    baitiaoStart: parseInt(bindInfo.taobaoList[0].baitiaoStart)?"checked":null,
    baitiaoUnStart: parseInt(bindInfo.taobaoList[0].baitiaoStart)?null:"checked",
    receiveProvince: bindInfo.taobaoList[0].receiveProvince,
    receiveCity:  bindInfo.taobaoList[0].receiveCity,
    receiveCountry: bindInfo.taobaoList[0].receiveCountry,
    receiveAddress: bindInfo.taobaoList[0].receiveAddress,
    receiver: bindInfo.taobaoList[0].receiver,
    receiveMobile: bindInfo.taobaoList[0].receiveMobile,
    accountImg: [
      bindInfo.taobaoList[0].baitiaoImg,
      bindInfo.taobaoList[0].mysiteImg,
      bindInfo.taobaoList[0].myacountImg
    ],
    list: [1,1,1],
    imgInfo: ['我的页面', '我的账号页面', `开通${creditType}情况`],
    type: null,
    status: 2,
    statusText: AUDIT_STATUS[2],
    imgPrefix: IMG_PREFIX
  }, rdHelper).then( (h)=> {
    $(".g-account").append(h);
    $('#pick').distpicker();
    $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
    $("#form-bind").validate({
      rules: rules,
      submitHandler: (e) => { doSave() }
    })
  })
}

function initBindInfo() {
  promise('GET', URL_BUY_INFO, null, cbInitBindInfo, null);
}

async function cbInitBindInfo(e) {
  bindInfo = e;
  let key = getUrlParam('platform') === 'jingdong' ? 'jingdongList' : 'taobaoList';
  status = e[key][0] && e[key][0].approve >=0 ? e[key][0].approve : -1;
  let func;
  // status = -1
  if ( status == -1 || status == null) {
    //未绑定
    func = renderTmpl(TMPL_BUY_BIND_ACCOUNT, {
      platform: platform.type,
      creditType: platform.creditType,
      levels: platform.levels,
      list: [1,1,1],
      imgInfo: ['我的页面', '我的账号页面', `开通${creditType}情况`],
      status: -1,
      baitiaoStart: "checked"
    }, rdHelper)
  } else {
    //显示已经绑定表单
    func = renderTmpl(TMPL_BUY_BIND_ACCOUNT, {
      platform: platform.type,
      creditType: platform.creditType,
      levels: platform.levels,
      buyerId: e.taobaoList[0].id,
      acount: e.taobaoList[0].acount,
      acountLevel: e.taobaoList[0].acountLevel,
      baitiaoStart: parseInt(e.taobaoList[0].baitiaoStart)?"checked":null,
      baitiaoUnStart: parseInt(e.taobaoList[0].baitiaoStart)?null:"checked",


      receiveProvince: e.taobaoList[0].receiveProvince,
      receiveCity:  e.taobaoList[0].receiveCity,
      receiveCountry: e.taobaoList[0].receiveCountry,


      receiveAddress: e.taobaoList[0].receiveAddress,
      receiver: e.taobaoList[0].receiver,
      receiveMobile: e.taobaoList[0].receiveMobile,
      accountImg: [
        e.taobaoList[0].baitiaoImg,
        e.taobaoList[0].mysiteImg,
        e.taobaoList[0].myacountImg
      ],
      list: [1,1,1],
      imgInfo: ['我的页面', '我的账号页面', `开通${creditType}情况`],
      type: status !== 2 ? "disabled" : null,
      status: status,
      statusText: AUDIT_STATUS[status],
      imgPrefix: IMG_PREFIX
    }, rdHelper)
  }
  func.then(h => {
    $(".g-account").append(h);
    $('#pick').distpicker();
    $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
    $("#form-bind").validate({
      rules: rules,
      submitHandler: (e) => { doSave() }
    })
  })
}

function doReturn() {
  goto('newTask.html')
}

function doSave(data) {
  let obj = {
    type: platform.type,
    buyerId: cookie('id'),
    acount: $('#account').val(),
    acountLevel: $('#acount-level').val(),
    baitiaoStart: $("input[name='r-baitiao-start']:checked").val(),


    receiveProvince: $('#receive-province').val(),
    receiveCity: $('#receive-city').val(),
    receiveCountry: $('#receive-country').val(),


    receiveAddress: $('#receive-address').val(),
    receiver: $('#receiver').val(),
    receiveMobile: $('#receive-mobile').val(),
    baitiaoImg: $('#upload-0').attr('picurl'),
    mysiteImg: $('#upload-1').attr('picurl'),
    myacountImg: $('#upload-2').attr('picurl')
  };
  // 没传新图片且状态为审核不通过尝试去cookie取
  let imgKeyList = ['baitiaoImg', 'mysiteImg', 'myacountImg'];
  let imgKeyInfos = ['我的页面', '我的账号', `开通${creditType}情况`];
  for (let i = 0; i < imgKeyList.length; i++) {
    let key = imgKeyList[i];
    if (!obj[key] && status === 2) {
      obj[key] = $(`#upload-${i}`).attr('picurl');
    }
    if (!obj[key]) {
      return errorInfo(`缺少${imgKeyInfos[i]}图片`);
    }
  }
  
  promise('POST', URL_BUY_BIND_ACCOUNT, JSON.stringify(obj), cbBind, null);
}

function cbBind(e) {
  alertBox(MSG_BIND_SUCCESS, ()=>{ goto("newTask.html") })
}
