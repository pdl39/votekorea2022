const Sequelize = require('sequelize');

const protocol = 'postgres';
const dbHostName = process.env.RDS_HOSTNAME || `localhost:5432`;
const dbName = process.env.RDS_DB_NAME || 'votekorea2022';
const dbUsername = process.env.RDS_USERNAME || '';
const dbPassword = process.env.RDS_PASSWORD || '';

const DB_URL = `${protocol}://${dbUsername}:${dbPassword}@${dbHostName}/${dbName}`;

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
