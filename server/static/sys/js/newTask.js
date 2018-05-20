$(init)

function init() {
  initStatus();

  $('[data-button="bindIDCardBtn"]').on('click', function(e) {
    $("#mainframe", parent.document.body).attr("src", "bindIDCard.html");
  });

  $('[data-button="bindBankCardBtn"]').on('click', function(e) {
    $("#mainframe", parent.document.body).attr("src", "bindBankCard.html");
  });

  $('[data-button="bindJingdongBtn"]').on('click', function(e) {
    $("#mainframe", parent.document.body).attr("src", "bindJingdong.html");
  });

  $('[data-button="bindTaobaoBtn"]').on('click', function(e) {
    $("#mainframe", parent.document.body).attr("src", "bindTaobao.html");
  });
}

function initStatus() {
  let approveState = parseInt(cookie('approveState'));
  let bankCardState = parseInt(cookie('bankcardState'));
  let jingdongState = parseInt(cookie2('approve', 'jingdongList'));
  let taobaoState = parseInt(cookie2('approve', 'taobaoList'));

  if (approveState) {
    $('#id-card .task-status').removeClass('status-no-bind').text(TEXT_BIND_SUCCESS);
    $('#id-card a').removeClass('btn-outline').text(TEXT_BIND_SUCCESS)
  }
  if (bankCardState) {
    $('#bank-card .task-status').removeClass('status-no-bind').text(TEXT_BIND_SUCCESS);
    $('#bank-card a').removeClass('btn-outline').text(TEXT_BIND_SUCCESS);
  }

  if (jingdongState) {
    $('#jingdong .task-status').removeClass('status-no-bind').text(TEXT_BIND_SUCCESS);
    $('#jingdong a').removeClass('btn-outline').text(TEXT_BIND_SUCCESS);
  }

  if (taobaoState) {
    $('#taobao .task-status').removeClass('status-no-bind').text(TEXT_BIND_SUCCESS);
    $('#taobao a').removeClass('btn-outline').text(TEXT_BIND_SUCCESS);
  }
}
