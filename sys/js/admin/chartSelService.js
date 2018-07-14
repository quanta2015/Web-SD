data = [{
      name: '商家',
      data: [10,20,30,100,39,238,383,847,74,20,347,23,742,847,27,37,444]
    }]


Highcharts.setOptions({ colors: ['#EF4836','#26C281','#4B77BE','#00ceb7','#00c84b','#aab500','#ed9900','#ff7a9e'] });



$(init);

function init() {
  var chart = Highcharts.chart('g-chart', {
    chart: {
        type: 'bar'
    },
    title: {
        text: '商家客服报表'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['注册数','vip数','账户信息审核','店铺绑定审核','申诉审核','申诉统计','任务浏览详情','垫付任务详情','垫付任务审核','浏览任务审核','完成垫付任务统计','完成浏览任务统计','资金明细','资金提现','佣金汇总','拉黑明单','系统撤销数'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '数量 (个)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' 个'
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