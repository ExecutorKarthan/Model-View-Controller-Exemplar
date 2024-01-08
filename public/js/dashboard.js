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

const updatePostClicked = async (event) =>{
  console.log("Update post was clicked")

  const id = event.target.getAttribute('data_id');
  
  const response = await fetch(`/api/bpr/edit-form`, {
    method: 'POST',
    body: JSON.stringify({id}),
    headers: {'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard/edit-post');
  } 
  else {
    alert(response.statusText);
  }
};

const updatePostHandler = async (event) => {
  event.preventDefault();
  
  const title = document.querySelector('#update-post-title').value.trim();
  const content = document.querySelector('#update-post-content').value.trim();
  const id = document.querySelector("form").getAttribute('data_id');

  console.log(title, content, id)

  if(title && content){
    const response = await fetch('/api/bpr/update-post', {
      method: 'PUT',
      body: JSON.stringify({ title, content, id }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
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
  const id = document.querySelector("form").getAttribute('data_id');

  console.log(`/api/bpr/${id}`)

  const response = await fetch(`/api/bpr/${id}`, {
    method: 'DELETE',
  });

  console.log(response)

  if (response.ok) {
    document.location.replace('/dashboard');
  } 
  else {
    alert(response.statusText);
  }  
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

if(document.querySelector('.update-link') != null){
  const buttonList = document.querySelectorAll('.update-link')
  buttonList.forEach((buttonItem) =>{
    buttonItem.addEventListener('click', updatePostClicked)
  })
}

if(document.querySelector('#update-post') != null){
  document
  .querySelector('#update-post')
  .addEventListener('click', updatePostHandler); 
}

if(document.querySelector('#delete-post') != null){
  document
  .querySelector('#delete-post')
  .addEventListener('click', deletePostHandler); 
}