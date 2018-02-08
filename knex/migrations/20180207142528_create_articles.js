
exports.up = function(knex, Promise) {
  return knex.schema.createTable(`articles`, function(table) {
    table.increments().notNullable();
    table.string(`title`).notNullable();
    table.unique(`title`);
    table.string(`author`).notNullable();
    table.text(`body`).notNullable();
    table.string(`urlTitle`).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(`users`);
};
