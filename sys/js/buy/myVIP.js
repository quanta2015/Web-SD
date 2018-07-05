$(init)

function init() {
  $('#r-vip-default').prop('checked',true)

  $('.bank-vip').on('click', ()=>{
    clickMenu('toVIP')
  });

  $('.balance-vip').on('click', ()=>{
    
    val = $("input[name='r-vip-type']:checked").val()
    console.log(val);
  });
}
