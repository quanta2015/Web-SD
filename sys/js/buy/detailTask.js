var _id;

$(init);

function init() {
  _id = getUrlParam('id')
  type = getUrlParam('type');


  initList();
  $('body').on('click', '.choose-task', doChoose);
  $('body').on('click', '.return', doReturn);
}

async function initList() {

  param = { taskkeyid: _id, type: type }
  ret = await promiseCall( [URL_BUY_TASKDETAIL, encodeQuery(param)].join('?'), null )
  Object.assign(ret.data, param);
  Object.assign(ret.data, { imgPrefix: IMG_PREFIX });
  $('.g-detail').append(await renderTmpl(TMPL_BUY_CHOOSE_DETAIL, ret.data, rdHelper))
  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
}

function doChoose(e) {

  if(type === 'pay') {
    msg = TEXT_PAY_TASK_INFO
  }else{
    msg = TEXT_BROWSER_TASK_INFO
  }
  msgbox('温馨提示', `<span class="font-red">${msg}</span>`,'取消','确认',chooseTask)
} 

function chooseTask(ret) {
  if (!ret) {
    var obj = { taskkeyId: _id }
    promise('GET',[URL_BUYER_GET_TASK, encodeQuery(obj)].join('?') ,null, cbChoose, null)
  }
}

function cbChoose(e) {
  clickMenu('listOrder-0')
  // goto('listOrder.html?status=-1')
}


function doReturn() {
  goBack()
}