const path = require('path');
const Sequelize = require('sequelize');
const appDir = require('fs').realpathSync(process.cwd());

const dbName = process.env.DB_NAME || 'votekorea2022';
const dbUrl = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`;

const config = {
  logging: false
};

if(process.env.LOGGING === 'true') {
  delete config.logging
}

if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const db = new Sequelize(dbUrl, config);

module.exports = db;
