const {getOHLC} = require('./ohlc')
const {getAllSymbol} = require('./symbol')
const {createIchimokuCloud} = require('./ichimoku')


let ohlc_per_pair_map = new Map()

const extractCoinsDataAndCloud = async (callback) => {
  let usdt_symbol = []
  try {
    await getAllSymbol().then((allSymbol) => {
      for(elmnt of allSymbol.data.data.ticker)
      {
        if(elmnt.symbol.includes('-USDT'))
        {
          usdt_symbol.push(elmnt)
        }
      }
    }).catch((error) => {
      console.log(error)
    })

    for(elmt of usdt_symbol)
    {
      await getOHLC(symbol = elmt.symbol/*'UOS-USDT'*/).then((response) => {
        const data = response.data.data.reverse()
        const ichimoku_cloud = createIchimokuCloud(data)
        ohlc_per_pair_map.set(/*'UOS-USDT'*/elmt.symbol, {ichimoku_cloud : ichimoku_cloud, candles : data})
      }).catch((error) => {
        console.log(error)
      })
    }
    //console.log(ohlc_per_pair_map)
    callback(ohlc_per_pair_map, 'undefined')
  } catch (e) {
    callback('undefined', e)
  }
}

module.exports = {extractCoinsDataAndCloud}
