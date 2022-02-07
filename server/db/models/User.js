const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validator: {
      isEmail: true,
		},
	},
  userSince: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  nickname: {
    type: Sequelize.STRING,
  },
  accountType: {
    type: Sequelize.ENUM('free', 'premium')
  }
});

module.exports = User;
