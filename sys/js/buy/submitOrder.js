var _id;

$(init);

function init() {
  initList();
  // $('body').on('click', '.detail-task', doDetail);
  

}

function initList() {
  // TmplData(TMPL_BUY_ALL_ORDER,URL_BUYER_ALL_ORDER,null, cbList)
  renderImg()
}



function renderImg() {
  $(".m-img").each( function(index,val) {
    $img = $(this), $type = $(this).attr('type');
    ((obj, ret) => {
      renderTmpl('/tmpl/buy/upload_img.tmpl', { data: ret }).then(function(e) {
        obj.append(e)
      })
    })($img, $type)
  })
}

