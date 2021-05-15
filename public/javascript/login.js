const loginFormHandler = async function(event){

// async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  console.log(username, password);
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
        alert("You are now logged in.")
      } else {
        alert(response.statusText);
      }
    }
  }
  
   document.querySelector('#login-form').addEventListener('submit', loginFormHandler);


//   async function signupFormHandler(event) {
//     event.preventDefault();
  
//     const username = document.querySelector('#username-login').value.trim();
    
//     const password = document.querySelector('#password-login').value.trim();
  
//     if (username && password) {
//       const response = await fetch('/api/users/', {
//         method: 'post',
//         body: JSON.stringify({
//           username,
//           password
//         }),
//         headers: { 'Content-Type': 'application/json' }
//       });
  
//       if (response.ok) {
//         document.location.replace('/dashboard/');
//       } else {
//         alert(response.statusText);
//       }
//     }
//   }
  
//   document.querySelector('.login-form').addEventListener('submit', loginFormHandler);