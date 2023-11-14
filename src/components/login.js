const form = document.getElementById('loginForm');
if (form != null){
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      fetch('http://localhost:5000/login', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => login(data))
      .catch(error => console.error(error));
    });
}
function login(data){
    console.log(data)
    let name = data.username.toString()
    if (name != ''){
       location.href = 'account.html';
       console.log("GOOD")
    }
    else{
       let HTMLData = `<p>Error: ${data.message}</p>`
       document.getElementById("data").innerHTML = HTMLData
       console.log("NOT GOOD")
    }
}
