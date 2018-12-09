// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/cryptanon',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/cryptanon_test',
    migrations: {
      directory: './db/migrations'
    }, 
    seeds: {
      directory: './db/seeds/test/' 
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production/' 
    },
    useNullAsDefault: true
  }
};

// postgresql-infinite-67438

// postgres://cwtdurhaxzujvo:2d8b66a3ebc335d8dfa0351932781ead346d9f6596964c0fa7001ecde3339d51@ec2-54-243-150-10.compute-1.amazonaws.com:5432/daf3nuegb8e095