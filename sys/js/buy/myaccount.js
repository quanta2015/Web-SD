let pageData = Object.assign({}, PAGE_DATA);


$(init);

function init() {
  $('body').on('click', '#withdraw', ()=>{ goto('withdraw.html') });
  $('body').on('click', '#withdraw-detail', ()=>{ goto('withdraw.html') });

  //显示金额
  promise('GET','/buyer/buyer_balance',null, (e)=>{
    $("#all").text(e.balance+e.servicefee);
    $("#servicefee").text(e.servicefee);
    $("#balance").text(e.balance);
    $("#spread").text(e.spread);
  }, null)

  //显示金额流水
  initList(pageData);
}


function initList(pg) {
  param = Object.assign({}, pg);
  promiseTmpl('GET', TMPL_BUY_TRADE_RECORD, [URL_BUY_TRADE_RECORD, encodeQuery(param)].join('?'), null, cbList)
}


function cbList(r,e) {
  let ret = e;
  totalPages = Math.ceil(ret.data.total/PAGE_DATA.pageSize);
  $(".portlet-body .table").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, rdHelper));
  if ($('.table-pg').text() == '') initPage(totalPages);
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