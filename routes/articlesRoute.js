const express = require(`express`);
const router = express.Router();
const articlesDatabase = require(`../db/articlesDatabase`);
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
  if (articlesDatabase.insert(req.body)) {
    return res.render(`templates/articles/index`, { data: articlesDatabase.getAll() });
  }
  return res.send(`ERROR WASN'T ABLE TO INSERT ARTICLE`);
})
.put(`/:title`, (req, res) => {
  req.body.currentTitle = req.params.title;
  let article = articlesDatabase.edit(req.body);
  if (article) {
    return res.render(`templates/articles/article`, article);
  }
  return res.send(`ERROR COULD NOT EDIT ARTICLE`);
})
.delete(`/:title`, (req, res) => {
  if (articlesDatabase.remove(req.params.title)) {
    return res.render(`templates/articles/index`, { data: articlesDatabase.getAll() });
  }
  return res.send(`ERROR WAS NOT ABLE TO DELETE ARTICLE`);
});