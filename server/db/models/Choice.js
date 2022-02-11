const Sequelize = require('sequelize');
const db = require('../db');
const Post = require('./Post');
const User = require('./User');
const newErr = require('../../utils/newErr');

const Choice = db.define('choice', {
  chosenItemId: {
    type: Sequelize.INTEGER,
  }
});

module.exports = Choice;

// hooks
const ensureUniqueChoice = async choice => {
  try {
    const user = await User.findByPk(choice.userId);
    const post = await Post.findByPk(choice.postId);
    const existingChoice = await Choice.findOne({
      where: {
        userId: user.id,
        postId: post.id
      }
    });
    if (existingChoice && existingChoice.chosenItemId) {
      throw newErr(`choice_exists`, 400);
    }
  }
  catch(err) {
    throw err;
  }
}

Choice.beforeCreate(ensureUniqueChoice);
