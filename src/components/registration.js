const form = document.getElementById('registrationForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  fetch('http://localhost:5000/registration', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => registration(data))
  .catch(error => console.error(error));
});

function registration(data){
    console.log(data)
    let name = data.username.toString()
    let message = data.message.toString()
    if (message == ''){
       location.href = 'login.html';
       console.log(name)
    }
    else{
       let HTMLData = `<p>Error: ${data.message}</p>`
       document.getElementById("data").innerHTML = HTMLData
       console.log("NOT GOOD")
    }
}