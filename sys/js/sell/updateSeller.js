

var seller;
var optList = ['工商银行', '农业银行', '建设银行', '中国银行', '招商银行']

$(init);

function init() {
  initList();
}

function initList() {
  promise('GET', `/shoper/shoper_detail/${cookie('id')}`, null, cbList, null)
}

function cbList(e) {
  seller = new Vue({
    el: '#seller',
    data: {
      seller: e.data,
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
  var $s = seller._data.seller
  var $l = ['id','name','qq','bank','mobile','weixin','bankcard']
  var data = saveList($s, $l)
  promise('POST',URL_SELL_UPDATE,JSON.stringify(data), cbSave, null)
}

function cbSave(e) {
  initUserInfo();
  notifyInfo(MSG_UPDATE_SUCCESS)
}