const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  kakaoUuid: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false
  },
  phoneNumber: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
		unique: true,
		validator: {
      isEmail: true
		}
	},
  nickname: {
    type: Sequelize.STRING
  },
  accountType: {
    type: Sequelize.ENUM('free', 'premium'),
    defaultValue: 'free'
  }
});

module.exports = User;
