data = [{
      name: '冻结商家金额',
      data: [10,20,30,100,39,238]
    }]


Highcharts.setOptions({ colors: ['#EF4836','#26C281','#4B77BE','#00ceb7','#00c84b','#aab500','#ed9900','#ff7a9e'] });



$(init);

function init() {
  var chart = Highcharts.chart('g-chart', {
    chart: {
        type: 'bar'
    },
    title: {
        text: '商家冻结金额表'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['当天','两天','三天','四天','五天','五天以上'],
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