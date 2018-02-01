module.exports = {
  isArticleValidForInsert,
  isArticleValidForEdit
};

const availableKeys = [`currentTitle`, `title`, `author`, `body`];

function isArticleValidForInsert(article) {
  let keys = Object.keys(article);
  if (keys.length !== 3) {
    return `Error: Insufficient number of keys. Article was not added.`;
  }

  for (let key of keys) {
    if (!availableKeys.includes(key)) {
      return `Error: Received invalid key '${key}'. Article was not added.`;
    }
    if (!article[key]) {
      return `Error: Received blank key on ${key}. Article was not added.`;
    }
  }

  return true;
}

function isArticleValidForEdit(article) {
  let keys = Object.keys(article);
  if (keys.length > 4) {
    return `Error: Insufficient number of keys. Article was not added.`;
  }

  if (!getByKey(`title`, article.currentTitle)) {
    console.log(`title doesnt exist`)
    return false;
  }

  for (let key of availableKeys) {
    if (article.hasOwnProperty(key) && !article[key]) {
      return false;
    }
  }

  if (article.hasOwnProperty(`title`) && getByKey(`title`, article.title)) {
    return false;
  }

  return true;
}