  //Create a function to Connect the HTML to the route
  const signupFormHandler = async (event) => {
    //Prevent the page from reloading  
    event.preventDefault();
  
    //Collect a user name and password from the form
    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (username && password) {
      //Send a the entered data to the database and and make a user
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      //if the response passes, reload the page
      if (response.ok) {
        document.location.replace('/');
      } 
      //If the response is malformed, thrown an error
      else {
        alert('Failed to sign up.');
      }
    }
  };

  //Create a listener to trigger the logout handler on click
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler); 
  