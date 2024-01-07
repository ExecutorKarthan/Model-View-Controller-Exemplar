const createPostClicked = async (event) =>{
  event.preventDefault();
  console.log("+New Post button clicked")
  const response = await fetch('/api/bpr/post-form', {
    method: 'POST',
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/dashboard');
    } 
}

const newPostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    if(title && content){
      const response = await fetch('/api/bpr/create-post', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } 
      else {
        alert(response.statusText);
      }
    }  
  };

  const updatePostHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#update-post-title').value.trim();
    const content = document.querySelector('#update-post-content').value.trim();

    if(title && content){
      const response = await fetch('/api/bpr/update-post', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } 
      else {
        alert(response.statusText);
      }
    }  

  }

  const deletePostHandler = async (event) => {
    event.preventDefault();
  }
  
  if(document.querySelector('#new-post-form') != null){
    document
    .querySelector('#new-post-form')
    .addEventListener('click', createPostClicked); 
  }

  if(document.querySelector('#create-post') != null){
  
    document
    .querySelector('#create-post')
    .addEventListener('click', newPostHandler); 
  }

  if(document.querySelector('#update-post') != null){
    console.log("Update button found")
    document
    .querySelector('#update-post')
    .addEventListener('click', createPostClicked); 
  }

  if(document.querySelector('#delete-post') != null){
    console.log("Delete button found")
    document
    .querySelector('#delete-post')
    .addEventListener('click', newPostHandler); 
  }