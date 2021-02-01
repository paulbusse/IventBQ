/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');

const logger = require('./utils/logger');

const rMain = require('./routers/main');
const rLabels = require('./routers/labels');
// eslint-disable-next-line no-unused-vars
const db = require('./models');

const app = express();

// setup the logger
app.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent :response-time ms"',
  { stream: logger.stream }));

app.use(express.json());
app.use('/', rMain);
app.use('/labels', rLabels);

const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () => {
  console.log(`listening on ${port}`);
});
