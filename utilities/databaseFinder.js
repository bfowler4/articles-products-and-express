const knex = require('../knex/knex.js');
module.exports = {
  findArticle,
  findProduct
};

function findArticle(title) {
  return knex.select().from(`articles`).where(`title`, title)
  .then((article) => {
    if (article.length) {
      return article[0];
    } else {
      throw Error(`Article was not found`);
    }
  });
}

function findProduct(id) {
  return knex(`products`).select().where(`id`, id)
  .then((product) => {
    if (product.length) {
      return product[0];
    } else {
      throw Error(`Article was not found`);
    }
  });
}