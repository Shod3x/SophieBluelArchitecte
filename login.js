let loginForm = document.getElementById("login-form");

function redirectionHomePage() {
  document.location.href = "index.html";
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email_value = document.getElementById("email").value;
  const password_value = document.getElementById("password").value;

  if (email_value && password_value) {
    login(email_value, password_value)
      .then(function (response) {
        if (response.token) {
          localStorage.setItem("token", response.token);
          redirectionHomePage();
        }
      })
      .catch(function () {
        let myError = document.getElementById("error");
        myError.innerHTML = "Adresse email ou mot de passe incorrecte";
        myError.style.color = 'red';
      });
  }
});


const login = function (email, password) {
  return fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(function (response) {
        console.log('Server response:', response);
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      return response.json();
    })
    .catch(function (error) {
      console.error('Error during login:', error.message);
      throw error;
    });
};