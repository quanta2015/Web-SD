$(init)

function init() {
  initStatus();

  $('[data-button="bindIDCard"]').on('click', function(e) {
    $("#mainframe", parent.document.body).attr("src", "bindIDCard.html");
  });

  $('[data-button="bindBankCard"]').on('click', function(e) {
    $("#mainframe", parent.document.body).attr("src", "bindBankCard.html");
  });
}

function initStatus() {
  let approveState = parseInt($.cookie('approveState'));
  let bankCardState = parseInt($.cookie('bankcardState'));

  if (approveState) {
    $('#id-card .task-status').removeClass('status-no-bind').text(TEXT_BIND_SUCCESS);
    $('#id-card a').removeClass('btn-outline').text(TEXT_BIND_SUCCESS)
  }
  if (bankCardState) {
    $('#bank-card .task-status').removeClass('status-no-bind').text(TEXT_BIND_SUCCESS);
    $('#bank-card a').removeClass('btn-outline').text(TEXT_BIND_SUCCESS);
  }
}
