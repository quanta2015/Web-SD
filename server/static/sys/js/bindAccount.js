const platform = PLATFORM_DATA[getUrlParam('platform')];

$(init);

function init() {

  initBindInfo();

  $('body').on('click', '#returnBtn', doReturn);
  $('body').on('click', '#saveBtn', doSave);
}

async function initBindInfo() {
  var status = cookie2('approve', platform.cko);
  status?parseInt(cookie2('approve', platform.cko)):null;

  // status = 3
  if ( status == 0 || status == null) {
    //未绑定
    $('body').append(await renderTmpl(TMPL_BIND_ACCOUNT, {
      platform: platform.type,
      creditType: platform.creditType,
      levels: platform.levels,
      list: [1,1,1],
      status: 0,
    }));
  } else {
    //显示已经绑定表单
    $("body").append(await renderTmpl(TMPL_BIND_ACCOUNT, {
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
      type: status !== 3 ? "disabled" : null,
      status: status,
      statusText: AUDIT_STATUS[status],
    }) );
  }
  $('#pick').distpicker();
  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
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
    baitiaoImg: $('#platform-ipt1').attr('url') || cookie2('baitiaoImg', platform.cko),
    mysiteImg: $('#platform-ipt2').attr('url') || cookie2('mysiteImg', platform.cko),
    myacountImg: $('#platform-ipt3').attr('url') || cookie2('myacountImg', platform.cko)
  };
  console.log(obj)
  promiseData('POST', URL_BUY_BIND_ACCOUNT, JSON.stringify(obj), cbBind);
}

function cbBind(e) {
  if (e.code === 0) {
    initUserInfo();
    alertBox(MSG_BIND_SUCCESS, ()=>{ goto("newTask.html") })
  } else if (e.code==99) {
    notifyInfo(e.message);
  } else if (e.code==-1) {
    relogin();
  };
}
