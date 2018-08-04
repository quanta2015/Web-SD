// let pageData = Object.assign({}, PAGE_DATA);


dataJson = [
{"商家名称":"商家A","账户余额":"10","冻结金额":"20","充值任务金额":"30","发布垫付任务金额":"100","发布垫付任务佣金":"39","发布垫付任务保证金":"238","发布垫付任务单数":"383","发布浏览任务金额":"847","发布浏览任务佣金":"74","发布浏览任务单数":"20","提现金额":"347","手续费":"23","vip充值金额":"742","vip时限":"847","快递面单数":"27","面单金额":"37","罚款金额":"743","商家推广奖励金":"763"},
{"商家名称":"商家B","账户余额":"10","冻结金额":"20","充值任务金额":"30","发布垫付任务金额":"100","发布垫付任务佣金":"39","发布垫付任务保证金":"238","发布垫付任务单数":"383","发布浏览任务金额":"847","发布浏览任务佣金":"74","发布浏览任务单数":"20","提现金额":"347","手续费":"23","vip充值金额":"742","vip时限":"847","快递面单数":"27","面单金额":"37","罚款金额":"743","商家推广奖励金":"763"},
{"商家名称":"商家C","账户余额":"10","冻结金额":"20","充值任务金额":"30","发布垫付任务金额":"100","发布垫付任务佣金":"39","发布垫付任务保证金":"238","发布垫付任务单数":"383","发布浏览任务金额":"847","发布浏览任务佣金":"74","发布浏览任务单数":"20","提现金额":"347","手续费":"23","vip充值金额":"742","vip时限":"847","快递面单数":"27","面单金额":"37","罚款金额":"743","商家推广奖励金":"763"},
]




titleList = getTitleList()
newTitleList = getSelectTitle()
dataList = getDataList(newTitleList)


dataList = [{
      name: '商家A',
      data: [10,20,30,100,39,238,383,847,74,20,347,23,742,847,27,37,743,763]
    },{
      name: '商家B',
      data: [98,847,76,474,67,878,873,673,636,623,663,663,66,83,371,377,17,834]
    },{
      name: '商家C',
      data: [323,334,74,64,823,45,78,776,874,973,747,749,89,877,287,478,483,443]
    }]

titleList = ['账户余额','冻结金额','充值任务金额','发布垫付任务金额','发布垫付任务佣金','发布垫付任务保证金','发布垫付任务单数','发布浏览任务金额','发布浏览任务佣金','发布浏览任务单数','提现金额','手续费','vip充值金额','vip时限','快递面单数','面单金额','罚款金额','商家推广奖励金'],







Highcharts.setOptions({ colors: ['#EF4836','#26C281','#4B77BE','#00ceb7','#00c84b','#aab500','#ed9900','#ff7a9e'] });



$(init);

function init() {

  // initTime();
  // initList();

  // $('body').on('click', '.btn-search', doSearch);

  var chart = Highcharts.chart('g-chart', {
    chart: {
        type: 'bar'
    },
    title: {
        text: '商家账户报表'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: titleList,
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '金额 (元)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' 元'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true,
                allowOverlap: true // 允许数据标签重叠
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    series: dataList
});


    $('body').on('click', '.btn-render', doRenderCreate);

    // initList(pageData);
}

function doRenderCreate() {
  $.ajax('/tmpl/admin/create_chart_selacc.tmpl').then((e)=>{
    console.log(e)
    $('.g-detail').empty();
    $('.g-detail').append(e);
    $('.g-detail').show();
  })
}

// function initList() {
//   let param = Object.assign(pageData);
//   promiseTmpl('GET', '/tmpl/admin/chart_selaccount.tmpl', ['接口', encodeQuery(param)].join('?'),null, cbList)
// }

// function initList() {
//   let param = {
//     name: $('.sr-shopname').val(),
//     sdate: $('.sr-time-from').val() + ' 00:00:00',
//     edate: $('.sr-time-to').val() + ' 23:59:00',
//   };
//   Object.assign(param, pageData);
//   promiseTmpl('GET', , [, encodeQuery(param)].join('?'), null, cbListShop)
// }

// function doDetailShop(e) {
//   var index = $(e.currentTarget).data('index');
//   let ret = _listshop[index];
//   ret.imgPrefix = IMG_PREFIX;
//   $(".g-detail .m-detail-wrap").remove();
//   $(".g-detail").prepend($("#coverTmpl").render(ret));
//   $(".g-detail").show()
// }

// function cbListShop(r, e) {
//   let ret = e;
//     _listshop = ret.data;
//     ret.imgPrefix = IMG_PREFIX;
//     Object.assign(ret, pageData);
//     totalPages = Math.ceil(ret.total/PAGE_DATA.pageSize);
//     $(".portlet-body .table").remove();
//     $(".portlet-body .table-data").append($.templates(r).render(ret, rdHelper));
//     $(".fancybox").fancybox({'titlePosition':'inside','type':'image'});
//     if ($('.table-pg').text() == '') initPage(totalPages);
// }

// function initTime() {
//   let from =  moment().subtract('days',7).format('YYYY-MM-DD');
//   let to = moment().format('YYYY-MM-DD');
//   $(".sr-time-from").datetimepicker({ value: from, format:'Y-m-d', timepicker:false});
//   $(".sr-time-to").datetimepicker({value: to, format:'Y-m-d', timepicker:false});
// }

// function doSearch() {
//   $('.portlet-body .table-pg').remove();
//   $('.portlet-body').append('<div class="table-pg"></div>');
//   initList();
// }