$(init);

function init() {
  initBindInfo();

  $('body').on('click', '#returnBtn', doReturn );
  $('body').on('click', '#saveBtn', doSave);
}

async function initBindInfo() {
  var status = cookie2('approve', 'jingdongList');
  status?parseInt(cookie2('approve', 'jingdongList')):null;
  // var status = 1
  console.log(status)
  if ( status == 0 || status == null) {
    //未绑定
    $('.container').append(await renderTmpl(TMPL_BIND_PLATFORM, {
      type: '京东',
      creditType: '白条',
      list: [1,1,1],
      isbind: 0
    }));
  }else if ( status == 1) {
    //显示已经绑定表单
    console.log(cookie2('baitiaoImg', 'jingdongList'))
    $(".container").append(await renderTmpl(TMPL_BIND_PLATFORM, {
      platform: '京东',
      buyerId: cookie('id'),
      acount: cookie2('acount', 'jingdongList'),
      acountLevel: cookie2('acountLevel', 'jingdongList'),
      baitiaoStart: parseInt(cookie2('baitiaoStart', 'jingdongList'))?"checked":null,
      baitiaoUnStart: parseInt(cookie2('baitiaoStart', 'jingdongList'))?null:"checked",
      receiveProvince:cookie2('acount', 'jingdongList'),
      // receiveCity: cookie2('receiveCity', 'jingdongList'),
      // receiveCountry: cookie2('receiveCountry', 'jingdongList'),
      receiveAddress: cookie2('receiveAddress', 'jingdongList'),
      receiver: cookie2('receiver', 'jingdongList'),
      receiveMobile: cookie2('receiveMobile', 'jingdongList'),
      img: [
        cookie2('baitiaoImg', 'jingdongList'),
        cookie2('mysiteImg', 'jingdongList'),
        cookie2('myacountImg', 'jingdongList')
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
    type: '京东',
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