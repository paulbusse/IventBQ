const Sequelize = require('sequelize');
const logger = require('../utils/logger');

const Label = require('./labels');
const Place = require('./places');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const db = {};

config.logging = (msg) => logger.stream.write(msg);

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config);
}

Place.init(sequelize);
Label.init(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function isDbUptodate(wanted) {
  const latest = await sequelize.query('SELECT * FROM sequelizemeta ORDER BY name DESC LIMIT 1;', {
    type: sequelize.QueryTypes.SELECT,
  });

  const lName = latest[0].name;
  const timestamp = lName.substring(0, lName.indexOf('-'));

  /*
   * At this moment there are no requests being handled so we can exit
   */
  if (timestamp !== wanted) {
    logger.error(`FATAL: database version (${timestamp}) not matching with expected database version(${wanted})!`);
    logger.info('Did you run the migrate script? See install documentation');
    process.exit(1);
  }
}

isDbUptodate('20210218083610');

module.exports = db;
