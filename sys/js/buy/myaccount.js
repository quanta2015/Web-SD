let pageData = Object.assign({}, PAGE_DATA);
let _type = 1;

$(init);

function init() {


  $('body').on('click', '#withdraw', ()=>{ goto('withdraw.html') });
  $('body').on('click', '#withdraw-detail', ()=>{ goto('withdraw.html') });
  $('body').on('click', '.m-money-type', doShowMoney );

  

  //显示金额
  promise('GET','/buyer/buyer_balance',null, (e)=>{
    $("#u-money", window.parent.document).text(e.balance+e.servicefee);
    $("#all").text(e.balance+e.servicefee);
    $("#servicefee").text(e.servicefee);
    $("#balance").text(e.balance);
    $("#spread").text(e.spread);
  }, null)

  //显示金额流水
  initList(pageData);
}



function doShowMoney() {
  $('.m-money-type a').removeClass('cur');
  $(this).find('a').addClass('cur');
  _type = parseInt($(this).data('type'));


  initList(pageData)
}

function initList(pg) {
  param = Object.assign(pg, { type: _type });
  promiseTmpl('GET', TMPL_BUY_TRADE_RECORD, [URL_BUY_TRADE_RECORD, encodeQuery(param)].join('?'), null, cbList)
}


function cbList(r,e) {
  let ret = e;
  Object.assign(ret, { type: _type });
  totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
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