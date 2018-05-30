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
  ret = await promiseCall( ['/buyertask/taskdetail', encodeQuery(param)].join('?'), null )
  Object.assign(ret.data, { show:true });
  $('.g-detail').append(await renderTmpl('/tmpl/buy/detail_order.tmpl', ret.data))
}


function doChoose(e) {
  var obj = {
    taskkeyId: _id
  }
  promiseData('GET',[URL_BUYER_GET_TASK, encodeQuery(obj)].join('?') ,null, cbChoose)
} 


function cbChoose(e) {
  if (e.code == 0) {
    msgbox("接单成功！","继续接单","查看任务",gotoPage)
  }else if (e.code==99) {
    notifyInfo(e.message);
  }else if (e.code==-1) {
    relogin();
  };
}

function gotoPage(result) {
  if (result) {
    location.href = 'chooseTask.html'
  }else{
    location.href = 'listOrder.html'
  }
}

function doReturn() {
  location.href = 'chooseTask.html'
}