var $v = {
  transferPerson:'',
  fromAccount:'',
  toAccount:'',
  transferMoney:'',
  bankName:'',
  remark:'',
  file: null
};

var optList = ['工商银行', '农业银行', '建设银行', '中国银行', '招商银行']

$(init);

function init() {
  initList();
}

function initList() {
  recharge = new Vue({
    el: '#recharge',
    data: {
      recharge: $v,
      opts: optList
    },
    methods: {
      doSave: doSave
    }
  })

  $('#acountList input:eq(0)').trigger('click');
}


function saveList(s, list) {
  var data = {};
  for(i=0; i<list.length; i++) {
    data[list[i]] = s[list[i]];
  }
  return data;
}

function doSave(e) {
  var $s = recharge._data.recharge
  var $l = ['toAccount','transferMoney','bankName','fromAccount','transferPerson','remark']
  var data = saveList($s, $l)
  data.picture = $s.file;
  promiseData('POST','/shoper/shoper_transfer',JSON.stringify(data), cbSave)
}

function cbSave(e) {
  if (e.code == 0) {
    notifyInfo(MSG_RECHARGE_SUCCESS)
  } else if (e.code == -1) {
    relogin();
  }
}