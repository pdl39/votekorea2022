const Sequelize = require('sequelize');

const dbHost = process.env.RDS_HOSTNAME || `localhost:5432`;
const dbName = process.env.RDS_DB_NAME || 'votekorea2022';
const dbPort = process.env.RDS_PORT || 5432;
const dbUser = process.env.RDS_USERNAME || '';
const dbPassword = process.env.RDS_PASSWORD || '';

const config = {
  host: dbHost,
  port: dbPort,
  logging: console.log,
  maxConcurrentQueries: 100,
  dialect: 'postgres',
  pool: { maxConnections: 5, maxIdleTime: 30},
  language: 'en'
};

const db = new Sequelize(dbName, dbUser, dbPassword, config);

module.exports = db;
