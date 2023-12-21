var nickname = sessionStorage.getItem('nickname');
var login = sessionStorage.getItem('login');

if (nickname != null && login != null){
  var urlString = window.location.href;
  var url = new URL(urlString);
  var id = url.searchParams.get("id");
  const api_url = `http://localhost:5000/account/${id}`;

  document.addEventListener('DOMContentLoaded', function() {
      fetch(api_url)
          .then(response => response.json())
          .then(data => {
              let tagA = document.getElementById("data");
              tagA.textContent = `Здравтсвуйте, господин ${data.username}`;
          })
          .catch(error => {
              console.error('Error fetching list:', error);
          });
  });
}
else{
  location.href = 'http://localhost:8000/src/pages/login.html';
}