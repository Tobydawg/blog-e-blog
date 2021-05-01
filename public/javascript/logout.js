function logout() {
 
    fetch('/api/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
    })
    .then(function(){
        document.location.replace('/');
        alert("Goodbye")
    })
    .catch(err => {
        console.log(err);
    })
  }
  
  document.querySelector("#logout").addEventListener('click', logout);