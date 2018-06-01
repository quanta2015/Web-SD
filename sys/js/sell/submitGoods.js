var _id;

$(init);

function init() {
  _id = getUrlParam('id')

  initList();

  $('body').on('click', '#return-list', doReturnList);
}

function initList() {
  // TmplData(TMPL_BUY_ALL_ORDER,URL_BUYER_ALL_ORDER,null, cbList)
  
}


// async function initDetail() {
//   d = {  
//         show:false
//     }
//   $('.m-d-detail').append(await renderTmpl(TMPL_BUY_ORDER_DETAIL, d))
// }


function doReturnList() {
    location.href = 'listTaskItem.html?id=' +  _id
}

function doCheckShop() {

}