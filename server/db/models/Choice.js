const Sequelize = require('sequelize');
const db = require('../db');

const Choice = db.define('choice', {
  chosenItemId: {
    type: Sequelize.INTEGER,
    defaultValue: false
  }
});

module.exports = Choice;
