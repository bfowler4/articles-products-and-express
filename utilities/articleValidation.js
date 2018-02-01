module.exports = {
  isArticleValidForInsert,
  isArticleValidForEdit
};

function isArticleValidForInsert(article) {
  let keys = Object.keys(article);
  if (keys.length !== 3) {
    return `Error: Insufficient number of keys. Article was not added.`;
  }
  if (!(article.title && article.author && article.body)) {
    return `Error: Received a blank value. Article was not added.`;
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