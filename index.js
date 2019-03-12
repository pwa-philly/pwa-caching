const express = require('express');
const sslRedirect = require('final/utils/sslRedirect');

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

if (env === 'production') {
  app.use(sslRedirect());
}

app.use(express.static('./final'));

app.listen(port, () => console.log(`App listening on ${port}!`)); // eslint-disable-line
