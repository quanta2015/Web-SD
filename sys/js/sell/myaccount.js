$(init);

function init() {
  $('body').on('click', '#recharge', ()=>{ goto('rechargeTask.html') });
  $('body').on('click', '#withdraw', ()=>{ goto('withdraw.html') });
  $('body').on('click', '#create-task', ()=>{ goto('createTask.html') });



  //显示金额
  promise('GET',URL_SELL_BALANCE,null, cbInfo, null)
}

function cbInfo(e) {
    $("#balance").text(e.balance);
    $("#u-money", window.parent.document).text(e.balance);
    list = e.taskList;
    for(i=0;i<list.length;i++) {
        $('.u-status' + list[i].status).text(list[i].statusCount);
    }
}