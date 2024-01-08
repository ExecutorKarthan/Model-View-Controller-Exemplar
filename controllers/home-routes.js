const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utilities/auth');
const renderSelector = require('../utilities/renderSelector');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );

    req.session.save(() =>{
      req.session.inDash = false;
    })

    res.render('home', {
      posts,
      loggedIn: req.session.loggedIn,
      inDash: req.session.inDash,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    req.session.save(() =>{
      req.session.inDash = true;
    })

    res.render('dashboard', {
      ...user,
      loggedIn: renderSelector(req.session.loggedIn),
      makePost: renderSelector(req.session.makePost),
      inDash: renderSelector(req.session.inDash),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/edit-post', withAuth, async (req, res) => {
  try {
    res.render('edit-form', {
      title: renderSelector(req.session.postTitle),
      body: renderSelector(req.session.postBody),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
    res.render('login');
  });

router.get('/signup', (req, res) => {
    res.render('signup');
  });

module.exports = router;
