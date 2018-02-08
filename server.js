const express = require(`express`);
const server = express();
const exphbs = require(`express-handlebars`);
const bodyParser = require('body-parser');
const methodOverride = require(`method-override`);
const { logRequest } = require(`./utilities/serverModules`);
const lyrics = require(`./resources/lyrics`);
const handlebars = exphbs.create({
  defaultLayout: `main`, 
  extname: `.hbs`,
  helpers: {
    doLyrics: () => { 

     server.locals.lyrics = lyrics[Math.floor(Math.random() * lyrics.length)];
    }
  }
});

const PORT = process.env.PORT || 8080;

const productsRoute = require(`./routes/productsRoute`);
const articlesRoute = require(`./routes/articlesRoute`);

server.engine(`.hbs`, handlebars.engine);
server.set(`view engine`, `.hbs`);
server.use(logRequest);
server.use(bodyParser.urlencoded({ extended: true }));

server.use(`/products/:id`, methodOverride(`_method`));

server.use(`/articles/:title`, methodOverride(`_method`));


server.use(`/products`, productsRoute);

server.use(`/articles`, articlesRoute);

server.get(`/css/styles.css`, (req, res) => {
  res.sendFile(__dirname + `/css/styles.css`);
})

server.get(`/resources/:path`, (req, res) => {
  res.sendFile(__dirname + `/resources/${req.params.path}`);
})

server.use((err, req, res, next) => {
  console.log(err);
  res.send(`error`);
});


server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});