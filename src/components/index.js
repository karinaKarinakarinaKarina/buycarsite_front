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

            const selectYear = document.getElementById('year');
            selectYear.innerHTML = '';
            data.years.forEach(item => InsertOptions(selectYear, item));

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
    listAds = [];
    if (list.length != 0){
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
