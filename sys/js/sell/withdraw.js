$(init);

function init() {

  initList('#tab-capital');
  initAddWithdraw();
}

async function initList(tab) {
  // 初始化table数据
  $(`${tab} .table-data`).append(await renderTmpl(TMPL_SELL_WITHDRAW_LIST, {
    data: [1,1,1]
  }));
  $(`${tab} .table-pg`).twbsPagination({
    totalPages: 5,
    visiblePages: 3,
    onPageClick: function(event, page) {
      // ajax request
      console.log(page)
      return renderTmpl(TMPL_SELL_WITHDRAW_LIST, {
        data: new Array(page).fill(1),
      }).then(html => {
        $(`${tab} .table-data`).empty().append(html);
      })
    }
  })
  $('.date-picker').datepicker({
    rtl: App.isRTL(),
    orientation: 'right',
    autoclose: true
  });
}

function cbList(r, e) {
  console.log(e);
  if (e[0].code == 0) {
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(e[0], null));
  } else if (e.code == -1) {
    relogin();
  }
}

function initAddWithdraw() {
  promiseData('GET', URL_SELL_BALANCE, null, (e) => {
    renderTmpl(TMPL_SELL_WITHDRAW, {
      name: cookie('name'),
      bankcard: cookie('bankcard'),
      capWithdraw: null,
      comWithdraw: null,
      capBalance: e.data,
      comBalance: 0,
      amount: '0.00',
      poundage: '0.00'
    }).then(html => $('#tab-commision').append(html));
  })
}
