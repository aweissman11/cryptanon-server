let assets = require('../../../seedData/seedData.json');

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
      return Promise.all(historicalPricePromises)
    })
}

const createPriceHistory = (knex, pricePoint) => {
  return knex('asset_prices').insert(pricePoint);
}


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
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
