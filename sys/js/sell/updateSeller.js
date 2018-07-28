var _id;
var optList = ['工商银行', '农业银行', '建设银行', '中国银行', '招商银行']

$(init);

function init() {
  initBank();
  initList();


  $("#saveBtn").on('click', doSave);
}

function initBank() {
  optList.forEach((v)=>{
    $("#bank").append('<option value="' + v +'">' + v +'</option>')
  })
}


function initList() {
  promise('GET', `/shoper/shoper_detail/${cookie('id')}`, null, cbList, null)
}

function cbList(e) {
  _id = e.id
  $('#name').val(e.name)
  $('#mobile').val(e.mobile)
  $('#qq').val(e.qq)
  $('#weixin').val(e.weixin)
  $('#bankcard').val(e.bankcard)
  $('#bank option[value="' + e.bank +'"]').prop('selected',true)
}


function doSave(e) {
  var obj = {
    id: _id,
    name: $('#name').val(),
    mobile: $('#mobile').val(),
    qq: $('#qq').val(),
    weixin: $('#weixin').val(),
    bankcard: $('#bankcard').val(),
    bank: $('#bank').val()
  }
  promise('POST',URL_SELL_UPDATE,JSON.stringify(obj), cbSave, null)
}

function cbSave(e) {
  notifyInfo(MSG_UPDATE_SUCCESS)
}