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
      return `Error: Received blank value on '${key}'. Article was not added.`;
    }
  }

  return true;
}

function isArticleValidForEdit(article) {
  let keys = Object.keys(article);
  if (keys.length === 1) {
    return `Error: No keys were receieved. Article was not edited.`;
  }

  for (let key of keys) {
    if (!availableKeys.includes(key)) {
      return `Error: Received invalid key '${key}'. Article was not edited.`;
    }
    if (!article[key]) {
      return `Error: Received blank value on '${key}'. Article was not edited.`;
    }
  }

  return true;
}