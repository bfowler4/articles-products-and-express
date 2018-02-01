module.exports = {
  isProductValidForInsert,
  isProductValidForEdit
};

function isProductValidForInsert(product) {
  let keys = Object.keys(product);
  if (keys.length !== 3) {
    return `Error: Received insufficient amount of keys.`;
  }
  if (!(product.name && product.price && product.inventory)) {
    return `Error: Received a blank value`;
  }

  if (product.price.match(/[^0-9]/) !== null && product.inventory.match(/[^0-9]/) !== null) {
    return `Error: Product price and inventory must only consist of numbers.`;
  }

  //MOVE TO DATABASE
  // if (getByKey(`name`, product.name)) {
  //   return false;
  // }

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