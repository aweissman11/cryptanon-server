let assets = require('../../../seedData/herokuSeed.json');

const createAssets = (knex, asset) => {
  return knex('assets').insert({
    name: asset.name,
    ticker: asset.ticker,
    type: asset.type,
    icon_url: asset.icon_url,
    website_url: asset.website_url
  }, 'id')
    .then(assetIds => {
      let historicalPricePromises = asset.price_history.map(pricePoint => {
        return createPriceHistory(knex, {
          price: pricePoint.price,
          pricing_date: pricePoint.timestamp,
          asset_id: assetIds[0]
        })
      })
      let articlePromises = asset.articles.map(article => {
        return createArticleHistory(knex, {
          source: article.source.name,
          author: article.author,
          title: article.title,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          content: article.content,
          asset_id: assetIds[0]
        })
      })
      let allPromises = [...historicalPricePromises, ...articlePromises]
      return Promise.all(allPromises)
    })
}

const createPriceHistory = (knex, pricePoint) => {
  return knex('asset_prices').insert(pricePoint);
}

const createArticleHistory = (knex, article) => {
  return knex('asset_articles').insert(article);
}


exports.seed = function(knex, Promise) {
  return knex('asset_prices').del()
    .then(() => knex('assets').del())
    .then(function () {
      let assetPromises = assets.map( asset => {
        return createAssets(knex, asset)
      })
      
      return Promise.all(assetPromises)

    })
    .then(() => console.log('successfully seeded DB'))
    .catch(error => console.log({ error: `error seeding DB: ${error.message}`}))
};
