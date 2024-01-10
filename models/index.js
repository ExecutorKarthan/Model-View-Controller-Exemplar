//Import required dependencies 
const User = require('./User');
const Post = require('./Post');

//Create an association where users can have multiple posts
//If a user is deleted, it will delete all the posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

//Create an association where posts belong to users
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

//Export the models for use
module.exports = { User, Post};
