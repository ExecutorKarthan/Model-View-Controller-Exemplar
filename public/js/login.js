//Create a function to Connect the HTML to the route
const loginFormHandler = async (event) => {
  //Prevent the page from reloading  
  event.preventDefault();
  
    //Collect a user name and password from the form
    const username = document.querySelector('#username-entered').value.trim();
    const password = document.querySelector('#password-entered').value.trim();

    if (username && password) {
      //Send a the entered data to the database and see if it matches the user
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      //if the response passes, reload the page to the dashboard
      if (response.ok) {
        document.location.replace('/dashboard');
      } 
      //If the response is malformed, thrown an error
      else {
        alert('Failed to log in');
      }
    }
  };
  
  //Create a listener to trigger the login handler on click
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler); 