const {getCoinsDataByMarketCap, getHistoricalOHLCData} = require("./script/coinStuff")
fs = require('fs');

async function extractCoinsToData()
{
  let historicalData
  /*let coinData
  await getCoinsDataByMarketCap().then( result => {
      coinData = result
  }).catch(error => {
    console.log(error)
  })*/

  await getHistoricalOHLCData().then( result => {
    historicalData = result
  }).catch(error => {
    console.log(error)
  })

  let formatedHistoricalData = []
  for(info of historicalData)
  {
    formatedHistoricalData.push({Date : info[0], Open : info[1], High : info[2], Low : info[3], Close : info[4], Volume : info[5]})
  }

  fs.writeFileSync("data.json", JSON.stringify(formatedHistoricalData),'utf8', function (err) {
    if (err) return console.log(err)
  })
}

extractCoinsToData()
  .then(() => process.exit(0))
  .catch( (error) => {
    console.log("catch");
    console.log(error);
    process.exit(1);
});
