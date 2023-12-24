var UserID = sessionStorage.getItem('id');

if (UserID != null){
  const api_url = `http://{{SERV_IP}}:5000/account/${UserID}`;

  document.addEventListener('DOMContentLoaded', function() {
      fetch(api_url)
          .then(response => response.json())
          .then(data => {
              let tagA = document.getElementById("data");
              tagA.textContent = `Здравтсвуйте, господин ${data.nickname}`;

              let divFavorites = document.getElementById("favorites");
              data.favorites.forEach((item, index) => {
                tagA = document.createElement("a");
                tagA.textContent = `${index+1}. ${item.brand} ${item.model}, ${item.year} (${item.href})`;
                divFavorites.appendChild(tagA);
                divFavorites.appendChild(document.createElement("br"));
              });
          })
          .catch(error => {
              console.error('Error fetching list:', error);
          });
  });
}
else{
  location.href = 'http://{{SERV_IP}}:3000/src/pages/login.html';
}