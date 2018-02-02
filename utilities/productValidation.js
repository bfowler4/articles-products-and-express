module.exports = {
  isProductValidForInsert,
  isProductValidForEdit
};

const availableKeys = [`name`, `price`, `inventory`];

function isProductValidForInsert(product) {
  let keys = Object.keys(product);
  if (keys.length !== 3) {
    return `Error: Insufficient number of keys. Product was not added.`;
  }

  for (let key of keys) {
    if (!availableKeys.includes(key)) {
      return `Error: Received invalid key '${key}'. Product was not added.`;
    }
    if (!product[key]) {
      return `Error: Received blank value on '${key}'. Article was not added`;
    }
    if (key === `price` || key === `inventory`) {
      if (product[key].match(/[^0-9]/) !== null) {
        return `Error: '${key}' must only consist of numbers. Product was not added.`;
      }
    }
  }

  return true;
}

function isProductValidForEdit(product) {
  let keys = Object.keys(product);
  if (keys.length < 2) {
    return `Error: No keys to edit were provided. Product was not edited.`
  }

  if (!keys.includes(`id`)) {
    return `Error: Missing 'id' key. Product was not edited.`
  }

  for (let key of keys) {
    if (!availableKeys.includes(key) && key !== `id`) {
      return `Error: Received invalid key '${key}'. Product was not edited.`;
    }
    if (!product[key]) {
      return `Error: Received blank value on '${key}'. Article was not edited`;
    }
    if (key === `price` || key === `inventory`) {
      if (product[key].match(/[^0-9]/) !== null) {
        return `Error: '${key}' must only consist of numbers. Product was not edited.`;
      }
    }
  }
  return true;
}