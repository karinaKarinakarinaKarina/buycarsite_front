const form = document.getElementById('loginForm');
if (form != null){
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      fetch('http://{{SERV_IP}}:5000/login', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => login(data))
      .catch(error => console.error(error));
    });
}
function login(data){
    if (data.id != null){
      sessionStorage.setItem('id', data.id);
      location.href = 'http://{{SERV_IP}}:3000/';
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