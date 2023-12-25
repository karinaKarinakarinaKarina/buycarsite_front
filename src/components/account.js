var UserID = sessionStorage.getItem('id');

if (UserID != null){
  const api_url = `http://localhost:5000/account/${UserID}`;

  document.addEventListener('DOMContentLoaded', function() {
      fetch(api_url)
          .then(response => response.json())
          .then(data => {
              let spanName = document.getElementById("user_name");
              spanName.textContent = `${data.nickname}`;
          })
          .catch(error => {
              console.error('Error fetching list:', error);
          });
      const buttonLogout = document.getElementById("logout_button");
      buttonLogout.addEventListener('click', function() {
        sessionStorage.removeItem('id');
        location.href = 'http://localhost:8000/index.html';
      });
  });
}
else{
  location.href = 'http://localhost:8000/src/pages/login.html';
}