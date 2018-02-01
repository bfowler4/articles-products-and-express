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

function isProductValidForInsert(product) {
  let keys = Object.keys(product);
  if (keys.length !== 3) {
    return false;
  }
  if (!(product.name && product.price && product.inventory)) {
    return false;
  }

  if (product.price.match(/[^0-9]/) !== null && product.inventory.match(/[^0-9]/) !== null) {
    return false;
  }

  if (getByKey(`name`, product.name)) {
    return false;
  }

  return true;
}

function isProductValidForEdit(product) {
  let keys = Object.keys(product);
  if (keys.length > 4) {
    return false;
  }

  if (!getByKey(`id`, product.id)) {
    console.log(`id failed`);
    return false;
  }

  if (!keys.every(curr => availableKeys.includes(curr))) {
    console.log(`one of the keys failed`);
    return false;
  }

  if (keys.includes(`price`)) {
    if (!(product.price && product.price.match(/[^0-9]/) === null)) {
      return false;
    }
  }

  if (keys.includes(`inventory`)) {
    if (!(product.inventory && product.inventory.match(/[^0-9]/) === null)) {
      return false;
    }
  }

  if (keys.includes(`name`)) {
    if (!product.name) {
      return false;
    }
  }

  return true;
}