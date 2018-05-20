$(init);

function init() {
  initBindInfo();

  $('body').on('click', '#returnBtn', doReturn );
  $('body').on('click', '#saveBtn', doSave);
}

async function initBindInfo() {
  var status = cookie2('approve', 'taobaoList');
  status?parseInt(cookie2('approve', 'taobaoList')):null;
  // var status = 1
  console.log(status)
  if ( status == 0 || status == null) {
    //未绑定
    $('.container').append(await renderTmpl(TMPL_BIND_PLATFORM, {
      type: '淘宝',
      creditType: '花呗',
      list: [1,1,1],
      isbind: 0
    }));
  }else if ( status == 1) {
    //显示已经绑定表单
    console.log(cookie2('baitiaoImg', 'taobaoList'))
    $(".container").append(await renderTmpl(TMPL_BIND_PLATFORM, {
      platform: '淘宝',
      buyerId: cookie('id'),
      acount: cookie2('acount', 'taobaoList'),
      acountLevel: cookie2('acountLevel', 'taobaoList'),
      baitiaoStart: parseInt(cookie2('baitiaoStart', 'taobaoList'))?"checked":null,
      baitiaoUnStart: parseInt(cookie2('baitiaoStart', 'taobaoList'))?null:"checked",
      receiveProvince:cookie2('acount', 'taobaoList'),
      // receiveCity: cookie2('receiveCity', 'taobaoList'),
      // receiveCountry: cookie2('receiveCountry', 'taobaoList'),
      receiveAddress: cookie2('receiveAddress', 'taobaoList'),
      receiver: cookie2('receiver', 'taobaoList'),
      receiveMobile: cookie2('receiveMobile', 'taobaoList'),
      img: [
        cookie2('baitiaoImg', 'taobaoList'),
        cookie2('mysiteImg', 'taobaoList'),
        cookie2('myacountImg', 'taobaoList')
      ],
      isbind: 1,
      type: "disabled"
    }) );
  }
}


function doReturn() {
  goto('newTask.html')
}

function doSave(data) {
  let obj = {
    type: '淘宝',
    buyerId: cookie('id'),
    acount: $('#receiver').val(),
    acountLevel: $('#acount-level').val(),
    baitiaoStart: $("input[name='r-baitiao-start']:checked").val(),
    receiveProvince: $('#receiver').val(),
    // receiveCity: $('#receiver').val(),
    // receiveCountry: $('#receiver').val(),
    receiveAddress: $('#receiver').val(),
    receiver: $('#receiver').val(),
    receiveMobile: $('#receiver').val(),
    baitiaoImg: $('#platform-ipt1').attr('url'),
    mysiteImg: $('#platform-ipt2').attr('url'),
    myacountImg: $('#platform-ipt3').attr('url'),
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