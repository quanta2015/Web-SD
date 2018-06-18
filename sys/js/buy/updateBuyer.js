
const URL_BUYER_INFO='/buyer/person_info'
const URL_BUY_UPDATE='/buyer/buyer_reg'
var buyer;
var optList = ['工商银行', '农业银行', '建设银行', '中国银行', '招商银行']

$(init);

function init() {
  initList();
}

function initList() {
  promise('GET', URL_BUYER_INFO, null, cbList, err)
}

function cbList(e) {
  buyer = new Vue({
    el: '#buyer',
    data: {
      buyer: e.data,
      opts: optList
    },
    methods: {
      doSave: doSave
    }
  })
}

function saveList(s, list) {
  var data = {};
  for(i=0; i<list.length; i++) {
    data[list[i]] = s[list[i]];
  }
  return data;
}

function doSave(e) {
  var $s = buyer._data.buyer
  // var $l = ['id','name','qq','bank','mobile','weixin','bankcard']
  var $l = ['id','name','qq','mobile','weixin']
  var data = saveList($s, $l)
  console.log(JSON.stringify(data));
  promise('POST',URL_BUY_UPDATE,JSON.stringify(data), cbSave, null)
}

function cbSave(e) {
  initUserInfo();
  notifyInfo(MSG_UPDATE_SUCCESS)
}