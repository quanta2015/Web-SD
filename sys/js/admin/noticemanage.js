$(init);

function init() {
  initList();

  $('body').on('click', '.del-notice', doDelNotice);
  $('body').on('click', '.save-notice', doSaveNotice);
  $('body').on('click', '.close-btn', doResetNotice);
}


function initList() {

  promiseTmpl('GET', TMPL_ADMIN_NOTICE, URL_ADMIN_NOTICE_LIST,null, cbListNotice)
}


function cbListNotice(r, e) {

  let ret = e;
  $.each(ret.data, function(index, val) {
     if (val.type==0) {
        val.type='所有人';
     }else if (val.type==1) {
      val.type='买家';
       
     }else if (val.type==2) {
      val.type='卖家';
       
     }else{
      val.type='';
     }
  });

  $(".portlet-body .table").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, rdHelper));
}

function doDelNotice() {
  var noticeid = $(this).attr('id')
  msgbox(MSG_CONF_DEL_NOTICE,MSG_CANCEL,MSG_OK,cbDel)

  function cbDel(e) {
    if (!e) {
      promise('GET', URL_ADMIN_NOTICE_DEL+'?id=' + noticeid, null, cbDelNotice, null);
    }
  }
}

function cbDelNotice(e) {
  initList()
}

function doSaveNotice() {
   obj = {
    title:$('#title').val(),
    content:$('#content').val(),
    type:parseInt($('#type').val())
  }
  console.log(obj)
  promise('POST', URL_SAVE_NOTICE, JSON.stringify(obj), cbSaveNotice, null);
}
function cbSaveNotice(e){
  initList()
  doResetNotice();
  $(".close-btn").click();
}

function doResetNotice(){
  $("#form-bind")[0].reset();
}