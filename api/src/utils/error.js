const logger = require('./logger');

const errList = {
  E0: 'Systeem boodschap',
  E1: 'Aanmaak van artikelen',
  E2: 'Ophalen van artikelen',
  E3: 'Aanmaak van plaatsen',
  E4: 'Wijzigen van artikelen',
  E5: 'Ophalen van etiketten',
};

const xdb2ui = {
  description: 'omschrijving',
  label: 'naam',
};

function db2ui(field) {
  if (xdb2ui[field]) return xdb2ui[field];
  logger.info(`No UI translation for ${field}.`);
  return field;
}

function errorStringHandler(error) {
  return error.toString().substring(error.name.length + 2);
}

function sequelizeValidationErrorHandler(partialMsg, label, error) {
  const msg = partialMsg;
  switch (error.validatorKey) {
    case 'isNull':
      msg.code = `${label}-NOTNULL`;
      msg.detail = `${db2ui(error.path)} is een verplicht veld.`;
      break;
    case 'notEmpty':
      msg.code = `${label}-EMPTY`;
      msg.detail = `${db2ui(error.path)} mag niet leeg zijn.`;
      break;
    default:
      msg.code = `${label}-INTERNAL`;
      msg.detail = 'unknown error: please file a bug report.';
      logger.info(`Unhandled error: [${error.name}] ${error}`);
      break;
  }
  return msg;
}

function errStatus(error) {
  let status;
  switch (error.name) {
    case 'SequelizeTimeoutError':
      status = 500;
      break;
    case 'SequelizeUniqueConstraintError':
      status = 422;
      break;
    case 'SequelizeValidationError':
      if (error.code.split('-')[1] === 'INTERNAL') status = 500;
      else status = 400;
      break;
    case 'IvtsError':
      status = error.status;
      break;
    default:
      status = 500;
      break;
  }

  return status;
}

function errHandler(label, error) {
  let msg = {};
  switch (error.name) {
    case 'SequelizeDatabaseError':
      msg.code = `${label}-${error.original.code}`;
      msg.detail = errorStringHandler(error);
      break;
    case 'SequelizeForeignKeyConstraintError':
      msg.code = `${label}-FOREIGNKEY`;
      msg.detail = error.message;
      break;
    case 'SequelizeTimeoutError':
      msg.code = `${label}-DATABASE`;
      msg.detail = 'Er is geen toegang tot de databank.';
      break;
    case 'SequelizeUniqueConstraintError': {
      const err = error.errors[0];
      msg.code = `${label}-UNIQUE`;
      msg.detail = `${err.value} bestaat al.`;
      break;
    }
    case 'SequelizeValidationError':
      msg = sequelizeValidationErrorHandler(msg, label, error.errors[0]);
      break;
    case 'IvtsError':
      msg = error.externalize();
      msg.code = `${label}-${error.code}`;
      break;
    default:
      msg.code = `${label}-INTERNAL`;
      msg.detail = 'unknown error: please file a bug report.';
      logger.info(`Unhandled error: [${error.name}] ${error}`);
      break;
  }
  msg.summary = errList[label];
  logger.info(JSON.stringify(msg) + JSON.stringify(error));
  return msg;
}

function expressErrHandler(label, error) {
  const msg = {};
  switch (error.type) {
    case 'entity.parse.failed':
      msg.code = `${label}-PARSE`;
      msg.detail = 'De request body cannot be parsed';
      break;
    default:
      msg.code = `${label}-INTERNAL`;
      msg.detail = 'unknown error: please file a bug report.';
      logger.info(`Unhandled error: ${error}`);
      break;
  }
  msg.summary = errList[label];
  return msg;
}

module.exports = { errHandler, errStatus, expressErrHandler };
