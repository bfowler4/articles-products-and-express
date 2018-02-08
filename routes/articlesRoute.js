const express = require(`express`);
const router = express.Router();
const knex = require('../knex/knex.js');
const { findArticle, validateArticleForInsert, validateArticleForEdit } = require(`../utilities/serverModules`);
module.exports = router;

router.get(`/`, (req, res) => {
  knex.select().from(`articles`)
  .then((articles) => {
    return res.render(`templates/articles/index`, { data: articles });
  })
  .catch((err) => {
    return res.status(400).json({ message: err.message });
  });
})
.get(`/new`, (req, res) => {
  return res.render(`templates/articles/new`);
})
.get(`/:title`, (req, res) => {
  return findArticle(req.params.title)
  .then((article) => {
    return res.render(`templates/articles/article`, article);
  })
  .catch((err) => {
    return res.status(404).render(`templates/404`);
  });
})
.get(`/:title/edit`, (req, res) => {
  return findArticle(req.params.title)
  .then((article) => {
    return res.render(`templates/articles/edit`, article);
  })
  .catch((err) => {
    return res.status(404).render(`templates/404`);
  });
})
.post(`/`, (req, res) => {
  return validateArticleForInsert(req.body)
  .then((article) => {
    return knex(`articles`).insert(article);
  })
  .then((insertedArticle) => {
    return res.redirect(`/articles`);
  })
  .catch((err) => {
    return res.render(`templates/articles/new`, { error: err.message });
  });
})
.put(`/:title`, (req, res) => {
  return validateArticleForEdit(req.body)
  .then((article) => {
    return knex(`articles`).update(article).where(`title`, req.params.title).returning(`title`);
  })
  .then((result) => {
    if (result) {
      return res.redirect(`/articles/${result[0]}`);
    } else {
      return res.status(404).render(`templates/404`);
    }
  })
  .catch((err) => {
    return findArticle(req.params.title)
    .then((article) => {
      article.error = err.message;
      return res.render(`templates/articles/edit`, article);
    })
    .catch((err) => {
      return res.status(400).json({ message: err.message });
    });
  });
})
.delete(`/:title`, (req, res) => {
  knex(`articles`).delete().where(`title`, req.params.title)
  .then((result) => {
    if (result) {
      return res.redirect(`/articles`);
    } else {
      return res.status(404).render(`templates/404`);
    }
  })
  .catch((err) => {
    return res.status(400).json({ message: err.message });
  });
});