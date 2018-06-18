$(init);

function init() {
  //显示金额
  promise('GET',URL_SELL_BALANCE,null, (e)=>{
    $("#u-money").text(e)
  }, null )
}