const form = document.getElementById('FormChanges');
const UserID = sessionStorage.getItem('id');
if (UserID != null){
  let divAcc = document.getElementById("account");
  let aAcc = document.createElement('a');
  aAcc.href = `http://{{SERV_IP}}:3000/src/pages/account.html?id=${UserID}`;
  aAcc.classList.add("firstAccount-icon");
  let aBack = document.createElement('a');
  aBack.textContent = "Назад";
  aBack.classList.add("goBack");
  console.log("Registered");
  aAcc.appendChild(aBack);
  divAcc.appendChild(aAcc);
  if (form != null){
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        fetch(`http://{{SERV_IP}}:5000/account/${UserID}/changeParams`, {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => changeParams(data))
        .catch(error => console.error(error));
      });
  }
}

function changeParams(data){
  if (data.message == ""){
    location.href = 'http://{{SERV_IP}}:3000/src/pages/account.html';
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