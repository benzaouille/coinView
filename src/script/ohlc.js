const axios = require('axios');
const { getAllSymbol } = require('./symbol')
const MILLI_SEC_PER_DAY = 60*60*24*1000

/*send back only the 100 candle due to request limit (free count)*/
const getOHLC = (symbol = 'BTC-USDT', endAt = new Date().getTime(), offsetDay = 100, type = '1day') => {
  const startAt_In_Second = Math.floor((endAt - MILLI_SEC_PER_DAY * offsetDay) / 1000.0);
  const endAt_In_Second = Math.floor(endAt / 1000.0)
  const url = 'https://api.kucoin.com/api/v1/market/candles?type=' + type + '&symbol=' + symbol + '&startAt=' + startAt_In_Second.toString() + '&endAt=' + endAt_In_Second.toString()
  console.log(url)
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        console.log(error);
        reject(error)
      });
  })
}


module.exports = {getOHLC}
