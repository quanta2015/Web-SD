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

  toggleBindStatus('taobao', taobaoState);
  toggleBindStatus('id-card', approveState);
  toggleBindStatus('jingdong', jingdongState);
  toggleBindStatus('bank-card', bankCardState);

}

function toggleBindStatus(id, status) {
  if ([1, 2].includes(status)) {
    $(`#${id} .task-status`).removeClass('status-no-bind').text(AUDIT_STATUS[status]);
    $(`#${id} a`).removeClass('btn-outline').text(AUDIT_STATUS[status]);
  } else if (status === 3) {
    $(`#${id} .task-status`).text(AUDIT_STATUS[status]);
    $(`#${id} a`).text(AUDIT_STATUS[status]);
  }
}
