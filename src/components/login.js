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
       location.href = 'http://localhost:8000/';
    }
    else{
      while (document.getElementById("errorText") != null){
        document.getElementById("errorText").remove();
       }
       let tagA = document.createElement("a");
       tagA.id = "errorText";
       tagA.textContent = `${data.message}`
       document.getElementById("error").appendChild(tagA);
    }
}