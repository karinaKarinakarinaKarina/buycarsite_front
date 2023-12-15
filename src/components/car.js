var urlString = window.location.href;

var url = new URL(urlString);

var id = url.searchParams.get("id");

const api_url = `http://localhost:5000/advertisement/${id}`;

document.addEventListener('DOMContentLoaded', function() {
    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            createAd(data);
        })
        .catch(error => {
            console.error('Error fetching list:', error);
        });
});

function createAd(data){
    var title = document.getElementById("title");
    title.textContent = `${data.brand} ${data.model}, ${data.year}`;
    
    var dImg = document.getElementById("main_img");
    var img = document.createElement('img');
    img.src = `${data.image}`;
    img.width = 600;
    img.height = 499;
    dImg.appendChild(img);
    
    var dPrice = document.getElementById("car_name");
    dPrice.textContent = `${data.brand} ${data.model}, ${data.year}`;

    var dPrice = document.getElementById("price");
    dPrice.textContent = `${data.price} ₽`;

    var dBrand = document.getElementById("brand");
    dBrand.textContent = `Бренд: ${data.brand}`;

    var dModel = document.getElementById("model");
    dModel.textContent = `Модель: ${data.model}`;

    var dYear = document.getElementById("year");
    dYear.textContent = `Год выпуска: ${data.year}`;

    var dKM = document.getElementById("km");
    dKM.textContent = `Пробег: ${data.km}`;

    var dMotor = document.getElementById("motor");
    dMotor.textContent = `Двигатель: ${data.motor}`;

    var dTr = document.getElementById("transmission");
    dTr.textContent = `Коробка: ${data.transmission}`;

    var dWD = document.getElementById("wd");
    dWD.textContent = `Привод: ${data.wd}`;

    var aHref = document.getElementById("href");
    aHref.href = `${data.href}`;
    aHref.textContent = `Перейти к объявлению`;
}