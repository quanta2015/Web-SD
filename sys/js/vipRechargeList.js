let pageData = Object.assign({}, PAGE_DATA);

$(init);


function init() {
    initList();

  $('.tab').on('click', (e)=>{
    type = $(e.currentTarget).data('type');
    (type === 'bank')?initList():initListBalance();
  });
}


function initListBalance() {
  promiseTmpl('GET', '/tmpl/list_recharge_balance.tmpl', ['/buyer/vip_record_list', encodeQuery(pageData)].join('?'), null, cbList)
}



function initList() {
    param = Object.assign(pageData, { transferType: 1 });
    promiseTmpl('GET', TMPL_VIP_RECHARGE_LIST, [URL_MEMBERSHIP_LIST, encodeQuery(param)].join('?'), null, cbList)
}

function cbList(r, e) {
    let ret = e;
    Object.assign(ret, pageData);
    totalPages = Math.ceil(ret.total/pageData.pageSize);
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