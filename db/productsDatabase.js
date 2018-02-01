module.exports = {
  getAll,
  getByKey,
  insert,
  edit,
  remove
}

const productsArray = [];
let idCounter = 0;
const availableKeys = [`name`, `price`, `inventory`, `id`];
productsArray.push({
  id: idCounter++,
  name: `banana`,
  price: 100,
  inventory: 50
});
productsArray.push({
  id: idCounter++,
  name: `apple`,
  price: 20,
  inventory: 300
});


function getAll() {
  return productsArray;
}

function getByKey(key, value) {
  for (let product of productsArray) {
    if (product[key] == value) {
      return product;
    }
  }
  return false;
}

function insert(product) {
  if (isProductValidForInsert(product)) {
    product.id = idCounter++;
    productsArray.push(product);
    return true;
  }
  return false;
}

function edit(product) {
  if (isProductValidForEdit(product)) {
    let productToEdit = getByKey(`id`, product.id);
    for (let key of Object.keys(product)) {
      if (key !== `id`) {
        productToEdit[key] = product[key];
      }
    }
    return productToEdit;
  }
  return false;
}

function remove(id) {
  for (let i = 0; i < productsArray.length; i++) {
    if (productsArray[i].id == id) {
      productsArray.splice(i, 1);
      return true;
    }
  }
  return false;
}