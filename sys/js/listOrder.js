var _id;

$(init);

function init() {
  initList();
  $('body').on('click', '.detail-task', doDetail);
  $('body').on('click', '.commit-task', doCommit);
  // $("body").on('click', '.g-detail', doDetail)

   $(".mask", parent.document.body).on('click', doCloseDetail)
}

function initList() {
  TmplData(TMPL_BUY_ALL_ORDER,URL_BUYER_ALL_ORDER,null, cbList)
}

function cbList(r, e) {
  if (e[0].code == 0) {
    $(".portlet-body .table").remove();

    e[0] = {
      data: [{
        taskKeyId: 1,
        taskKeyId: 14,
        publishTime: 34343434 ,
        taskKeyType: 'aaa',
        platform: '淘宝',
        taskType: 'pc',
        finidshTime: '2小时',
        reward: '10'
      }]
    }
    $(".portlet-body").prepend($.templates(r[0]).render(e[0], timeHelp));
    // $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
  } else if (e.code == -1) {
    relogin();
  }
}

function doCommit() {
  location.href = 'submitOrder.html'
}

async function doDetail(e) {

  d = {
      data: [{
        taskKeyId: 1,
        taskKeyId: 14,
        publishTime: 34343434 ,
        taskKeyType: 'aaa',
        platform: '淘宝',
        taskType: 'pc',
        finidshTime: '2小时',
        reward: '10'
      }]
    }

  $(".mask", parent.document.body).append(await renderTmpl('/tmpl/buy/detail_order.tmpl', d))
  $(".mask", parent.document.body).fadeToggle()
  $(".page-wrap", parent.document.body).toggleClass('fn-blur')


  // $('.g-detail').append(await renderTmpl('/tmpl/buy/detail_order.tmpl', d))
  // $(".g-detail").fadeToggle()
  // $(".g-order").toggleClass('fn-blur')
}

function doCloseDetail() {
  $(".mask", parent.document.body).fadeToggle()
  $(".page-wrap", parent.document.body).toggleClass('fn-blur')
}

function cbChoose(e) {
  if (e.code == 0) {
    initList()
  } else if (e.code == -1) {
    relogin();
  }
}