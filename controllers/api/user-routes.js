//Import needed dependencies
const router = require('express').Router();
const { User } = require('../../models');

//Create a new user who signed up
router.post('/', async (req, res) => {
  try {
    //Create a new user in the database from the submitted data
    const dbUserData = await User.create(
      req.body
    );
    //Save the session data and return the data after the database is updated
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;
      res
      .status(200)
      .json(dbUserData)
    });
  //If there is an error, return the error code
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Log the user in
router.post('/login', async (req, res) => {
  try {
    //Retrieve the user's data based ont heir submitted username
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    //If no user data is found, notify the user
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    //Check to see if the password fits the requirements
    const validPassword = await dbUserData.checkPassword(req.body.password);
    //If the password is invalid, note it and prompt the user to make a new one
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    //Save the session data and return the data after the database is updated
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;
      res
      .status(200)
      .json(dbUserData)
    });
  //If there is an error, return the error code
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a route to end the session for a user
router.post('/logout', (req, res) => {
  //Check to see if the user is logged in - if so, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//Export the newly adjusted router
module.exports = router;
