module.exports = {
  getAll,
  insert,
  getByKey,
  edit,
  remove
}

const articlesArray = [];
const availableKeys = [`title`, `author`, `body`];
articlesArray.push({
  title: `the grinch`,
  author: `brandon fowler`,
  body: `the grinch who stole christmas`,
  urlTitle: encodeURIComponent(`the grinch`)
});
articlesArray.push({
  title: `catch 22`,
  author: `John Grisham`,
  body: `How ironic can this be`,
  urlTitle: encodeURIComponent(`catch 22`)
});

function getAll() {
  return articlesArray;
}

function getByKey(key, value) {
  for (let article of articlesArray) {
    if (article[key] === value) {
      return article;
    }
  }
  return false;
}

function insert(article) {
  if (isArticleValidForInsert(article)) {
    article.urlTitle = encodeURIComponent(article.title);
    articlesArray.push(article);
    return true;
  }
  return false;
}

function edit(article) {
  if (isArticleValidForEdit(article)) {
    let articleToEdit = getByKey(`title`, article.currentTitle);
    for (let key of Object.keys(article)) {
      articleToEdit[key] = article[key];
      if (key === `title`) {
        articleToEdit.urlTitle = encodeURIComponent(articleToEdit.title);
      }
    }
    return articleToEdit;
  }
  return false;
}

function remove(title) {
  for (let i = 0; i < articlesArray.length; i ++) {
    if (articlesArray[i].title === title) {
      articlesArray.splice(i, 1);
      return true;
    }
  }
  return false;
}


function isArticleValidForInsert(article) {
  let keys = Object.keys(article);
  if (keys.length !== 3) {
    return false;
  }
  if (!(article.title && article.author && article.body)) {
    return false;
  }

  if (getByKey(`title`, article.title)) {
    return false;
  }

  return true;
}

function isArticleValidForEdit(article) {
  let keys = Object.keys(article);
  if (keys.length > 4) {
    console.log(`too many keys`)
    return false;
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