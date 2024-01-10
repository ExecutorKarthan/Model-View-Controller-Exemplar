const addComment = async (event) => {
    event.preventDefault();
    
    const id = document.querySelector("section").getAttribute('post_id');
    const content = document.querySelector('#comment-body').value.trim();
  
    if(content){
      const response = await fetch(`/api/bpr/add-comment/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ content, id }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace(`/post/${id}`);
      } 
      else {
        alert(response.statusText);
      }
    }  
  }

  if(document.querySelector('#submit-comment') != null){
    document
    .querySelector('#submit-comment')
    .addEventListener('click', addComment); 
  }