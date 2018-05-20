$(init)

function init() {
  var h = $(document).height();
  $("iframe").height(h - 50);

  $('[data-button="newTaskBtn"]').on('click', function(e) {
      $("#mainframe", parent.document.body).attr("src", "newTask.html");
  });

  $('[data-button="bindIDCardBtn"]').on('click', function(e) {
    $("#mainframe", parent.document.body).attr("src", "bindIDCard.html");
  });

  $('[data-button="bindBankCardBtn"]').on('click', function(e) {
    $("#mainframe", parent.document.body).attr("src", "bindBankCard.html");
  });

  $('[data-button="bindJingdongtBtn"]').on('click', function(e) {
    $("#mainframe", parent.document.body).attr("src", "bindJingdong.html");
  });

  $('[data-button="bindTaobaoBtn"]').on('click', function(e) {
    $("#mainframe", parent.document.body).attr("src", "bindTaobao.html");
  });
 
  $('#exitBtn').on('click', function(e) {
      location.href = 'index.html'
  });


}
