const Sequelize = require('sequelize');
const db = require('../db');

const Choice = db.define('choice', {
  chosen: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Choice;
