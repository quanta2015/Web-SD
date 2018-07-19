data = [{
      name: '刷手',
      data: [10,20,30,100,39,238,383,847,74,20,347,23,742,847]
    }]


Highcharts.setOptions({ colors: ['#EF4836','#26C281','#4B77BE','#00ceb7','#00c84b','#aab500','#ed9900','#ff7a9e'] });



$(init);

function init() {
  var chart = Highcharts.chart('g-chart', {
    chart: {
        type: 'bar'
    },
    title: {
        text: '买家客服报表'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['注册数','vip数','审核绑定账户','审核实名认证','审核QQ','待操作','待发货','待评价','待审核','已完成','申诉管理','拉黑名单','自动撤销','系统撤销'],
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