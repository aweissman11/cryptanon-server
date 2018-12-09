# CRYPTANON SERVER
CryptoAnon is a simple HTTP REST API for searching and retrieving cryptocurrency pricing and related news articles. It can help you answer questions like:

* What are the top 50 cryptocurrencies right now?
* What are the pricing trends for Bitcoin over the last 30 days?
* What are the top headlines for Ethereum right now?
* What are the top headlines for Ethereum right now?
* Beta: Save your favorite cryptocurrencies to a personalized account.


## ENDPOINTS
CryptAnon has two root Endpoints: Cryptocurrencies and Users.

### CRYPTOCURRENCIES

# To get the top 50 cryptocurrencies make a GET REQUEST to:

http://cryptanon-server.herokuapp.com/api/v1/assets

Example output:

[
  {
    "id": 1,
    "name": "Bitcoin",
    "ticker": "BTC",
    "type": "cryptocurrency",
    "icon_url": "http://www.bitcoin/icon.svg",
    "website_url": "http://www.bitcoin.com"
  },
  {
    "id": 2,
    "name": "Ethereum",
    "ticker": "ETH",
    "type": "cryptocurrency",
    "icon_url": "http://www.ethereum/icon.svg",
    "website_url": "http://www.ethereum.com"
  },...
]

# To get ALL historical pricing for a specific cryptocurrency make a GET REQUEST to:

http://cryptanon-server.herokuapp.com/api/v1/assets/:asset_ID/asset_prices

Example output:

[
  {
    "price": 15234.43,
    "pricing_date": 1231532453,
    "asset_id": 1
  },...
]

# To get a RANGE of historical pricing for a specific cryptocurrency make a GET REQUEST to:

http://cryptanon-server.herokuapp.com/api/v1/assets/:asset_ID/asset_prices?uniDate=12321443

Where uniDate is the unicode start date.  If you want the last 30 days of historical pricing convert the date 30 days ago to unicode and pass that as the assigned value to 'uniDate'.

# To get the top headlines for a specific currency make a GET REQUEST to:

http://cryptanon-server.herokuapp.com/api/v1/assets/:asset_id/articles

Example output:

[
  {
    "id": 1,
    "source": "ABC",
    "author": "John Denver",
    "title": "Bitcoin's Historic rise",
    "url": "http://www.abc/bitcoin_historic_rise",
    "urlToImage": "http://www.abc/bitcoin_historic_rise/img.jpg"
    "publishedAt": 123432532
    "content": "The article about Bitcoin will be at least 300 characters long"
    "asset_id": 1
  },....
  
]


### USERS

# To create a user make a POST REQUEST to:

http://cryptanon-server.herokuapp.com/api/v1/users

Include a body {
  username: 'John Denver',
  password: 'fnioew8332'
}

Example output:

  {
    "id": 1,
    "username": "Bitcoin",
  }

# To change a password for a specific user make a PATCH REQUEST to:

http://cryptanon-server.herokuapp.com/api/v1/users/username/:id

Include a body {
  username: 'John Doe Denver'
}

Example output:

  {
    "id": 1,
  }

# To change a username for a specific user make a PATCH REQUEST to:

http://cryptanon-server.herokuapp.com/api/v1/users/username/:id

Include a body {
  password: "fjljjfs12312"
}

Example output:

  {
    "id": 1,
  }

# To delete a specific user make a DELETE REQUEST to:

http://cryptanon-server.herokuapp.com/api/v1/users/username/:id

Include a body {
  password: "fjljjfs12312"
}

Example output:

  {
    "message": "user 1 deleted",
  }

# To add a favorite cryptocurrency to a user make a POST REQUEST to:

http://cryptanon-server.herokuapp.com/api/v1/favorites

Include a body {
  user_id: 1,
  asset_id: 1
}

Example output:

  {
    user_id: 1,
    asset_id: 1
  }

# To delete a favorite cryptocurrency for a user make a DELETE REQUEST to:

http://cryptanon-server.herokuapp.com/api/v1/favorites/:favorite_id

Example output:

  {
    message: "favorite 1 deleted"
  }

# To get ALL favorites for a user make a GET REQUEST to:

http://cryptanon-server.herokuapp.com/api/v1/favorites/:user_ID

Example output:

 [
    {
      user_id: 1,
      asset_id: 1
    },...
 ]

