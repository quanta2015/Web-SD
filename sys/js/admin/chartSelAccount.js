data = [{
      name: 'A店',
      data: [10,20,30,100,39,238,383,847,74,20,347,23,742,847,27,37,743,763]
    },{
      name: 'B店',
      data: [98,847,76,474,67,878,873,673,636,623,663,663,66,83,371,377,17,834]
    },{
      name: 'C店',
      data: [323,334,74,64,823,45,78,776,874,973,747,749,89,877,287,478,483,443]
    }]


Highcharts.setOptions({ colors: ['#EF4836','#26C281','#4B77BE','#00ceb7','#00c84b','#aab500','#ed9900','#ff7a9e'] });



$(init);

function init() {
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
        categories: ['账户余额','冻结金额','充值任务金额  发布垫付任务金额','发布垫付任务佣金','发布垫付任务保证金   发布垫付任务单数','发布浏览任务金额','发布浏览任务佣金','发布浏览任务单数','提现金额','手续费','vip充值金额','vip时限','快递面单数','面单金额','罚款金额','商家推广奖励金'],
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
    series: data
});
}
