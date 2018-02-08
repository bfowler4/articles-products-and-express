const logRequest = require(`./requestLogger`);
const { validateArticleForEdit, validateArticleForInsert } = require(`./articleValidation`);
const { validateProductForInsert, validateProductForEdit } = require(`./productValidation`);
const { findArticle, findProduct } = require(`./databaseFinder`);

module.exports = {
  logRequest,
  validateArticleForEdit,
  validateArticleForInsert,
  validateProductForEdit,
  validateProductForInsert,
  findArticle,
  findProduct
};