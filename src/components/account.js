const api_url = "http://localhost:5000/account"

fetch(api_url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let HTMLData = `<p>
        Name: ${data.username}
    </p>`
    document.getElementById("data").innerHTML = HTMLData
  })
  .catch(error => console.log(error));