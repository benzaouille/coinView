const axios = require('axios');

//put that in a .env file configureation (TODO)
const VS_CURRENCIES = 'usd'
const PAGINATION = 25 // can go to 250 limit imposed by coingecko...


const getCoinsDataByMarketCap = () => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${VS_CURRENCIES}&order=market_cap_desc&per_page=${PAGINATION}&page=1&sparkline=false`

  return new Promise ((resolve, reject) => {
    axios.get(url)
      .then(response => {
        if(response.status == 200)
        {
          resolve(response.data)
        }
        else
        {
          reject(response)
        }
      })
      .catch(error => {
        console.log(error);
        reject(error)
      });
  })
}

//intervalAgo : Data up to number of days ago (eg. 1,14,30,max)
//interval Data interval. Possible value: daily
//resolve candelstick data
/*
1 - 2 days: 30 minutes
3 - 30 days: 4 hours
31 days and beyond: 4 days
data from coingeckko api https://www.coingecko.com/en/api/documentation*/
const getHistoricalOHLCData = (idCoin = 'bitcoin' , intervalAgo = 7, interval = 7) =>
{
  //const url = `https://api.coingecko.com/api/v3/coins/${idCoin}/ohlc?vs_currency=${VS_CURRENCIES}&days=${intervalAgo}&interval=${interval}`
  const url = `https://api.coingecko.com/api/v3/coins/${idCoin}/ohlc?vs_currency=${VS_CURRENCIES}&days=${intervalAgo}`
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        if(response.status == 200)
        {
          resolve(response.data)
        }
        else
        {
          reject(response)
        }
      })
      .catch(error => {
        console.log(error);
        reject(error)
      });
  })
}


module.exports = {getCoinsDataByMarketCap, getHistoricalOHLCData}


/*
console.log(historicalData["prices"][0])
let date = new Date(historicalData["prices"][0][0] * 1000);
let hours = date.getHours();
let minutes = "0" + date.getMinutes();
let seconds = "0" + date.getSeconds();
const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
console.log(formattedTime);
*/
