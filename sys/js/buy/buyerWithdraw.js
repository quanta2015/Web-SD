var app = new Vue({
  el: '#app',
  data: {
    name: cookie('name'),
    bankNo: cookie2('bankNo', 'buyerBankList'),
    capWithdraw: null,
    comWithdraw: null,
    capBalance: 0,
    comBalance: 0,
    amount: '0.00',
    poundage: '0.00'
  }
})
