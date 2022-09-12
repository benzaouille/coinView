const {extractCoinsDataAndCloud} = require('./script/dataExtractor')
const {fully_Bullish_Signal} = require('./script/ichimoku')

extractCoinsDataAndCloud((response, error) => {
  let bullish_coin_signal = []
  if(error == 'undefined')
  {
    for(elmt of response)
    {
      //coin signal
      const flag = fully_Bullish_Signal(elmt[1])
      if(flag)
      {
        bullish_coin_signal.push(elmt[0])
      }
    }
  }
  else
  {
  console.log(error)
  }

  for(elmt of bullish_coin_signal)
  {
    console.log(elmt)
  }
}).then(() => {process.exit(0)})
  .catch((error) => process.exit(1))
