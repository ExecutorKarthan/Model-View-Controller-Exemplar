const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utilities/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );

    res.render('home', {
      posts,
      loggedIn: req.session.loggedIn,
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
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
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
