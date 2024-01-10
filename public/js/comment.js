//Define a function to connect the HTML to the route
const addComment = async (event) => {
    //Prevent the webpage from reloading
    event.preventDefault();
    //Locate and get the ID and content values
    const id = document.querySelector("section").getAttribute('post_id');
    const content = document.querySelector('#comment-body').value.trim();
    //If there is a value for the comment, send it to API routes to interact with the database
    if(content){
      const response = await fetch(`/api/bpr/add-comment/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ content, id }),
        headers: { 'Content-Type': 'application/json' },
      });
      //if the response passes, reload the page
      if (response.ok) {
        document.location.replace(`/post/${id}`);
      } 
      //If the response is malformed, thrown an error
      else {
        alert(response.statusText);
      }
    }  
  }

//Create a listener to trigger the addComment on click
if(document.querySelector('#submit-comment') != null){
  document
    .querySelector('#submit-comment')
    .addEventListener('click', addComment); 
  }