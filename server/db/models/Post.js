const Sequelize = require('sequelize');
const db = require('../db');

const Post = db.define('post', {
  postedDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
  }
});

module.exports = Post;
