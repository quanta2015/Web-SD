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

}

function initBindInfo() {
  promise('GET', URL_BUY_INFO, null, cbInitBindInfo, null);
}

async function cbInitBindInfo(e) {
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
    })
  } else {
    //显示已经绑定表单
    func = renderTmpl(TMPL_BUY_BIND_ACCOUNT, {
      platform: platform.type,
      creditType: platform.creditType,
      levels: platform.levels,
      buyerId: cookie('id'),
      acount: cookie2('acount', platform.cko),
      acountLevel: cookie2('acountLevel', platform.cko),
      baitiaoStart: parseInt(cookie2('baitiaoStart', platform.cko))?"checked":null,
      baitiaoUnStart: parseInt(cookie2('baitiaoStart', platform.cko))?null:"checked",
      receiveProvince: cookie2('receiveProvince', platform.cko),
      receiveAddress: cookie2('receiveAddress', platform.cko),
      receiver: cookie2('receiver', platform.cko),
      receiveMobile: cookie2('receiveMobile', platform.cko),
      accountImg: [
        cookie2('baitiaoImg', platform.cko),
        cookie2('mysiteImg', platform.cko),
        cookie2('myacountImg', platform.cko)
      ],
      list: [1,1,1],
      imgInfo: ['我的页面', '我的账号页面', `开通${creditType}情况`],
      type: status !== 2 ? "disabled" : null,
      status: status,
      statusText: AUDIT_STATUS[status],
      imgPrefix: IMG_PREFIX
    })
  }
  func.then(h => {
    $("body").append(h);
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
    receiveAddress: $('#receive-address').val(),
    receiver: $('#receiver').val(),
    receiveMobile: $('#receive-mobile').val(),
    baitiaoImg: $('#upload-0').attr('picurl') || cookie2('baitiaoImg', platform.cko),
    mysiteImg: $('#upload-1').attr('picurl') || cookie2('mysiteImg', platform.cko),
    myacountImg: $('#upload-2').attr('picurl') || cookie2('myacountImg', platform.cko)
  };
  // 没传新图片且状态为审核不通过尝试去cookie取
  let imgKeyList = ['baitiaoImg', 'mysiteImg', 'myacountImg'];
  let imgKeyInfos = ['我的页面', '我的账号', `开通${creditType}情况`];
  for (let i = 0; i < imgKeyList.length; i++) {
    let key = imgKeyList[i];
    if (!obj[key] && status === 2) {
      obj[key] = cookie2(key, platform.cko);
    }
    if (!obj[key]) {
      return errorInfo(`缺少${imgKeyInfos[i]}图片`);
    }
  }
  
  promise('POST', URL_BUY_BIND_ACCOUNT, JSON.stringify(obj), cbBind, null);
}

function cbBind(e) {
  initUserInfo();
  alertBox(MSG_BIND_SUCCESS, ()=>{ goto("newTask.html") })
}
