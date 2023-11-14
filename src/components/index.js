const form = document.getElementById('{nameForm}');
if (form != null){
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      fetch('http://localhost:5000/', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => output(data))
      .catch(error => console.error(error));
    });
}
function output(data){
    console.log(data)
    if (data.lens <= 2){
        let InputToHTML = `<p>
            
        </p>`
    }
}