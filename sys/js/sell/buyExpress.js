// let pageData = Object.assign({}, PAGE_DATA);

$(init);

function init() {

  $('#buyExpress').on('click', doBuyExpress);
}


function doBuyExpress() {
  let obj = {
    number: $("#expressAmount").val() 
  };
  // Object.assign(param, pageData);
  promise('GET', ['/task/buy_express', encodeQuery(obj)].join('?'), null, cbBuyExpress, null)
}

function cbBuyExpress(e) {
  notifyInfo(`成功购买面单！目前账号面单数为${e.number}`)
}


// function initPage(totalPages) {
//   $('.portlet-body .table-pg').twbsPagination({
//     totalPages: totalPages || 1,
//     onPageClick: function(event, page) {
//       pageData.pageIndex = page - 1;
//       initList();
//     }
//   })
// }
