data = [{
      name: '商家VIP',
      data: [10,20,30,100,39,238,383]
    },{
      name: '刷手VIP',
      data: [98,847,76,474,67,878,873]
    }]


Highcharts.setOptions({ colors: ['#EF4836','#26C281','#4B77BE','#00ceb7','#00c84b','#aab500','#ed9900','#ff7a9e'] });



$(init);

function init() {
  var chart = Highcharts.chart('g-chart', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'VIP管理报表'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['月度','季度','半年','年','10天内要到期','复购率','流失率'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '数量 (名)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' 名'
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