let pageData = Object.assign({}, PAGE_DATA);


$(init);

function init() {
  $('body').on('click', '#withdraw', ()=>{ goto('withdraw.html') });
  $('body').on('click', '#withdraw-detail', ()=>{ goto('withdraw.html') });


  //显示金额
  promiseData('GET','/buyer/buyer_balance',null, (e)=>{
    $("#all").text(e.data.balance+e.data.servicefee);
    $("#servicefee").text(e.data.servicefee);
    $("#balance").text(e.data.balance);
    $("#spread").text(e.data.spread);
  })

  //显示金额流水
  initList(pageData);
}


function initList(pg) {
  param = Object.assign({}, pg);
  TmplData(TMPL_BUY_TRADE_RECORD, [URL_BUY_TRADE_RECORD, encodeQuery(param)].join('?'), null, cbList)
}


function cbList(r,e) {
  let ret = e[0];
  if (ret.code == 0) {
    totalPages = Math.ceil(ret.data.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(ret, rdHelper));
    if ($('.table-pg').text() == '') initPage(totalPages);
  } else if (e[0].code == -1) {
    relogin();
  } else if (e.code == 99){
    notifyInfo(e.message);
  }
}


function initPage(totalPages) {
  $('.portlet-body .table-pg').twbsPagination({
    totalPages: totalPages || 1,
    onPageClick: function(event, page) {
      pageData.pageIndex = page - 1;
      initList(pageData);
    }
  })
}