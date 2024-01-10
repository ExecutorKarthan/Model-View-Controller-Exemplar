//Import needed dependencies
const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utilities/auth');

//Create an endpoint at the root to extract post data and display it for the user
router.get('/', async (req, res) => {
  try {
    //Collect all the post data then parse it to get the plain data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ]
    });
    const posts = postData.map((post) =>
      post.get({ plain: true })
    );
    //Render the homepage with the posts and logged variable
    res.render('home', {
      posts,
      loggedIn: req.session.loggedIn,
    });
    //If there is an error, return the error code
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Create an endpoint that retrieves posts by their IDs
router.get('/post/:id', async (req, res) => {
  try {
    //Collect a post by its given ID value
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ]
    })
    //Process the data into plain values
    const post = postData.get({plain: true});
    const user = postData.user
    //Split the comments into an array to be rendered
    post.comments = post.comments.split(";")
    //Render each post with its comments
    res.render('single-post', {
      user,
      post,
      loggedIn: req.session.loggedIn,
    });
    //If there is an error, return the error code
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create an endpoint that allows users to see, edit and delete their posts
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    //Process the user data into plain values
    const user = userData.get({ plain: true });
    //Pull the post data from the user variable
    const posts = user.posts
    //Render the dashboard with a list of the user's posts
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
    //If there is an error, return the error code
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create an endpoint that allows users to create posts
router.get('/dashboard/create-post', withAuth, async (req, res) => {
  try {
    //Render the page to make posts
    res.render('create-post',{
      loggedIn: req.session.loggedIn,
    });
    //If there is an error, return the error code
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create an endpoint that allows for users to edit their posts
router.get('/dashboard/edit-post/:id', withAuth, async (req, res) => {
  try {
    //Locate the post data by its ID values
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        }
      ]
    })
    //Process the data into plain values
    const post = postData.get({plain: true});
    //Render the form to allow users to edit their posts
    res.render('edit-form', {
      post,
    });
    //If there is an error, return the error code
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create an endpoint that allows people to log into the website
router.get('/login', (req, res) => {
  if(req.session.loggedIn){
    res.redirect('/dashboard')
  }
  res.render('login');
  });

//Create an endpoint that allows people to sign up for the website
router.get('/signup', (req, res) => {
    res.render('signup');
  });

//Export the newly adjusted router
module.exports = router;
