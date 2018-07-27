$(init)

function init() {
  $('#r-vip-default').prop('checked',true)
  $('#balance').text( $('#u-balance',parent.document).text() )
  $('#u-balance').text( $('#u-balance',parent.document).text() )




  $('.bank-vip').on('click', ()=>{
    clickMenu('toVIP')
  });



  //取会员数据
  promise('GET', URL_MEMBERSHIP_FEE_TYPE, null, (e)=>{
    $(".u-vip-selection").empty();
    $.each(e, function(index, val) {
        $(".u-vip-selection").append(`<label class="mt-radio"><input type="radio" name="r-vip-type" value="${val.id}"> ${val.money}元 | ${val.name}<span></span></label>`);
    });
    $('.mt-radio input').first().prop('checked',true)
  }, null)

  $('.balance-vip').on('click', ()=>{  
    msgbox('温馨提示', `请确认购买VIP权益！`,'取消','确认',(ret)=>{
      if (!ret) {
        let obj = { membershipId: parseInt($("input:checked").val()) }
        promise('GET', ['/shoper/pay_membershipfee', encodeQuery(obj)].join('?'), null, cdBuyVip, null);
      }
    })
  });

}

function cdBuyVip(e) {
    notifyInfo('购买VIP成功！')
}
