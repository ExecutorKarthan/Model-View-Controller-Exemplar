//Create a function to Connect the HTML to the route
const logout = async () => {
    //Fetch the endpoint for the logout
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    //if the response passes, reload the page
    if (response.ok) {
      document.location.replace('/');
    } 
    //If the response is malformed, thrown an error
    else {
      alert('Failed to log out.');
    }
  };
  
  //Create a listener to trigger the logout handler on click
  document.querySelector('#logout').addEventListener('click', logout);