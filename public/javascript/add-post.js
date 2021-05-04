async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value; //
    const body = document.querySelector('input[name="post-url"]').value;//changed from post_text
    
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,   //
        body,   //
        ///
        
      }),
      headers: {
        'Content-Type': 'application/json',
        
      }
    });
  console.log(response);
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);