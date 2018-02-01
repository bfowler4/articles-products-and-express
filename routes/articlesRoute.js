const express = require(`express`);
const router = express.Router();
const articlesDatabase = require(`../db/articlesDatabase`);
const { isArticleValidForInsert, isArticleValidForEdit } = require(`../utilities/serverModules`);
module.exports = router;

router.get(`/`, (req, res) => {
  return res.render(`templates/articles/index`, { data: articlesDatabase.getAll() });
})
.get(`/new`, (req, res) => {
  return res.render(`templates/articles/new`);
})
.get(`/:title`, (req, res) => {
  let article = articlesDatabase.getByKey(`title`, req.params.title);
  if (article) {
    return res.render(`templates/articles/article`, article);
  }
  return res.send(`<h1>404 NOT FOUND</h1>`);
})
.get(`/:title/edit`, (req, res) => {
  let article = articlesDatabase.getByKey(`title`, req.params.title);
  if (article) {
    return res.render(`templates/articles/edit`, article);
  }
  return res.send(`<h1>404 NOT FOUND</h1>`);
})
.post(`/`, (req, res) => {
  let validation = isArticleValidForInsert(req.body);
  if (validation === true) {
    if (articlesDatabase.insert(req.body)) {
      return res.redirect(`/articles`);
    }
    return res.render(`templates/articles/new`, { error: `Error: Article already exists in database. Article was not added.` });
  }
  return res.render(`templates/articles/new`, { error: validation });
})
.put(`/:title`, (req, res) => {
  req.body.currentTitle = req.params.title;
  let article = articlesDatabase.edit(req.body);
  if (article) {
    return res.redirect(`/articles/${article.title}`);
  }
  if (article = articlesDatabase.getByKey(`title`, req.params.title)) {
    article = Object.assign({}, article);
    article.error = true;
    return res.render(`templates/articles/edit`, article);
  } else {
    return res.send(`<h1>404 NOT FOUND</h1>`);
  }
})
.delete(`/:title`, (req, res) => {
  if (articlesDatabase.remove(req.params.title)) {
    return res.render(`templates/articles/index`, { data: articlesDatabase.getAll() });
  }
  return res.send(`<h1>404 NOT FOUND</h1>`);
});