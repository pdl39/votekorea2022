const db = require('./db');
const User = require('./models/User');
const Category = require('./models/Category');
const Post = require('./models/Post');
const Item = require('./models/Item');
const Choice = require('./models/Choice');

// DB Model Associations
Category.hasMany(Post);
Post.belongsTo(Category);

Post.hasMany(Item);
Item.belongsTo(Post);

User.hasMany(Choice);
Choice.belongsTo(User, { foreignKey: 'userId '});

Post.hasMany(Choice);
Choice.belongsTo(Post, { foreignKey: 'postId '});

module.exports = {
  db,
  models: {
    User,
    Category,
    Post,
    Item,
    Choice
  }
};
