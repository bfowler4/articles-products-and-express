module.exports = (req, res, next) => {
  let fileName = new Date().toLocaleDateString();
  let fileNameArray = fileName.split(`/`);
  fileName = `${fileNameArray[2]}.${fileNameArray[0]}.${fileNameArray[1]}.log`;
  let timeStamp = `` + new Date();
  fs.appendFile(path.join(__dirname, `..`, `logs`, fileName), `${req.method} ${req.url} ${timeStamp}\n`, (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
};

const fs = require(`fs`);
const path = require(`path`);

