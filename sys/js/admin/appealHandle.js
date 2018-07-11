let _id;
let pageData = Object.assign({}, PAGE_DATA);
let appealtype=getUrlParam("appealtype");
$(init);

function init() {
  initList(pageData);
    $('body').on('click', '.audit-appeal', doAuditAppeal);
  $('body').on('click', '.detail-task', doDetail);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click', '.b-close', doClose);
}

function initList() {
  if (appealtype==1) {
    $(".caption").append("卖家申诉处理");
  }else if (appealtype==0) {
   $(".caption").append("买家申诉处理");
  }
  let param = Object.assign(pageData, {type:appealtype});
  promiseTmpl('GET', '/tmpl/admin/appealhandle.tmpl', ['/complains_list', encodeQuery(param)].join('?'),null, cbList)
}


function cbList(r, ret) {
  _listtask = ret.data;
  ret.imgPrefix = IMG_PREFIX;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/pageData.pageSize);
  $(".portlet-body .table").remove();
  $(".portlet-body").prepend($.templates(r).render(ret, rdHelper));
  if ($('.table-pg').text() == '') initPage(totalPages);

  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
}

function doAuditAppeal(e) {
doClose();
  bootbox.prompt("请输入处理结果", function(ret){ 
    if( ret !== null) {
      var obj = {
        id: sid = $(e.currentTarget).data('id'),
        handleStatus: $(e.currentTarget).data('type'),
        handleResult: ret
      };
      promise('POST','/admin/complains_handle',JSON.stringify(obj), cbAuditAppeal, null)
    };
  });
}

function cbAuditAppeal(e) {
  initList()
}

function doDetail() {
  var obj = {
    id: $(this).data("id"),
    type: appealtype
  };
  promiseTmpl('GET', '/tmpl/myappeal_detail.tmpl', ['/admin/complains_detail', encodeQuery(obj)].join('?') ,null, cbDetail)
}

function cbDetail(r, e) {
  let ret = e;
  ret.data.imgPrefix = IMG_PREFIX;
  $(".g-detail").empty();
  $(".g-detail").append($.templates(r).render(ret.data, rdHelper));
  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
  $(".g-detail").show();
}

function initPage(totalPages) {
	$('.portlet-body .table-pg').twbsPagination({
	    totalPages: totalPages || 1,
	    onPageClick: function(event, page) {
	      pageData.pageIndex = page - 1;
	    }
	  })
}


function doClose() {
  $('.g-detail').hide();
}