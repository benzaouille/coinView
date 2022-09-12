const PERIODE_TENKAN = 9
const PERIODE_KINJUN = 26
const PERIODE_SENKOU_SPAN_B = 52

let TENKAN_SIZE
let KINJUN_SIZE
let SENKOU_SPAN_A_SIZE
let SENKOU_SPAN_B_SIZE

const createIchimokuCloud = (data) => {

  const open = data.map( (element) => {
    return element[1]
  })

  const close = data.map( (element) => {
    return element[2]
  })

  const high = data.map( (element) => {
    return element[3]
  })

  const low = data.map( (element) => {
    return element[4]
  })

  const tenkan        = ichimoku_Properties_Creator_Func(high,low, PERIODE_TENKAN)
  const kinjun        = ichimoku_Properties_Creator_Func(high,low, PERIODE_KINJUN)
  const senkou_Span_B = ichimoku_Properties_Creator_Func(high,low, PERIODE_SENKOU_SPAN_B)
  const senkou_Span_A = ichimoku_Senkou_SpanA_Creator_Func(tenkan,kinjun)

  TENKAN_SIZE = tenkan.length
  KINJUN_SIZE = kinjun.length
  SENKOU_SPAN_A_SIZE = senkou_Span_A.length
  SENKOU_SPAN_B_SIZE = senkou_Span_B.length

  /*console.log(tenkan.length)
  console.log(kinjun.length)
  console.log(senkou_Span_B.length)
  console.log(senkou_Span_A.length)

  console.log(tenkan)
  console.log(kinjun)
  console.log(senkou_Span_B)
  console.log(senkou_Span_A)*/

  return {tenkan : tenkan, kinjun : kinjun, senkou_Span_A : senkou_Span_A, senkou_Span_B : senkou_Span_B}
}

/*
  data1 -> high candle value
  data2 -> low candle value
*/
const ichimoku_Properties_Creator_Func = (data1, data2, periode) => {
  let res = []
  if(data1.length > periode)
  {
    for(let i = 0 ; i < data1.length - (periode - 1) ; i++)
    {
      let max_candle_high = Number.MIN_VALUE
      let low_candle_high = Number.MAX_VALUE

      for(let j = i ; j < i + (periode); j++)
      {
        max_candle_high = (data1[j] > max_candle_high) ? data1[j] : max_candle_high
        low_candle_high = (data2[j] < low_candle_high) ? data2[j] : low_candle_high
      }
      res.push((parseFloat(max_candle_high) + parseFloat(low_candle_high)) * 0.5)
    }
  }
  return res
}

/*
  data1 ->  tenkan
  data2 ->  kinjun
*/
const ichimoku_Senkou_SpanA_Creator_Func = (data1, data2, offset = PERIODE_KINJUN - PERIODE_TENKAN) => {
  let res = []
  let data1Split = data1.slice(offset, data1.length)
  for(let i = 0 ; i < data2.length ; i++)
  {
    const tenkan_value = data1Split[i]
    const kinjun_value = data2[i]
    res.push((tenkan_value + kinjun_value) * 0.5)
  }
  return res
}

const fully_Bullish_Signal = (data) => {
  let flag = false
  const current_candle = data['candles']
  const current_price = current_candle[current_candle.length - 1][2]


  const tenkan_current_price = data['ichimoku_cloud']['tenkan'][TENKAN_SIZE - 1]
  const kinjun_current_price = data['ichimoku_cloud']['kinjun'][KINJUN_SIZE - 1]
  const senkou_Span_A_current_price = data['ichimoku_cloud']['senkou_Span_A'][SENKOU_SPAN_A_SIZE - PERIODE_KINJUN ]
  const senkou_Span_B_current_price = data['ichimoku_cloud']['senkou_Span_B'][SENKOU_SPAN_B_SIZE - PERIODE_KINJUN ]

  if(tenkan_current_price > kinjun_current_price)
  {
    if(current_price > tenkan_current_price)
    {
      if(senkou_Span_A_current_price > senkou_Span_B_current_price)
      {
        if(current_price > senkou_Span_A_current_price)
        {
          flag = true
        }
      }
    }
  }
  return flag
}

module.exports = {createIchimokuCloud, fully_Bullish_Signal}
