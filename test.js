DETAIL_BOX = '<div class="g-dt"  style="position:absolute;width:auto;height:auto;top:0;bottom:0;left:0;right:0;z-index:9999;background:rgba(0,0,0,.5);display:block;"><div class="m-dtw" style="position:absolute;background:#fff;min-width:600px;display:flex;flex-direction:column;box-shadow:1px 1px 5px #ccc;top:50%;right:50%;transform:translateY(-50%) translateX(50%)!important;padding:10px"><div class="m-cls" style="position:absolute;top:-18px;right:-18px;width:36px;height:36px;cursor:pointer;z-index:9999;background-image:url(/img/close.png);"></div></div></div>'

function DetailBox() {

  return {
    show: function() {
      $('.g-dt').remove()
      $('body').append(DETAIL_BOX)
      $('.m-cls').on('click', this.close);
    },
    close: function() {
      $('.g-dt').remove()
    }
  }
}



detail = DetailBox().show()

$('.m-dtw').append('aaa')