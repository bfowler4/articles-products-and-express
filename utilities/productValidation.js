module.exports = {
  validateProductForInsert,
  validateProductForEdit
};

const availableKeys = [`name`, `price`, `inventory`];

function validateProductForInsert(product) {
  return new Promise(function (resolve, reject) {
    let keys = Object.keys(product);
    if (keys.length !== 3) {
      reject(new Error(`Error: Insufficient number of keys. Product was not added.`));
    }

    for (let key of keys) {
      if (!availableKeys.includes(key)) {
        reject(new Error(`Error: Received invalid key '${key}'. Product was not added.`));
      }
      if (!product[key]) {
        reject(new Error(`Error: Received blank value on '${key}'. Article was not added`));
      }
      if (key === `price` || key === `inventory`) {
        if (product[key].match(/[^0-9\.]/) !== null) {
          reject(new Error(`Error: '${key}' must only consist of numbers. Product was not added.`));
        }
      }
    }

    resolve(product);
  })
}

function validateProductForEdit(product) {
  return new Promise(function (resolve, reject) {
    let keys = Object.keys(product);
    if (keys.length < 1) {
      reject(new Error(`Error: No keys to edit were provided. Product was not edited.`));
    }

    for (let key of keys) {
      if (!availableKeys.includes(key)) {
        reject(new Error(`Error: Received invalid key '${key}'. Product was not edited.`));
      }
      if (!product[key]) {
        reject(new Error(`Error: Received blank value on '${key}'. Article was not edited`));
      }
      if (key === `price` || key === `inventory`) {
        if (product[key].match(/[^0-9\.]/) !== null) {
          reject(new Error(`Error: '${key}' must only consist of numbers. Product was not edited.`));
        }
      }
    }

    resolve(product);
  });
}