const {getHistoricalOHLCData} = require("./script/coinStuff")
const {createIchimokuCloud} = require("./script/ichimoku")

fs = require('fs');

async function extractCoinsToData()
{
  let historicalData

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

  const {tenkan, kinjun, senkou_Span_A, senkou_Span_B} = createIchimokuCloud(formatedHistoricalData)
  const ichimokuCloud = {tenkan : tenkan, kinjun : kinjun, senkou_Span_A : senkou_Span_A, senkou_Span_B : senkou_Span_B}
  console.log(ichimokuCloud)

  //console.log(formatedHistoricalData)
  fs.writeFileSync("candle.json", JSON.stringify(formatedHistoricalData),'utf8', function (err) {
    if (err) return console.log(err)
  })

  fs.writeFileSync("ichimokuCloud.json", JSON.stringify(ichimokuCloud),'utf8', function (err) {
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
