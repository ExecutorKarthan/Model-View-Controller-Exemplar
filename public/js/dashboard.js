const createPostClicked = async (event) =>{
  event.preventDefault();
  console.log("+New Post button clicked")
  const response = await fetch('/api/bpr/', {
    method: 'GET',
  });
  console.log(response)
  if (response.ok) {
    document.location.replace('/api/bpr/');
  } 
}

const newPostHandler = async (event) => {
    event.preventDefault();
    console.log("Create button clicked")
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if(title && content){
      const response = await fetch('/bpr', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response)
      if (response.ok) {
        document.location.replace('/');
      } 
      else {
        alert(response.statusText);
      }
    }  
  };
  
  if(document.querySelector('#new-post-form') != null){
    console.log("New post button found")
    document
    .querySelector('#new-post-form')
    .addEventListener('click', createPostClicked); 
  }

  if(document.querySelector('#create-post') != null){
    document
    .querySelector('#create-post')
    .addEventListener('submit', newPostHandler); 
  }