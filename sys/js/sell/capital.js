let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {

  initSearchBar();
  initList();
  

  // $('[data-toggle]:gt(0)').one('click', async function(e) {
  //   let tab = $(this).attr('href');
  //   initList(tab);
  // })
}

function initTime() {
  let from =  moment().subtract('days',7).format('YYYY-MM-DD');
  let to = moment().format('YYYY-MM-DD');
  $("#sr-time-from").datetimepicker({ value: from, format:'Y-m-d', timepicker:false});
  $("#sr-time-to").datetimepicker({value: to, format:'Y-m-d', timepicker:false});
}

async function initSearchBar(tab = '#tab-capital') {
  $(`${tab} .table-search`).append(await renderTmpl(TMPL_SELL_SRH_CAPITAL, {}));
  $('body').on('click', '#btn-search', doSearch);
  initTime();
}

// TODO: 目前把佣金tab隐藏了
function initList() {
  let param = {
    status: $('#sr-status'),
    content: $('#sr-cnt'),
    fromDate: $("#sr-time-from").val(),
    toDate: $("#sr-time-to").val(),
  };
  Object.assign(param, pageData);
  TmplData(TMPL_SELL_CAPITAL_LIST, [URL_SELL_TRADE_LIST, encodeQuery(param)].join('?'), null, cbList)
}

function cbList(r, e) {
  let ret = e[0];
  if (ret.code == 0) {
    Object.assign(ret, pageData, {name: cookie('name')});
    totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
    $("#tab-capital .table").remove();
    $('#tab-capital .table-data').prepend($.templates(r[0]).render(ret, rdHelper));
    if ($('#tab-capital .table-pg').text() == '') initPage(totalPages);
  } else if (e[0].code == -1) {
    relogin();
  } else if (e.code == 99){
    notifyInfo(e.message);
  }

}

function initPage(totalPages) {
  $('#tab-capital .table-pg').twbsPagination({
    totalPages: totalPages || 1,
    onPageClick: function(event, page) {
      pageData.pageIndex = page - 1;
      initList(pageData);
    }
  })
}

function doSearch() {
  $('#tab-capital .portlet-body .table-pg').remove();
  $('#tab-capital .portlet-body').append('<div class="table-pg"></div>');
  initList();
}
