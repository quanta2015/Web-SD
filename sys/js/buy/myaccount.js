$(init);

function init() {
  $('body').on('click', '#withdraw', ()=>{ goto('withdraw.html') });
  $('body').on('click', '#withdraw-detail', ()=>{ goto('withdraw.html') });


  //显示金额
  promiseData('GET','/buyer/buyer_balance',null, (e)=>{
    $("#all").text(e.data.balance+e.data.servicefee);
    $("#servicefee").text(e.data.servicefee);
    $("#balance").text(e.data.balance);

  } )
}

