const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utilities/auth');

router.post('/post-form', withAuth, async (req, res) =>{
  try{
    req.session.save(() => {
      req.session.makePost = true;
    });

    res
    .status(200)
    .render('dashboard', {
      makePost: req.session.makePost,
    });
  }
  catch{
    console.log(err);
    res.status(500).json(err);
  }
})

router.post('/create-post', withAuth, async (req, res) => {
  try {
    const createdDate = new Date();
    const newPost = await Post.create({
      title: req.body.title,
      posted_date: createdDate,
      body: req.body.content,
      user_id: req.session.user_id
    });

    req.session.save(() => {
      req.session.makePost = false;
    });

    res.status(200).render('dashboard', {
      makePost: req.session.makePost,
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/edit-form', withAuth, async (req, res) => {
  try {

    const postData = await Post.findByPk(req.body.id, {
    });

    const post = postData.get({ plain: true });

    req.session.save(() => {
      req.session.postTitle = post.title;
      req.session.postBody = post.body;
    });

    console.log(post)

    res.render('edit-form', {
      title: post.title,
      body: post.body,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/update-post', withAuth, async (req, res) => {
  try {
    const createdDate = new Date();
    console.log(req.body)

    const postUpdate = await Post.update({
      title: req.body.title,
      body: req.body.body,

      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });



    res.status(200).render('dashboard', {
      
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/:id', withAuth, async (req, res) =>{
  try{
    req.session.save(() => {
      req.session.updatePost = true;
    });

    res
    .status(200)
    .render('dashboard', {
      updatePost: req.session.updatePost,
    });
  }
  catch{
    console.log(err);
    res.status(500).json(err);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
