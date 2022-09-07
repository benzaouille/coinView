const {getHistoricalOHLCData} = require('./coinStuff')
const {createIchimokuCloud} = require('./ichimoku')

const extractCoinsData = async (callback) => {
  await getHistoricalOHLCData().then((historicalData) => {
    if(historicalData.status != 200)
    {
      callback(undefined, 'historicalData is undefined')
    }
    else
    {
      let coin_OHLC_data = []
      for(info of historicalData.data)
      {
        coin_OHLC_data.push({Date : info[0], Open : info[1], High : info[2], Low : info[3], Close : info[4], Volume : info[5]})
      }

      const {tenkan, kinjun, senkou_Span_A, senkou_Span_B} = createIchimokuCloud(coin_OHLC_data)
      const ichimoku_Cloud_data = {tenkan : tenkan, kinjun : kinjun, senkou_Span_A : senkou_Span_A, senkou_Span_B : senkou_Span_B}

      callback({ichimoku_Cloud_data : ichimoku_Cloud_data, coin_OHLC_data : coin_OHLC_data}, undefined)
    }
  }).catch(error => {
    console.log(error)
  })
}



module.exports = {extractCoinsData}
