data = [{
      name: '刷手A',
      data: [10,20,30,100,39,238,383,847,74,20,347,23,742,847,27,37]
    },{
      name: '刷手B',
      data: [98,847,76,474,67,878,873,673,636,623,663,663,66,83,371,377]
    },{
      name: '刷手C',
      data: [323,334,74,64,823,45,78,776,874,973,747,749,89,877,287,478]
    }]


Highcharts.setOptions({ colors: ['#EF4836','#26C281','#4B77BE','#00ceb7','#00c84b','#aab500','#ed9900','#ff7a9e'] });



$(init);

function init() {
  var chart = Highcharts.chart('g-chart', {
    chart: {
        type: 'bar'
    },
    title: {
        text: '买家账户报表'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['账户余额','提现手续费','提现金额','垫付任务佣金','浏览任务佣金','垫付金额','罚金','新手奖励金','vip充值金','vip充值时限','推广金','vip推广奖励金','一级推广金','二级推广金','三级推广金','刷手赚取收益'],
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