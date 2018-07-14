data = [{
      name: 'A',
      data: [10,20,30,100,39,238,383,847,74,20,347,23,742,847,27,37,743,763,111,222,333,444,555,666,777,888]
    },{
      name: 'B',
      data: [98,847,76,474,67,878,873,673,636,623,663,663,66,83,371,377,17,834,888,777,666,555,444,333,222,111]
    },{
      name: 'C',
      data: [323,334,74,64,823,45,78,776,874,973,747,749,89,877,287,478,483,443,111,222,333,444,555,666,777,888]
    }]


Highcharts.setOptions({ colors: ['#EF4836','#26C281','#4B77BE','#00ceb7','#00c84b','#aab500','#ed9900','#ff7a9e'] });



$(init);

function init() {
  var chart = Highcharts.chart('g-chart', {
    chart: {
        type: 'bar'
    },
    title: {
        text: '平台统计报表'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['佣金总额','任务单数','平均佣金单价','商家提现手续费','刷手提现手续费','充值金额','冻结总资金','商家数量','商家vip数量','商家vip充值金额','商家罚金','刷手数量','刷手vip数量','刷手vip充值金额','刷手罚金','刷手佣金支出','垫付金额支出','快递费用支出','商家购买快递收入','第三方支付平台支出','短信平台支出','商家推广支出','刷手推广支出','平台总收入','平台总支出','平台盈利收入'],
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