/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const logger = require('./utils/logger');

const rMain = require('./routers/main');
const rLabels = require('./routers/labels');
// eslint-disable-next-line no-unused-vars
const db = require('./models');
const IvtsError = require('./classes/ivtserror');
const { errStatus, errHandler, expressErrHandler } = require('./utils/error');

const app = express();
app.use(cors());

// setup the logger
app.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent :response-time ms"',
  { stream: logger.stream }));

app.use(express.json());
app.use('/', rMain);
app.use('/labels', rLabels);
app.use(express.static('public'));

// Must be last: catches unknown URLs
// eslint-disable-next-line no-unused-vars
app.use((req, res, _next) => {
  const msg = new IvtsError('IE15');
  const status = errStatus(msg);
  res.status(status).json(errHandler('E0', msg));
});
app.use((err, req, res, next) => {
  if (err) {
    logger.error(JSON.stringify(err));
    res.status(err.status).json(expressErrHandler('E0', err));
    console.log(err);
  }
  /* if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send({ status: 404, message: err.message }); // Bad request
    } */
  next();
});

const port = process.env.PORT || 4000;
app.listen(port, '0.0.0.0', () => {
  logger.info(`listening on ${port}`);
});
