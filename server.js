let Bundler = require('parcel-bundler');
let express = require('express');
var proxy = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');

let bundler = new Bundler('./src/index.html');
let app = express();

app.use(
  proxy('/api', {
    target: 'https://api.github.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // rewrite path
    },
  }),
);
app.use(bundler.middleware());
app.use(history());

app.listen('1234');
