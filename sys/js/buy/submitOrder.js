$(init);

function init() {

  initDetail();

  initList();

  // $('body').on('click', '.detail-task', doDetail);
}

function initList() {
  // TmplData(TMPL_BUY_ALL_ORDER,URL_BUYER_ALL_ORDER,null, cbList)
  renderImg()
}


async function initDetail() {
  d = {  
        show:false
    }
  $('.m-d-detail').append(await renderTmpl('/tmpl/buy/detail_order.tmpl', d))
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

