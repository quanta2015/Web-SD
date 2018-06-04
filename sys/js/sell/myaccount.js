$(init);

function init() {
  $('body').on('click', '#recharge', ()=>{ goto('rechargeTask.html') });
  $('body').on('click', '#withdraw', ()=>{ goto('withdraw.html') });
  $('body').on('click', '#create-task', ()=>{ goto('createTask.html') });
}

