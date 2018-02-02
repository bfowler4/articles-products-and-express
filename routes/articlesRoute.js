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
  return res.status(404).render(`templates/404`);
})
.get(`/:title/edit`, (req, res) => {
  let article = articlesDatabase.getByKey(`title`, req.params.title);
  if (article) {
    return res.render(`templates/articles/edit`, article);
  }
  return res.status(404).render(`templates/404`);
})
.post(`/`, (req, res) => {
  let validation = isArticleValidForInsert(req.body);
  if (validation === true) {
    validation = articlesDatabase.insert(req.body);
    if (validation === true) {
      return res.redirect(`/articles`);
    }
  }
  return res.render(`templates/articles/new`, { error: validation });
})
.put(`/:title`, (req, res) => {
  let article;
  if (article = articlesDatabase.getByKey(`title`, req.params.title)) {
    req.body.currentTitle = req.params.title;
    let validation = isArticleValidForEdit(req.body);
    if (validation === true) {
      validation = articlesDatabase.edit(req.body);
      if (validation === true) {
        return res.redirect(`/articles/${req.body.title}`);
      }
    }
    article.error = validation;
    return res.render(`templates/articles/edit`, article);
  }
  return res.status(404).render(`templates/404`);
})
.delete(`/:title`, (req, res) => {
  if (articlesDatabase.remove(req.params.title)) {
    return res.redirect(`/articles`);
  }
  return res.status(404).render(`templates/404`);
});