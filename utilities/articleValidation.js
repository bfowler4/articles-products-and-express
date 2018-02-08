module.exports = {
  validateArticleForInsert,
  validateArticleForEdit
};

const availableKeys = [`currentTitle`, `title`, `author`, `body`];

function validateArticleForInsert(article) {
  return new Promise(function (resolve, reject) {
    let keys = Object.keys(article);
    if (keys.length !== 3) {
      reject(new Error(`Error: Insufficient number of keys. Article was not added.`));
    }

    for (let key of keys) {
      if (!availableKeys.includes(key)) {
        reject(new Error(`Error: Received invalid key '${key}'. Article was not added.`));
      }
      if (!article[key]) {
        reject(new Error(`Error: Received blank value on '${key}'. Article was not added.`));
      }
    }

    article.urlTitle = encodeURIComponent(article.title);
    resolve(article);
  });
}

function validateArticleForEdit(article) {
  return new Promise(function (resolve, reject) {
    let keys = Object.keys(article);
    if (keys.length < 1) {
      throw new Error(`Error: No keys were received. Article was not edited.`);
    }

    for (let key of keys) {
      if (!availableKeys.includes(key)) {
        throw new Error(`Error: Received invalid key '${key}'. Article was not edited.`);
      }
      if (!article[key]) {
        throw new Error(`Error: Received blank value on '${key}'. Article was not edited.`);
      }
    }

    if (article.hasOwnProperty(`title`)) {
      article.urlTitle = encodeURIComponent(article.title);
    }
    resolve(article);
  })
}