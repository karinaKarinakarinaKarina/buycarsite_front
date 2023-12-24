const form = document.getElementById('registrationForm');

if (form != null){
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      fetch('http://{{SERV_IP}}:5000/registration', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => registration(data))
      .catch(error => console.error(error));
    });
}
function registration(data){
    let name = data.nickname;
    if (name != ''){
       location.href = 'http://{{SERV_IP}}:3000/src/pages/login.html';
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