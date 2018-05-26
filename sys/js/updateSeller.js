

var seller;
var optList = ['工商银行', '农业银行', '建设银行', '中国银行', '招商银行']

$(init);

function init() {
  initList();
}

function initList() {
  promiseData('GET', `/shoper/shoper_detail/${cookie('id')}`, null, cbList)
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
  promiseData('POST','/shoper/shoper_update',JSON.stringify(data), cbSave)
}

function cbSave(e) {
  if (e.code == 0) {
    initUserInfo();
    notifyInfo(MSG_UPDATE_SUCCESS)
  } else if (e.code == -1) {
    relogin();
  }
}