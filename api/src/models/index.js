const Sequelize = require('sequelize');
const logger = require('../utils/logger');

const Place = require('./place');
const Label = require('./label');

const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../config/db.json`)[env];
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

sequelize.sync({ alter: true });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
