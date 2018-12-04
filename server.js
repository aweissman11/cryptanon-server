const express = require('express');
const app = express();
const assets = require('./seedData/seedData.js');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require('knex')(config);

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);
app.locals.title = 'CryptAnon';
app.locals.assets = assets;


// 1 GET endpoints for all of one resource (i.e. ‘/api/v1/merchants’)
// 1 GET endpoints for a specific resource (i.e. ‘/api/v1/merchants/:id’)
// 2 POST endpoints
  // post user
  // add user favorite
// 2 PUT or PATCH endpoints
  // PUT || PATCH username 
  // PUT || PATCH password
// 2 DELETE endpoints
  // delete user
  // delete favorite

app.get('/', (request, response) => {
  response.send('This is the home route. HTML, JS, and  CSS go here');
});

app.get('/api/v1/assets', (request, response) => {
  database('assets').select()
    .then(assets => {
      response.status(200).json(assets);
    })
    .catch(error => {
      response.status(500).json( { error: error.message } )
    })
})

app.get('/api/v1/assets/:asset_ID/asset_prices', (request, response) => {
  const { asset_ID } = request.params;

  database('asset_prices').where('asset_id', asset_ID).select()
    .then(prices => {
      if (prices.length) {
        response.status(200).json(prices);
      } else {
        response.status(404).json( { 
          error: `could not find any asset prices for asset id: ${asset_ID}`
        })
      }
    })
    .catch(error => {
      response.status(500).json( { error } )
    })
})



// app.post('/api/v1/assets', (request, response) => {
//   const asset = request.body;

//   let missingProperties = [];

//   for (let requiredProperty of ['name', 'ticker', 'type', 'icon_url', 'website_url']) {
//     if(asset[requiredProperty] === undefined) {
//       missingProperties = [...missingProperties, requiredProperty]
//     }
//   }

//   if (missingProperties.length) {
//     response
//       .status(422)
//       .send({ error: `missing required param/s: ${missingProperties}`})
//   }


//   app.locals.assets = [...app.locals.assets, asset];
//   response.status(201).json(asset)
//   // sometimes better to just send back a message
//   // response.status(201).json({ message: `${student.name} added to DB`})
// })

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on localhost:${app.get('port')}.`);
});

module.exports = app;
