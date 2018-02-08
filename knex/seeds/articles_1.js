
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function () {
      // Inserts seed entries
      return knex('articles').insert([
        {
          title: `catch 22`, 
          author: `brandon`,
          body: `Oh the irony`,
          urlTitle: `catch%2022`
        },
        {
          title: `milk and honey`,
          author: `rupi kaur`,
          body: `did you think i was a city`,
          urlTitle: `milk%20and%20honey`
        }
      ]);
    });
};
