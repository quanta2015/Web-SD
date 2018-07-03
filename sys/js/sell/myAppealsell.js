let _id;
let pageData = Object.assign({}, PAGE_DATA);
// pageData.pageSize= 1
let tabType="my";
$(init);

function init() {
  initList(pageData);
  $('body').on('click', '.detail-appeal', doDetail);
  $('body').on('click', '.m-close', doClose);
  $('body').on('click', '.b-close', doClose);
  $('body').on('click','[_tab]',tabInitList)
}

function initList() {
	let param = Object.assign(pageData);
	if(tabType=='my'){
	  promiseTmpl('GET', '/tmpl/buy/myappeal.tmpl', ['/complains_list', encodeQuery(param)].join('?'),null, cbList)
	}else{
		promiseTmpl('GET', '/tmpl/buy/myappeal.tmpl', ['/get_complains_recieved', encodeQuery(param)].join('?'),null, cbList)
	}
}

function tabInitList(){
	tabType=$(this).attr("_tab");
	initList();
}

function cbList(r, e) {
  let ret = e;
  _listtask = ret.data;
  alert(ret);
  ret.imgPrefix = IMG_PREFIX;
  Object.assign(ret, pageData);
  totalPages = Math.ceil(ret.total/pageData.pageSize);
  $(".tab-content .portlet-body .table").remove();
  $(".tab-content .portlet-body").prepend($.templates(r).render(ret, rdHelper));
  if ($('.tab-content .table-pg').text() == '') initPage(totalPages);

  $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
}

function doDetail() {
  var obj = {
    buyerTaskId: $(this).data("tid"),
    type: 0
  };
  promiseTmpl('GET', '/tmpl/buy/appeal_detail.tmpl', ['/get_complain_detail', encodeQuery(obj)].join('?') ,null, cbDetail)
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
  $('.g-detail').hide()
}