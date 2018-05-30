$(init);

function init() {
  initWithdraw();
}

function initWithdraw() {
  // promiseData('GET', URL_SELL_BALANCE, null, (e) => {
    renderTmpl(TMPL_BUY_WITHDRAW, {
      name: cookie('name'),
      bankNo: cookie2('bankNo', 'buyerBankList'),
      capWithdraw: null,
      comWithdraw: null,
      capBalance: 0,
      comBalance: 0,
      amount: '0.00',
      poundage: '0.00'
    }).then(html => $('.container').append(html));
  // })
}
