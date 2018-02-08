
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          name: `strawberry`,
          price: 1.99,
          inventory: 50
        },
        {
          name: `pineapple`,
          price: 40,
          inventory: 127
        }
      ]);
    });
};
