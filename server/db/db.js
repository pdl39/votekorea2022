const Sequelize = require('sequelize');

const protocol = 'postgres';
const dbHostName = process.env.RDS_HOSTNAME || `localhost`;
const dbPort = process.env.RDS_PORT || 5432;
const dbName = process.env.RDS_DB_NAME || 'votekorea2022';
const dbUsername = process.env.RDS_USERNAME || '';
const dbPassword = process.env.RDS_PASSWORD || '';

const DB_URL = `${protocol}://${dbHostName}:${dbPort}/${dbName}?user=${dbUsername}&password=${dbPassword}`;

// const config = {
//   logging: false
// };

// if(process.env.LOGGING === 'true') {
//   delete config.logging
// }

// if(process.env.DATABASE_URL){
//   config.dialectOptions = {
//     ssl: {
//       rejectUnauthorized: false
//     }
//   };
// }

const db = new Sequelize(DB_URL);

module.exports = db;
