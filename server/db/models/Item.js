const Sequelize = require('sequelize');
const db = require('../db');

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
  imageUrl: {
    type: Sequelize.STRING,
  },
  bgColor: {
    type: Sequelize.STRING,
    defaultValue: '#7F8E93' // oslo gray
  },
  itemOrder: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false
  },
  isValid: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Item;
