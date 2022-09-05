const createIchimokuCloud = (data) => {
  const open = data.map( (element) => {
    return element.Open
  })

  const high = data.map( (element) => {
    return element.High
  })

  const low = data.map( (element) => {
    return element.Low
  })

  const close = data.map( (element) => {
    return element.Close
  })

  const tenkan        = ichimoku_Properties_Creator_Func(high,low,9)
  const kinjun        = ichimoku_Properties_Creator_Func(high,low,26)
  const senkou_Span_B = ichimoku_Properties_Creator_Func(high,low, 52)
  const senkou_Span_A = ichimoku_Senkou_SpanA_Creator_Func(tenkan,kinjun)

  return {tenkan, kinjun, senkou_Span_A, senkou_Span_B}
}

/*
  data1 -> high candle value
  data2 -> low candle value
*/
const ichimoku_Properties_Creator_Func = (data1, data2, periode) => {
  let res = []
  for(let i = 0 ; i < data1.length - periode; i++)
  {
    let max_candle_high = Number.MIN_VALUE
    let low_candle_high = Number.MAX_VALUE
    for(let j = i ; j < i + (periode + 1); j++)
    {
      max_candle_high = (data1[j] > max_candle_high) ? data1[j] : max_candle_high
      low_candle_high = (data2[j] < low_candle_high) ? data2[j] : low_candle_high
    }
    res.push((max_candle_high + low_candle_high) * 0.5)
  }
  return res
}

/*
  data1 ->  tenkan
  data2 ->  kinjun
*/
const ichimoku_Senkou_SpanA_Creator_Func = (data1, data2, offsetTenkan = 26) => {
  let res = []
  let data1Split = data1.slice(offsetTenkan - 1, data1.length)
  for(let i = 0 ; i < data1.length ; i++)
  {
    const tenkan_value = data1Split[i]
    const kinjun_value = data2[i]
    res.push((tenkan_value + kinjun_value) * 0.5)
  }
  return res
}


module.exports = {createIchimokuCloud}
