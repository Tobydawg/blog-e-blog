async function editFormHandler(event) {
    event.preventDefault();
  
    
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const body = document.querySelector('input[name="post-body"]').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/edit/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title, 
        body 
          
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
      alert("you're post has been edited")
    } else {
      alert("that didn't work.");
    }
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);