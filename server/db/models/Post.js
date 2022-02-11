const Sequelize = require('sequelize');
const db = require('../db');

const Post = db.define('post', {
  title: {
    type: Sequelize.STRING,
  }
});

module.exports = Post;
