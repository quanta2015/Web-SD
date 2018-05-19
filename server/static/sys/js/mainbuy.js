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


  
 
  $('#exitBtn').on('click', function(e) {
      location.href = 'index.html'
  });


}



