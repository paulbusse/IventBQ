const Sequelize = require('sequelize');
const logger = require('../utils/logger');

const Label = require('./labels');
const Place = require('./places');
const Item = require('./items');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

/*
 * This function validates if the software is aligned with the database version.
 */
async function isDbUptodate(sequelize, wanted) {
  const latest = await sequelize.query('SELECT * FROM sequelizemeta ORDER BY name DESC LIMIT 1;', {
    type: sequelize.QueryTypes.SELECT,
  });

  const lName = latest[0].name;
  const timestamp = lName.substring(0, lName.indexOf('-'));

  if (timestamp !== wanted) {
    logger.error(`FATAL: database version (${timestamp}) not matching with expected database version(${wanted})!`);
    logger.info('Did you run the migrate script? See install documentation');
    process.exit(1);
  }
}

/*
 * Setup the DB
 */

const db = {};

config.logging = (msg) => logger.stream.write(msg);

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config);
}

isDbUptodate(sequelize, '20210302065850');

const models = { Place, Label, Item };

Object.values(models).forEach((element) => element.init(sequelize));
Object.values(models).forEach((element) => {
  if (typeof element.associate === 'function') element.associate(models);
});

module.exports = db;
