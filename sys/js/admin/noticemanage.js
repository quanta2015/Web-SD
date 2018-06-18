<<<<<<< HEAD
=======
/*const TMPL_ADMIN_NOTICE = '/tmpl/admin/list_notice.tmpl';
const URL_SAVE_NOTICE ='/admin/save_notice';
const URL_ADMIN_NOTICE_LIST ='/admin/notice_list';
const URL_ADMIN_NOTICE_DEL='/admin/notice_del';*/


// let pageData = Object.assign({}, PAGE_DATA);
>>>>>>> 00d86e5adb179faa7f38f0db17144284cba2f6d8
$(init);

function init() {
  initList();

  $('body').on('click', '.del-notice', doDelNotice);
  $('body').on('click', '.save-notice', doSaveNotice);
  $('body').on('click', '.close-btn', doResetNotice);
}


function initList() {

  TmplData(TMPL_ADMIN_NOTICE, URL_ADMIN_NOTICE_LIST,null, cbListNotice)
}


function cbListNotice(r, e) {

  let data = e[0];
  $.each(data.data, function(index, val) {
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
  if (data.code == 0) {
    // Object.assign(data, pageData);
    // totalPages = Math.ceil(data.total/PAGE_DATA.pageSize);
    $(".portlet-body .table").remove();
    $(".portlet-body").prepend($.templates(r[0]).render(data, rdHelper));
    // if ($('.table-pg').text() == '') initPage(totalPages);
    
  } else if ([-1, 99].includes(e.code)) {
    relogin();
  }
}

function doDelNotice() {
  var noticeid = $(this).attr('id')
  msgbox(MSG_CONF_DEL_NOTICE,MSG_CANCEL,MSG_OK,cbDel)

  function cbDel(e) {
    if (!e) {
      promiseData('GET', URL_ADMIN_NOTICE_DEL+'?id=' + noticeid, null, cbDelNotice);
    }
  }
}

function cbDelNotice(e) {
  console.log(e);
  if (e.code == 0) {
    initList()
  } else if (e.code == 99) {
    notifyInfo(e.message)
  } else if (e.code == -1) {
    relogin();
  }
}



function doSaveNotice() {
   obj = {
    title:$('#title').val(),
    content:$('#content').val(),
    type:parseInt($('#type').val())
  }
  console.log(obj)
  promiseData('POST', URL_SAVE_NOTICE, JSON.stringify(obj), cbSaveNotice);
}
function cbSaveNotice(e){
   console.log(e);
  if (e.code == 0) {
    initList()
    doResetNotice();
    $(".close-btn").click();
  } else if (e.code == 99) {
    notifyInfo(e.message)
  } else if (e.code == -1) {
    relogin();
  }

}

/*function initPage(totalPages) {
  $('.portlet-body .table-pg').twbsPagination({
    totalPages: totalPages || 1,
    onPageClick: function(event, page) {
      pageData.pageIndex = page - 1;
      console.log('initList(pageData)')
      initList(pageData);
    }
  })
}*/

function doResetNotice(){
  $("#form-bind")[0].reset();
}