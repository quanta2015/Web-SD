let _id;
let pageData = Object.assign({}, PAGE_DATA);
let _listshop;
$(init);

function init() {
  $("#sr-status option[value='0']").prop("selected", true);
  initTime();
  initList();
  $('body').on('click', '.audit-task', doAudit);
  $('body').on('click', '#btn-search', doSearch);
    $('body').on('click', '.detail-idcard', doDetailIdCard);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click','.b-close',doClose);

  $('body').on('click', '.m-menu-item', doChange);
}

function doChange() {
  $('.m-menu-item').removeClass('cur');
  $('.m-cnt').addClass('hide');
  $(this).addClass('cur')
  index = $(".m-menu-item").index(this)
  $(`.m-cnt:eq(${index})`).removeClass('hide');
}

function initList() {
  let param = {
    approveStatus: $('#sr-status').val(),
    searchKey: $('#sr-idcard').val(),
    sdate: $("#sr-time-from").val() + ' 00:00:00',
    edate: $("#sr-time-to").val() + ' 23:59:00',
  };
  Object.assign(param, pageData);
  promiseTmpl('GET', TMPL_ADMIN_IDCARD_LIST, [URL_ADMIN_ALL_IDCARD, encodeQuery(param)].join('?'), null, cbListIdCard)
}

function cbListIdCard(r, e) {
  let ret = e;
  _listshop=ret.data;
  ret.imgPrefix = IMG_PREFIX;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
  $(".portlet-body .table").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, rdHelper));
  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
  if ($('.table-pg').text() == '') initPage(totalPages);
}

function initPage(totalPages) {
  $('.portlet-body .table-pg').twbsPagination({
    totalPages: totalPages || 1,
    onPageClick: function(event, page) {
      pageData.pageIndex = page - 1;
      initList();
    }
  })
}

function doDetailIdCard(e) {
  var index = $(e.currentTarget).data('index');
  let ret = _listshop[index];
  console.log(JSON.stringify(ret));
  ret.imgPrefix = IMG_PREFIX;
  $(".g-detail .m-detail-wrap").remove();
  $(".g-detail").prepend($("#coverTmpl").render(ret));
  showModel('.g-detail')
}

function doClose() {
  $('.g-detail').hide()
}

function doAudit(e) {
doClose();
  bootbox.prompt(MSG_INPUT_AUDIT_INFO, function(ret){ 
    if( ret !== null) {
      var obj = {
        id: sid = $(e.currentTarget).data('id'),
        approve: ($(e.currentTarget).data('type')=='pass')?AUDIT_PASS:AUDIT_FAIL,
        reason: ret
      }
      promise('POST',URL_ADMIN_IDCARD_AUDIT,JSON.stringify(obj), cbAudit, null)
    }; 
  }); 
}

function cbAudit(e) {
  initList()
}

function initTime() {
  let from =  moment().subtract('month',1).format('YYYY-MM-DD');
  let to = moment().format('YYYY-MM-DD');
  $("#sr-time-from").datetimepicker({ value: from, format:'Y-m-d', timepicker:false});
  $("#sr-time-to").datetimepicker({value: to, format:'Y-m-d', timepicker:false});
}

function doSearch() {
  $('.portlet-body .table-pg').remove();
  $('.portlet-body').append('<div class="table-pg"></div>');
  initList();
}