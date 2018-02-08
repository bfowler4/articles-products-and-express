
exports.up = function(knex, Promise) {
  return knex.schema.createTable(`products`, function (table) {
    table.increments().notNullable();
    table.string(`name`).notNullable();
    table.unique(`name`);
    table.decimal(`price`);
    table.integer(`inventory`);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(`products`);
};
