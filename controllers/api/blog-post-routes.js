const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utilities/auth');

router.post('/create-post', withAuth, async (req, res) => {
  try {
    const createdDate = new Date();
    const newPost = await Post.create({
      title: req.body.title,
      posted_date: createdDate,
      body: req.body.content,
      user_id: req.session.user_id
    });


    res.status(200).json(newPost);

  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/update-post/:id', withAuth, async (req, res) => {
  try {

    const createdDate = new Date();

    const postUpdate = await Post.update({
      title: req.body.title,
      body: req.body.content,},
      {
      where: {
        id: req.body.id,
      }
    });

    res.status(200).json(postUpdate)

  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/add-comment/:id', withAuth, async (req, res) => {
  try {

    let date = new Date();
    date = date.toLocaleDateString()

    const userData = await User.findByPk(req.session.user_id)

    const postData = await Post.findByPk(req.body.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    })

    let oldComments = postData.comments

    let newComment = `${req.body.content} \n -${userData.username}, ${date};`

    if(oldComments == null){
      oldComments = newComment;
    }
    else{
      oldComments = oldComments + newComment;
    }

    const postUpdate = await Post.update({
      comments: oldComments,
      },
      {
      where: {
        id: req.body.id,
      }
    });

    res.status(200).json(postUpdate)

  } catch (err) {
    res.status(400).json(err);
  }
});

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
