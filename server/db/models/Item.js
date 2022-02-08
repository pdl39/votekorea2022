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
  },
  itemOrder: {
    type: Sequelize.INTEGER
  }
});

module.exports = Item;
