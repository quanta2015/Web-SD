var _id;

$(init);

function init() {
  _id = getUrlParam('id')


  initList();
  $('body').on('click', '.choose-task', doChoose);
  $('body').on('click', '.return', doReturn);
}

async function initList() {
  param = { taskkeyid: _id }
  ret = await promiseCall( [URL_BUY_TASKDETAIL, encodeQuery(param)].join('?'), null )
  Object.assign(ret.data, { imgPrefix: IMG_PREFIX });
  $('.g-detail').append(await renderTmpl(TMPL_BUY_CHOOSE_DETAIL, ret.data, rdHelper))
  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
}


function doChoose(e) {
  msgbox('温馨提示', '<span class="font-red">请于60分钟内完成任务，超过时间平台会自动取消任务并扣取2金！诺于15分钟内主动撤单，将不会扣取佣金！</span>','取消','确认',chooseTask)
} 

function chooseTask(ret) {
  if (!ret) {
    var obj = { taskkeyId: _id }
    promise('GET',[URL_BUYER_GET_TASK, encodeQuery(obj)].join('?') ,null, cbChoose, null)
  }
}

function cbChoose(e) {
  goto('listOrder.html?status=-1')
}


function doReturn() {
  history.back()
}