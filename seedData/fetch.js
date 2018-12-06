// const url = 'https://api.coinranking.com/v1/public/coins'

// const fetchHistorical = async() => {
//   const response = await fetch(url)
//   const data = await response.json()
//   const historical = await getHistorical(data.data.coins)
//   const articles = await getArticles(historical)

//   console.log(JSON.stringify(articles, null, 2))
// }

// const getHistorical = async coins => {
//   const unresolvedPromises = coins.map(async coin => {
//     const result = await fetch(`https://api.coinranking.com/v1/public/coin/${coin.id}/history/1y`)
//     const data = await result.json()
//     return {
//       name: coin.name,
//       ticker: coin.symbol,
//       type: 'cryptocurrency',
//       icon_url: coin.iconUrl,
//       website_url: coin.websiteUrl,
//       price_history: data.data.history
//     }
//   })
//   return Promise.all(unresolvedPromises)
// }


// const getArticles = async coins => {
//   const unresolvedPromises = coins.map(async coin => {
//     const URLTopic = coin.name.replace(' ', '+')
//     const result = await fetch(`https://newsapi.org/v2/everything?q=${URLTopic}&sortBy=popularity&pageSize=10&apiKey=077c0a2815b645a084fbccc8aec0b2e8`)
//     const data = await result.json()
//     return {...coin, articles: data.articles}
//   })
//   return Promise.all(unresolvedPromises)
  
// }

// https://newsapi.org/v2/everything?q=bitcoin&sortBy=popularity&pageSize=10&apiKey=077c0a2815b645a084fbccc8aec0b2e8`
// https://api.coinranking.com/v1/public/coin/1335/history/1y


// BTC: https://api.coinranking.com/v1/public/coin/1335/history/1y
// XRP: https://api.coinranking.com/v1/public/coin/840/history/1y
// ETH: https://api.coinranking.com/v1/public/coin/1211/history/1y
// XLM: https://api.coinranking.com/v1/public/coin/798/history/1y
// BCH: https://api.coinranking.com/v1/public/coin/4696/history/1y
// EOS: https://api.coinranking.com/v1/public/coin/1281/history/1y
// LTC: https://api.coinranking.com/v1/public/coin/527/history/1y
// USDT: https://api.coinranking.com/v1/public/coin/1146/history/1y
// BSV: https://api.coinranking.com/v1/public/coin/4699/history/1y
// ADA: https://api.coinranking.com/v1/public/coin/2207/history/1y
