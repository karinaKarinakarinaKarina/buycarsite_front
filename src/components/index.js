const api_url =
      "http://localhost:5000/"

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

//            const divCar1Name = document.getElementById('name_cars1');
//            const divCar1Price = document.getElementById('price_cars1');
//            data.ads.forEach((item, index) => {
//                const prphDC1N = document.createElement('p');
//                prphDC1N.textContent = `${item.brand} ${item.model}, ${item.year}`;
//                const prphDC1P = document.createElement('p');
//                prphDC1N.textContent = `${item.price} ₽`;
//                console.log(index)
//                if (index < 2) {
//                    divCar1Name.appendChild(prphDC1N);
//                    divCar1Price.appendChild(prphDC1P);
//                } else {
//                    const newDiv = document.createElement('div');
//                    newDiv.appendChild(prphDC1N);
//                    divCar1Name.appendChild(newDiv);
//                }
//            });
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