module.exports = {
  getAll,
  insert,
  getByKey,
  edit,
  remove
}

const articlesArray = [];
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
  if (!getByKey(`title`, article.title)) {
    article.urlTitle = encodeURIComponent(article.title);
    articlesArray.push(article);
    return true;
  }
  return `Error: Article already exists in database. Article was not added.`;
}

function edit(article) {
  if (!getByKey(`title`, article.currentTitle)) {
    return `Error: Article does not exist. Article was not edited.`;
  }

  if (article.hasOwnProperty(`title`) && getByKey(`title`, article.title)) {
    return `Error: Article title can't be changed to '${article.title}'. An article with that title already exists. Article was not edited.`;
  }

  let articleToEdit = getByKey(`title`, article.currentTitle);
  for (let key of Object.keys(article)) {
    if (key !== `currentTitle`) {
      articleToEdit[key] = article[key];
      if (key === `title`) {
        articleToEdit.urlTitle = encodeURIComponent(articleToEdit.title);
      }
    }
  }
  return true;
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