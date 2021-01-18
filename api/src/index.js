/* eslint-disable no-console */
const express = require('express');
const router = require('./routers/router');
// eslint-disable-next-line no-unused-vars
const db = require('./models');

const app = express();

app.use(express.json());
app.use('/', router);

const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () => {
  console.log(`listening on ${port}`);
});
