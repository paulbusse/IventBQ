const logger = require('./logger');

const errList = {
  E1: 'Aanmaak van artikelen',
  E2: 'Ophalen van artikelen',
};

function errorStringHandler(error) {
  return error.toString().substring(error.name.length + 2);
}

function handler(label, error) {
  const msg = {};
  msg.summary = errList[label];
  switch (error.name) {
    case 'SequelizeDatabaseError':
      msg.code = `${label}-${error.original.code}`;
      msg.detail = errorStringHandler(error);
      break;
    case 'SequelizeForeignKeyConstraintError':
      msg.code = `${label}-${error.original.code}`;
      msg.detail = error.message;
      break;
    case 'IvtsError':
      msg.code = `${label}-${error.code}`;
      msg.detail = error.detail;
      break;
    default:
      msg.detail = 'unknown error: please file a bug report.';
      logger.info(`Unhandled error: [${error.name}] ${error}`);
      break;
  }
  logger.info(JSON.stringify(msg) + JSON.stringify(error));
  return msg;
}

module.exports = handler;

/*
logger.debug(error);
        console.log(error);
        const noterr = error.errors[0];
        const err = {
          code: 'CI1',
          message: noterr.message,
          path: noterr.path,
          value: noterr.value,
        };
        */
