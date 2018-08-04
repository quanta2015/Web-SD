var _id;
var _shop = {};
let pageData;

$(init);

function init() {
  pageData =  Object.assign({}, PAGE_DATA);

  initTime();
  initList(pageData);

  $('#searchBtn').on('click', doSearch);
  $('#exportBtn').on('click', doExport);
  $('#batchExpressBtn').on('change', doBatchExpress);
}

function doBatchExpress(e) {
  var files = e.target.files === undefined ? (e.target && e.target.value ? [{ name: e.target.value.replace(/^.+\\/, '')}] : []) : e.target.files
  if (files.length === 0) return;
  promiseUpload('/task/batch_sendexpress',files[0], cbBatchExpress)
  // promiseUpload('/task/batch_sendexpress', $('#uploadFile')[0].files[0] )
}


function cbBatchExpress() {
  notifyInfo('上传成功！')
}


function doExport() {
  let cdt = {
    fromDate: $("#from").val() + ':00',
    toDate: $("#to").val()+ ':00'
  }
  window.location.href =HOST +  ['/task/export_express', encodeQuery(cdt)].join('?');
}

function doSearch() {
  initList(pageData)
}

function initTime() {
  let from =  moment().subtract('days',7).format('YYYY-MM-DD') + ' 00:00';
  let to = moment().format('YYYY-MM-DD') + ' 23:59'
  $("#from").datetimepicker({ value: from, format:'Y-m-d H:i'});
  $("#to").datetimepicker({value: to, format:'Y-m-d H:i'});
}

function initList(pg) {
  let cdt = {
    fromDate: $("#from").val() + ':00',
    toDate: $("#to").val()+ ':00'
  }
  Object.assign( cdt, pg);
  promiseTmpl('GET', '/tmpl/sell/list_stat_express.tmpl', ['/task/get_express_used', encodeQuery(cdt)].join('?'), null, cbListTask)
}


function cbListTask(r,ret) {
  Object.assign(ret, pageData);
  ret.type = 'buy';
  totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
  $(".portlet-body table").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, rdHelper));
  if ($('.table-pg').text() == '') initPage(totalPages);
}

function initPage(totalPages) {
  $('.portlet-body .table-pg').twbsPagination({
    totalPages: totalPages || 1,
    onPageClick: function(event, page) {
      pageData.pageIndex = page - 1;
      initList(pageData);
    }
  })
}
