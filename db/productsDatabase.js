module.exports = {
  getAll,
  getByKey,
  insert,
  edit,
  remove
}

const productsArray = [];
let idCounter = 0;
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
  if (!getByKey(`name`, product.name)) {
    product.id = idCounter++;
    productsArray.push(product);
    return true;
  }
  return `Error: A product with the name '${product.name}' already exists. Product was not added.`;
}

function edit(product) {
  if (!getByKey(`id`, product.id)) {
    return `Error: Product with given ID does not exist. Product was not edited.`;
  }

  let productToEdit = getByKey(`id`, product.id);
  for (let key of Object.keys(product)) {
    if (key !== `id`) {
      productToEdit[key] = product[key];
    }
  }
  return true;
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