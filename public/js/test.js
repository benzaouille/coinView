const ctx = document.getElementById("myChart");
const ctx1 = document.getElementById("myChart1");
const data_OHLC = document.getElementById("test").getAttribute("data_OHLC")
const data_Ichimoku_Cloud = document.getElementById("test").getAttribute("data_Ichimoku_Cloud")


let data = []
for(let d of JSON.parse(data_OHLC))
{
  data.push({x : new Date(d.Date), y : [d.Open, d.High, d.Low, d.Close]})
}
var options = {
  series: [{
    data : data
  }],
  chart: {
  type: 'candlestick',
  height: 350
  },
  title: {
  text: 'CandleStick Chart',
  align: 'left'
  },
  xaxis: {
  type: 'datetime'
  },
  yaxis: {
  tooltip: {
    enabled: true
  }
  }
};

var chart = new ApexCharts(ctx, options);
var chart1 = new ApexCharts(ctx1, options);
chart.render();
chart1.render()
