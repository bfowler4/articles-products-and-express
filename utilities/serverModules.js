const logRequest = require(`./requestLogger`);
const { isArticleValidForEdit, isArticleValidForInsert } = require(`./articleValidation`);
const { isProductValidForInsert, isProductValidForEdit } = require(`./productValidation`);

module.exports = {
  logRequest,
  isArticleValidForEdit,
  isArticleValidForInsert,
  isProductValidForEdit,
  isProductValidForInsert
};