
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('assets', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('ticker');
      table.string('type');
      table.string('icon_url');
      table.string('website_url');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username');
      table.string('password');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('favorites', function(table) {
      table.increments('id').primary();
            
      table.integer('user_id').unsigned();
      table.foreign('user_id')
        .references('users.id');
            
      table.integer('asset_id').unsigned();
      table.foreign('asset_id')
        .references('assets.id');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('asset_prices', function(table) {
      table.increments('id').primary();
      table.string('price');
      table.string('pricing_date');
      table.integer('asset_id').unsigned();
      table.foreign('asset_id')
        .references('assets.id');


      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('favorites'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('asset_prices'),
    knex.schema.dropTable('assets')
  ])
};
