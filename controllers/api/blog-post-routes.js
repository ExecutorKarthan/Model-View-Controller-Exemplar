//Import required libraries
const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utilities/auth');

//Create a route to generate new posts
router.post('/create-post', withAuth, async (req, res) => {
  try {
    //Create a Date object to track when this post was made
    const createdDate = new Date();
    //Create the post in the database
    const newPost = await Post.create({
      title: req.body.title,
      posted_date: createdDate,
      body: req.body.content,
      user_id: req.session.user_id
    });
    //Return the status and json of the database entry
    res.status(200).json(newPost);
    //If there is an error, return the error code
  } catch (err) {
    res.status(400).json(err);
  }
});

//Create a route to update previously made posts
router.put('/update-post/:id', withAuth, async (req, res) => {
  try {
    //Locate post based on post ID and then update it with a new title and body
    const postUpdate = await Post.update({
      title: req.body.title,
      body: req.body.content,},
      {
      where: {
        id: req.body.id,
      }
    });
    //Return the status and json of the database entry
    res.status(200).json(postUpdate)
  //If there is an error, return the error code
  } catch (err) {
    res.status(400).json(err);
  }
});

//Create a route that allows for use to add comments to posts
router.put('/add-comment/:id', withAuth, async (req, res) => {
  try {
    //Create a date then format it appropriately
    let date = new Date();
    date = date.toLocaleDateString()
    //Obtain user data based on the user's ID
    const userData = await User.findByPk(req.session.user_id)
    //Obtain post data based on the post's ID
    const postData = await Post.findByPk(req.body.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    })
    //Save the current comments
    let oldComments = postData.comments
    //Save the newly formatted signature of the commenter
    let newComment = `${req.body.content} \n -${userData.username}, ${date};`
    //Check if the old comments have a value - if they don't assign the new comment but if they do add them to the current string
    if(oldComments == null){
      oldComments = newComment;
    }
    else{
      oldComments = oldComments + newComment;
    }
    //Update the post's comments with the newly appended comment
    const postUpdate = await Post.update({
      comments: oldComments,
      },
      {
      where: {
        id: req.body.id,
      }
    });
    //Return the status and json of the database entry
    res.status(200).json(postUpdate)
  //If there is an error, return the error code
  } catch (err) {
    res.status(400).json(err);
  }
});

//Create a route to delete posts by their IDs
router.delete('/:id', withAuth, async (req, res) => {  
  try {
    //Destroy the post based on its id
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    //If not post exists, not this to the user
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    //Return the status and json of the database entry
    res.status(200).json(postData);
  //If there is an error, return the error code
  } catch (err) {
    res.status(500).json(err);
  }
});
//Export the router
module.exports = router;
