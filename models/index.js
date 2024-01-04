const User = require('./User');
const Post = require('./Post');

User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(Gallery, {
  foreignKey: 'user_id',
});

module.exports = { User, Post,};
