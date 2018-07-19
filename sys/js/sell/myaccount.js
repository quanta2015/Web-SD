$(init);

function init() {
  $('body').on('click', '#recharge', ()=>{ goto('rechargeTask.html') });
  $('body').on('click', '#withdraw', ()=>{ goto('withdraw.html') });
  $('body').on('click', '#create-task', ()=>{ goto('createTask.html') });

  initNotice()

  //显示金额
  promise('GET',URL_SELL_BALANCE,null, cbInfo, null)

  //查询店铺
  promise('GET', '/shoper/shoper_shops',null, (e)=>{
    if( e.length <= 0 ) {
      notifyInfo('请先于店铺管理中绑定店铺后，才能发布任务！')
    }
  },null)
}

function cbInfo(e) {
    val = fix(e.balance)
    $("#balance").text(val);
    
    $("#u-balance", window.parent.document).text(val);
    $("#u-money", window.parent.document).text(val);
    list = e.taskList;
    for(i=0;i<list.length;i++) {
        $('.u-status' + list[i].status).text(list[i].statusCount);
    }
}