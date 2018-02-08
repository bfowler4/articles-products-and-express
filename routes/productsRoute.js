const express = require(`express`);
const router = express.Router();
const knex = require('../knex/knex.js');
const { findProduct, validateProductForInsert, validateProductForEdit } = require(`../utilities/serverModules`);
module.exports = router;

router.get(`/`, (req, res) => {
  return knex(`products`).select()
  .then((products) => {
    return res.render(`templates/products/index`, { data: products });
  })
  .catch((err) => {
    return res.status(400).json({ message: err.message });
  });
})
.get(`/new`, (req, res) => {
  return res.render(`templates/products/new`);
})
.get(`/:id`, (req, res) => {
  return findProduct(req.params.id)
  .then((product) => {
    return res.render(`templates/products/product`, product);
  })
  .catch((err) => {
    return res.status(404).render(`templates/404`);
  });
})
.get(`/:id/edit`, (req, res) => {
  return findProduct(req.params.id)
  .then((product) => {
    return res.render(`templates/products/edit`, product);
  })
  .catch((err) => {
    return res.status(404).render(`templates/404`);
  });
})
.post(`/`, (req, res) => {
  return validateProductForInsert(req.body)
  .then((product) => {
    return knex(`products`).insert(product);
  })
  .then((insertedArticle) => {
    return res.redirect(`/products`);
  })
  .catch((err) => {
    return res.render(`templates/products/new`, { error: err.message });
  });
})
.put(`/:id`, (req, res) => {
  return validateProductForEdit(req.body)
  .then((product) => {
    return knex(`products`).update(product).where(`id`, req.params.id);
  })
  .then((result) => {
    if (result) {
      return res.redirect(`/products/${req.params.id}`);
    } else {
      return res.status(404).render(`templates/404`);
    }
  })
  .catch((err) => {
    return findProduct(req.params.id)
    .then((product) => {
      product.error = err.message;
      return res.render(`templates/products/edit`, product);
    })
    .catch((err) => {
      return res.status(400).json({ message: err.message });
    });
  });
})
.delete(`/:id`, (req, res) => {
  knex(`products`).delete().where(`id`, req.params.id)
  .then((result) => {
    if (result) {
      return res.redirect(`/products`);
    } else {
      return res.status(404).render(`templates/404`);
    }
  })
  .catch((err) => {
    return res.status(400).json({ message: err.message });
  });
});