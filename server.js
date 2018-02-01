const express = require(`express`);
const handlebars = require(`express-handlebars`);
const bodyParser = require('body-parser');
const methodOverride = require(`method-override`);

const PORT = process.env.PORT || 8080;

const server = express();
const productsRoute = require(`./routes/productsRoute`);
const articlesRoute = require(`./routes/articlesRoute`);


server.engine(`.hbs`, handlebars({defaultaLayout: `main`, extname: `.hbs`}));
server.set(`view engine`, `.hbs`);
server.use((req, res, next) => {
  console.log(req.method, req.url, new Date().toLocaleDateString());
  next();
});
server.use(bodyParser.urlencoded({ extended: true }));

server.use(`/products/:id`, methodOverride(`_method`));

server.use(`/articles/:title`, methodOverride(`_method`));


server.use(`/products`, productsRoute);

server.use(`/articles`, articlesRoute);

server.use((err, req, res, next) => {
  console.log(err);
  res.send(`error`);
});


server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});