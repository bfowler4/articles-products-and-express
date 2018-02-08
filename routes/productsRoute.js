const express = require(`express`);
const router = express.Router();
const productsDatabase = require(`../db/productsDatabase`);
const { isProductValidForInsert, isProductValidForEdit } = require(`../utilities/productValidation`);
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
  return res.status(404).render(`templates/404`);
})
.get(`/:id/edit`, (req, res) => {
  let product = productsDatabase.getByKey(`id`, req.params.id);
  if (product) {
    return res.render(`templates/products/edit`, product);
  }
  return res.status(404).render(`templates/404`);
})
.post(`/`, (req, res) => {
  let validation = isProductValidForInsert(req.body);
  if (validation === true) {
    validation = productsDatabase.insert(req.body);
    if (validation === true) {
      return res.redirect(`/products`);
    }
  }
  res.render(`templates/products/new`, { error: validation });
})
.put(`/:id`, (req, res) => {
  let product;
  if (product = productsDatabase.getByKey(`id`, req.params.id)) {
    let validation = isProductValidForEdit(req.body);
    if (validation === true) {
      validation = productsDatabase.edit(req.body);
      if (validation === true) {
        return res.redirect(`/products/${req.body.id}`);
      }
    }
    product.error = validation;
    res.render(`templates/products/edit`, product);
  } else {
    return res.status(404).render(`templates/404`);
  }
})
.delete(`/:id`, (req, res) => {
  if (productsDatabase.remove(req.params.id)) {
    return res.redirect(`/products`);
  }
  return res.status(404).render(`templates/404`);
});





function getById(id) {
  for (let product of productList) {
    if (product.id === id) {
      return product;
    }
  }
  return `error`;
}