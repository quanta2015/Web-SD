let capPgData = Object.assign({}, PAGE_DATA);
let comPgData = Object.assign({}, PAGE_DATA);

$(init);

function init() {

  initList('#tab-capital');

  $('[data-toggle]:gt(0)').one('click', async function(e) {
    let tab = $(this).attr('href');
    console.log(tab)

    initList(tab);
  })
}

async function initList(tab) {
  // 初始化搜索框
  $(`${tab} .table-search`).append(await renderTmpl(TMPL_SELL_SRH_CAPITAL, {}));
  // 初始化table数据
  $(`${tab} .table-data`).append(await renderTmpl(TMPL_SELL_CAPITAL_LIST, {
    data: [1,1,1]
  }));
  $(`${tab} .table-pg`).twbsPagination({
    totalPages: 5,
    visiblePages: 3,
    onPageClick: function(event, page) {
      // ajax request
      console.log(page)
      return renderTmpl(TMPL_SELL_CAPITAL_LIST, {
        data: new Array(page).fill(1),
      }).then(html => {
        $(`${tab} .table-data`).empty().append(html);
      })
    }
  })
  $(".date-picker").datetimepicker({
    isRTL: App.isRTL(),
    format: "yyyy-mm-dd hh:ii",
    autoclose: true,
    todayBtn: true,
    pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left"),
    minuteStep: 10
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
