const form = document.getElementById('FormChanges');
const UserID = sessionStorage.getItem('id');
if (form != null && UserID != null){
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      fetch(`http://localhost:5000/account/${UserID}/changeParams`, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => changeParams(data))
      .catch(error => console.error(error));
    });
}

function changeParams(data){
  console.log(data.message);
  if (data.message == ""){
    location.href = 'http://localhost:8000/src/pages/account.html';
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