var nickname = sessionStorage.getItem('nickname');
var login = sessionStorage.getItem('login');
var id = sessionStorage.getItem('id');
console.log(nickname);
console.log(login);
let divAcc = document.getElementById("account");
let aAcc = document.createElement('a');
if (nickname != null && login != null){
    aAcc.href = `http://localhost:8000/src/pages/account.html?id=${id}`;
    aAcc.classList.add("account-icon");
    let imgAcc = document.createElement('img');
    imgAcc.src = "src/images/account-icon.png";
    imgAcc.alt = `Перейти на страницу ${nickname}`;
    console.log("Registered")
    aAcc.appendChild(imgAcc);
}
else{
    aAcc.classList.add("login");
    aAcc.href = "src/pages/login.html";
    aAcc.id = id="urlToLogin";
    aAcc.textContent = "Войти";
    console.log("Not registered");
}
divAcc.appendChild(aAcc);

const api_url =
      "http://localhost:5000/"

var listAds = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            const selectCity = document.getElementById('city');
            selectCity.innerHTML = '';
            data.cities.forEach(item => InsertOptions(selectCity, item));

            const selectBrand = document.getElementById('brand');
            selectBrand.innerHTML = '';
            data.brands.forEach(item => InsertOptions(selectBrand, item));

            const selectModel = document.getElementById('model');
            selectModel.innerHTML = '';
            data.models.forEach(item => InsertOptions(selectModel, item));

            const selectTransmissions = document.getElementById('trans');
            selectTransmissions.innerHTML = '';
            data.transmissions.forEach(item => InsertOptions(selectTransmissions, item));
            
            viewCars(data.ads, true);
        })
        .catch(error => {
            console.error('Error fetching list:', error);
        });
});

function InsertOptions(select, item){
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
}

function viewCars(list, flag){
    var allCars = document.getElementById('allCars');
    if (list.length != 0){
        listAds.length = 0;
        const Line1 = document.getElementById('line1'); 
        var count = 0;

        while (document.getElementById("carsInLine1") != null && flag){
            document.getElementById("carsInLine1").remove();
        }
        
        while (document.getElementById("carsInLine2") != null && flag){
            document.getElementById("carsInLine2").remove();
        }

        var divLine1 = document.createElement('div');
        divLine1.id = "carsInLine1";
        divLine1.classList.add("line1"); 
        
        var Line2 = document.createElement('div');
        Line2.classList.add("line2");
        Line2.id = "carsInLine2";

        list.forEach((item, index) => {
            const divName = document.createElement('div');
            divName.classList.add("cars__name");
            divName.textContent = `${item.brand} ${item.model}, ${item.year}`
            const Img = document.createElement('img');
            Img.classList.add("cars__img");
            Img.alt = "Image";
            Img.src = `${item.image}`;
            Img.width = "381";
            Img.height = "285";
            const divPrice = document.createElement('div');
            divPrice.classList.add("cars__price");
            divPrice.textContent = `${item.price} ₽`
            const tagA = document.createElement('a');
            tagA.classList.add("cars1");
            tagA.href = `http://localhost:8000/src/pages/car.html?id=${item.id}`;
            tagA.appendChild(divName);
            tagA.appendChild(Img);
            tagA.appendChild(divPrice);
            if (flag){
                if (index >= 2 && index < 6) {
                    if(count!=3){
                        Line2.appendChild(tagA);
                    }
                    else{
                        allCars.appendChild(Line2);
                    }
                    count = count + 1;
                }
                else if (index <= 1){
                    divLine1.appendChild(tagA);
                }
                else{
                    listAds.push(item);
                }
            }
            else {
                var btn = document.getElementById("nextAds");
                if (count != 3 ){
                    Line2.appendChild(tagA);
                }
                else{
                    allCars.appendChild(Line2);
                    Line2 = document.createElement('div');
                    Line2.classList.add("line2");
                    Line2.id = "carsInLine2"    
                    Line2.appendChild(tagA);
                    count = 0;
                    btn.remove();
                }
                count = count+1;
            }
        });
        
        if (flag){
            Line1.appendChild(divLine1);
        }
    }
}

function clickButt(){
    console.log("work index.js");
    var allCars = document.getElementById('allCars');
    if (listAds.length != 0){
        var count = 0;
        var Line2 = document.createElement('div');
        Line2.classList.add("line2");
        Line2.id = "carsInLine2";
        for (let i = 0; i < listAds.length && count != 3; i++) {
            const item = listAds[i];
            const divName = document.createElement('div');
            divName.classList.add("cars__name");
            divName.textContent = `${item.brand} ${item.model}, ${item.year}`
            const Img = document.createElement('img');
            Img.classList.add("cars__img");
            Img.alt = "Image";
            Img.src = `${item.image}`;
            Img.width = "381";
            Img.height = "285";
            const divPrice = document.createElement('div');
            divPrice.classList.add("cars__price");
            divPrice.textContent = `${item.price} ₽`
            const tagA = document.createElement('a');
            tagA.classList.add("cars1");
            tagA.href = `http://localhost:8000/src/pages/car.html?id=${item.id}`;
            tagA.appendChild(divName);
            tagA.appendChild(Img);
            tagA.appendChild(divPrice);
            Line2.appendChild(tagA);
            listAds.splice(i, 1);
            i--;
            count++;
        }
        if (count != 3){
            document.getElementById('nextAds').remove();
        }
        allCars.appendChild(Line2);   
    }
}
let button = document.getElementById('nextAds');

button.addEventListener('click', function() {
  clickButt();
});

const form = document.getElementById('filtersForm');
if (form != null){
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      fetch("http://localhost:5000/", {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        viewCars(data.ads, true);
      })
      .catch(error => console.error(error));
    });
}
