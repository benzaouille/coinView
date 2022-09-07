const axios = require('axios');

//put that in a .env file configureation (TODO)
const VS_CURRENCIES = 'usd'
const PAGINATION = 25 // can go to 250 limit imposed by coingecko...


//intervalAgo : Data up to number of days ago (eg. 1,14,30,max)
//interval Data interval. Possible value: daily
//resolve candelstick data
/*
1 - 2 days: 30 minutes
3 - 30 days: 4 hours
31 days and beyond: 4 days
data from coingeckko api https://www.coingecko.com/en/api/documentation*/
const getHistoricalOHLCData = (idCoin = 'bitcoin' , intervalAgo = 365) =>
{
  const url = `https://api.coingecko.com/api/v3/coins/${idCoin}/ohlc?vs_currency=${VS_CURRENCIES}&days=${intervalAgo}`
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

module.exports = {getHistoricalOHLCData}
