const axios = require('axios')


const getAllSymbol = () =>
{
  const url = `https://api.kucoin.com/api/v1/market/allTickers`
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

module.exports = {getAllSymbol}
