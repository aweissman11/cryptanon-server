const express = require('express');
const app = express();
const assets = require('./seedData/seedData.js');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require('knex')(config);

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3001);
app.locals.title = 'CryptAnon';
app.locals.assets = assets;


// 1 GET endpoints for all of one resource (i.e. ‘/api/v1/merchants’)
// 1 GET endpoints for a specific resource (i.e. ‘/api/v1/merchants/:id’)

// 1 POST endpoints

  // add user favorite
// 1 DELETE endpoints
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


// add query to end of url???
app.get('/api/v1/assets/:asset_ID/asset_prices', (request, response) => {
  const { asset_ID } = request.params;
  const { uniDate } = request.query;

  if (!uniDate) {
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
  } else {
    database.select()
    .from('asset_prices')
    .where('asset_id', asset_ID)
    .andWhere('pricing_date', '<=', uniDate)
      .select()
      .then(prices => {
        if (prices.length){
          return response.status(200).json(prices);
        }
        return response.status(404).json({ message: `could not find any prices for ${asset_ID} in the range of ${days}`});
      })
      .catch((error) => {
        return response.status(500).json({ error });
      });
  }
});

app.get('/api/v1/assets/:asset_ID/articles', (request, response) => {
  const { asset_ID } = request.params;

  database('asset_articles').where('asset_id', asset_ID).select()
    .then(prices => {
      if (prices.length) {
        response.status(200).json(prices);
      } else {
        response.status(404).json( { 
          error: `could not find any articles for asset id: ${asset_ID}`
        })
      }
    })
    .catch(error => {
      response.status(500).json( { error } )
    })
})

app.get('/api/v1/users', (request, response) => {
  database('users').select()
  .then(users => {
    response.status(200).json(users)
  })
  .catch(error => {
    response.status(500).json({ error: error.message })
  })
})

app.post('/api/v1/users', (request, response) => {
  const user = request.body;
  let missingProperties = [];

  for (let requiredProperty of ['username', 'password']) {
    if(user[requiredProperty] === undefined) {
      missingProperties = [...missingProperties, requiredProperty]
    }
  }

  if (missingProperties.length) {
    response
      .status(422)
      .send({ error: `missing required param/s: ${missingProperties}`})
      return;
  }

  database('users').insert(user, 'id')
    .then(userIds => {
      response.status(201).json({ username: user.username, id: userIds[0]})
    })
    .catch(error => ({ error: error.message }))

})

app.patch('/api/v1/users/username/:id', (request, response) => {
  const { id } = request.params;
  const user = request.body

  let missingProperties = [];

  for (let requiredProperty of ['username']) {
    if(user[requiredProperty] === undefined) {
      missingProperties = [...missingProperties, requiredProperty]
    }
  }

  if (missingProperties.length) {
    response
      .status(422)
      .send({ error: `missing required param/s: ${missingProperties}`})
      return;
  }

  database('users').where('id', id).update('username', user.username)
    .then(userIds => {   
      response.status(204).json({ userId: userIds[0] })
    })
    .catch(error => {
      response.status(500).json({ error: error.message }) 
    })
});

app.patch('/api/v1/users/password/:id', (request, response) => {
  const { id } = request.params;
  const user = request.body


  let missingProperties = [];

  for (let requiredProperty of ['password']) {
    if(user[requiredProperty] === undefined) {
      missingProperties = [...missingProperties, requiredProperty]
    }
  }

  if (missingProperties.length) {
    response
      .status(422)
      .send({ error: `missing required param/s: ${missingProperties}`})
      return;
  }

  database('users').where('id', id).update('username', user.password)
    .then(userIds => {   
      response.status(204).json({ id: userIds[0] })
    })
    .catch(error => {
      response.status(500).json({ error: error.message }) 
    })
});


app.delete('/api/v1/users/:id', (request, response) => {
  database('users').where('id', request.params.id).del()
    .then(user => {
      if (user > 0) {
        response.status(204).json({ message: `user ${request.params.id} deleted`});
      } else {
        response.status(404).json({
          error: `No user with id ${request.params.id} exists`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/favorites/:user_ID', (request, response) => {
  const { user_ID } = request.params;

  database('favorites').where('user_id', user_ID).select()
    .then(favorites => {
      response.status(200).json(favorites);
    })
    .catch(error => {
      response.status(500).json( { error } )
    })
})

app.post('/api/v1/favorites', (request, response) => {
  const favorite = request.body;
  let missingProperties = [];

  for (let requiredProperty of ['user_id', 'asset_id']) {
    if(favorite[requiredProperty] === undefined) {
      missingProperties = [...missingProperties, requiredProperty]
    }
  }

  if (missingProperties.length) {
    response
      .status(422)
      .send({ error: `missing required param/s: ${missingProperties}`})
      return;
  }

  database('favorites').insert(favorite, 'id')
    .then(userIds => {
      response.status(201).json({ asset_id: favorite.asset_id, user_id: favorite.user_id, id: userIds[0]})
    })
    .catch(error => ({ error: error.message }))

})

app.delete('/api/v1/favorites/:favorite_id', (request, response) => {
  database('favorites').where('id', request.params.favorite_id).del()
    .then(favorite => {
      if (favorite > 0) {
        response.status(204).json({ message: `favorite ${request.params.id} deleted`});
      } else {
        response.status(404).json({
          error: `No favorite with id ${request.params.id} exists`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on localhost:${app.get('port')}.`);
});

module.exports = {
  app,
  database
};
