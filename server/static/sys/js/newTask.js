$(init)

function init() {
  initStatus();

  $('[data-button]').on('click', function(e) {
    var pageName = $(this).data('button') + '.html'
    $("#mainframe", parent.document.body).attr("src", pageName);
  });

}

function initStatus() {
  let approveState = parseInt(cookie('approveState'));
  let bankCardState = parseInt(cookie('bankcardState'));
  let jingdongState = parseInt(cookie2('approve', 'jingdongList'));
  let taobaoState = parseInt(cookie2('approve', 'taobaoList'));

  taobaoState ? toggleBindStatus('taobao') : null;
  approveState ? toggleBindStatus('id-card') : null;
  jingdongState ? toggleBindStatus('jingdong') : null;
  bankCardState ? toggleBindStatus('bank-card') : null;

}

function toggleBindStatus(id) {
  $(`#${id} .task-status`).removeClass('status-no-bind').text(TEXT_BIND_SUCCESS);
  $(`#${id} a`).removeClass('btn-outline').text(TEXT_BIND_SUCCESS);
}
