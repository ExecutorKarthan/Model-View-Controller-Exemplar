//Create a function that will load the create-post page on click
const createPostClicked = async (event) =>{
  event.preventDefault();
  document.location.replace('/dashboard/create-post');
}

//Create a function to Connect the HTML to the route
const newPostHandler = async (event) => {
    //Prevent the page from reloading
    event.preventDefault();
    //Locate and get the title and content values
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    //If there are values for the title and content, send it to the API routes to interact with the database
    if(title && content){
      const response = await fetch('/api/bpr/create-post', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      //if the response passes, reload the page
      if (response.ok) {
        document.location.replace('/dashboard');
      } 
      //If the response is malformed, thrown an error
      else {
        alert(response.statusText);
      }
    }  
  };

  //Create a function to Connect the HTML to the route
const updatePostHandler = async (event) => {
  //Prevent the page from reloading
  event.preventDefault();
  //Locate and get the title, content and ID values
  const title = document.querySelector('#update-post-title').value.trim();
  const content = document.querySelector('#update-post-content').value.trim();
  const id = document.querySelector("form").getAttribute('data_id');
  //If there are values for the title and content, send it to the API routes to interact with the database
  if(title && content){
    const response = await fetch(`/api/bpr/update-post/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content, id }),
      headers: { 'Content-Type': 'application/json' },
    });
    //if the response passes, reload the page
    if (response.ok) {
      document.location.replace('/dashboard');
    } 
    //If the response is malformed, thrown an error
    else {
      alert(response.statusText);
    }
  }  
}

const deletePostHandler = async (event) => {
  //Prevent the page from reloading
  event.preventDefault();
  //Locate the ID of the post via a query
  const id = document.querySelector("form").getAttribute('data_id');
  //Send the delete request to the API routes to interact with the database
  const response = await fetch(`/api/bpr/${id}`, {
    method: 'DELETE',
  });
  //if the response passes, reload the page
  if (response.ok) {
    document.location.replace('/dashboard');
  } 
  //If the response is malformed, thrown an error
  else {
    alert(response.statusText);
  }  
}

//Create a listener to trigger the createPost on click
if(document.querySelector('#new-post-form') != null){
  document
    .querySelector('#new-post-form')
    .addEventListener('click', createPostClicked); 
}

//Create a listener to trigger the newPost handler on click
if(document.querySelector('#create-post') != null){
  document
    .querySelector('#create-post')
    .addEventListener('click', newPostHandler); 
}

//Create a listener to trigger the updatePost handler on click
if(document.querySelector('#update-post') != null){
  document
  .querySelector('#update-post')
  .addEventListener('click', updatePostHandler); 
}

//Create a listener to trigger the deletePost handler on click
if(document.querySelector('#delete-post') != null){
  document
  .querySelector('#delete-post')
  .addEventListener('click', deletePostHandler); 
}