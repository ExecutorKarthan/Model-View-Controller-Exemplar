const adjustPost = (req, res, next, make_post) => {
    // If the user is not logged in, redirect the request to the login route
    if (make_post) {
      res.render('dashboard', {  
        make_post: true
      });
    } else {
      next();
    }
  };
  
  module.exports = adjustPost;  