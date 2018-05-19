$(init);

function init() {

  initBindInfo();
  initIDCartImg();

  $('body').on('click', '#resetBtn', doResetForm);
  $('body').on('click', '#saveBtn', doSave);
}

function doResetForm() {
  document.getElementById("form-bind").reset()
}

function doSave(data) {
  let obj = {
    name: $('#name').val(),
    idcard: $('#id-card').val(),
  };
  for (let i = 1; i <= 3; i++) {
    obj[`idcardpng${i}`] = $(`#id-card-ipt${i}`).attr('url');
  }
  console.log(obj)
  promiseData('POST', URL_BUY_BIND_ID_CARD, JSON.stringify(obj), cbBind);
}
function cbBind(e) {
  if (e.code === 0) {
    alertBox(MSG_BIND_SUCCESS, ()=>{ goto("newTask.html") })   
  } else if (e.code==99) {
    notifyInfo(e.message);
  } else if (e.code==-1) {
    relogin();
  };
}

async function initIDCartImg() {
  $('#id-cards').append(await renderTmpl(TMPL_ID_CARD_IMG, { list:[1,1,1] }));
}

function initBindInfo() {
  if ($.cookie('idCard')) {
    $(".container").empty();
    $(".container").prepend($("#id-card-info").render({
      name: $.cookie('name'),
      idCard: $.cookie('idCard'),
    }));
  }
}
