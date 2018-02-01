const express = require(`express`);
const router = express.Router();
const productsDatabase = require(`../db/productsDatabase`);
module.exports = router;

router.get(`/`, (req, res) => {
  return res.render(`templates/products/index`, { data: productsDatabase.getAll() });
})
.get(`/new`, (req, res) => {
  return res.render(`templates/products/new`);
})
.get(`/:id`, (req, res) => {
  let product = productsDatabase.getByKey(`id`, req.params.id);
  if (product) {
    return res.render(`templates/products/product`, product);
  }
  return res.send(`<h1>404 NOT FOUND</h1>`);
})
.get(`/:id/edit`, (req, res) => {
  let product = productsDatabase.getByKey(`id`, req.params.id);
  if (product) {
    return res.render(`templates/products/edit`, product);
  }
  return res.send(`<h1> 404 NOT FOUND</h1>`);
})
.post(`/`, (req, res) => {
  if (productsDatabase.insert(req.body)) {
    return res.redirect(`/products`);
  }
  return res.render(`templates/products/new`, { error: true });
})
.put(`/:id`, (req, res) => {
  if (!productsDatabase.getByKey(`id`, req.params.id)) {
    return res.send(`<h1>404 NOT FOUND</h1>`);
  }

  let product = productsDatabase.edit(req.body);
  if (product) {
    return res.redirect(`/products/${product.id}`);
  }
  if (product = productsDatabase.getByKey(`id`, req.body.id)) {
    product = Object.assign({}, product);
    product.error = true;
    return res.render(`templates/products/edit`, product);
  } else {
    return res.send(`<h1>404 NOT FOUND</h1>`);
  }
})
.delete(`/:id`, (req, res) => {
  if (productsDatabase.remove(req.params.id)) {
    return res.redirect(`/products`);
  }
  return res.send(`<h1>404 NOT FOUND</h1>`);
});