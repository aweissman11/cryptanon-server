const express = require('express');
const app = express();
const assets = require('./assets');

const bodyParser = require('body-parser');

app.use(bodyParser.json());


app.set('port', process.env.PORT || 3000);
app.locals.title = 'CryptAnon';
app.locals.assets = assets;

app.get('/', (request, response) => {
  response.send('This is the home route. HTML, JS, and  CSS go here');
});

app.get('/api/v1/assets', (request, response) => {
  response.status(200).json(app.locals.assets);
})

app.post('/api/v1/assets', (request, response) => {
  const asset = request.body;

  let missingProperties = [];

  for (let requiredProperty of ['name', 'ticker', 'type', 'icon_url', 'website_url']) {
    if(asset[requiredProperty] === undefined) {
      missingProperties = [...missingProperties, requiredProperty]
    }
  }

  if (missingProperties.length) {
    response
      .status(422)
      .send({ error: `missing required param/s: ${missingProperties}`})
  }


  app.locals.assets = [...app.locals.assets, asset];
  response.status(201).json(asset)
  // sometimes better to just send back a message
  // response.status(201).json({ message: `${student.name} added to DB`})
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on localhost:${app.get('port')}.`);
});

module.exports = app;
