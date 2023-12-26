const UserID = sessionStorage.getItem('id');

function registered(){
    return UserID != null;
}



let listFavoriteAds = [];
let listId = [];
if (registered()){
    let divAcc = document.getElementById("account");
    let aAcc = document.createElement('a');
    aAcc.href = `http://{{SERV_IP}}:3000/src/pages/account.html?id=${UserID}`;
    aAcc.classList.add("account-icon");
    let imgAcc = document.createElement('img');
    imgAcc.src = "../images/account-icon.png";
    console.log("Registered");
    aAcc.appendChild(imgAcc);
    divAcc.appendChild(aAcc);
    fetch(`http://{{SERV_IP}}:5000/selectFavoriteAdsALL/${UserID}`)
        .then(response => response.json())
        .then(data => {
            data.favoriteAds.forEach((item) => {
                listFavoriteAds.push(item);
                listId.push(item.id);
            });
            viewAds(data.favoriteAds);
        })
        .catch(error => {
            console.error('Error fetching list:', error);
        });
}
else{
    location.href = 'http://{{SERV_IP}}:3000/src/pages/login.html';
}

function setAdToUser(user_id, ad_id){
    const urlForSet = `http://{{SERV_IP}}:5000/setAdInUser/${user_id}/${ad_id}`;
    fetch(urlForSet)
        .then(response => response.json())
        .then(data => {
            if (data.result == "Successfully"){
                console.log("Adding ad.id=" + ad_id + " to user.id=" + user_id + " was successful");
            }
        })
        .catch(error => {
            console.error('Error the Ad could not be added to favorites: ', error);
        });
}

function deleteAdOfUser(user_id, ad_id){
    const urlForDelete = `http://{{SERV_IP}}:5000/deleteAdOfUser/${user_id}/${ad_id}`;
    fetch(urlForDelete)
        .then(response => response.json())
        .then(data => {
            if (data.result == "Successfully"){
                console.log("The deletion ad.id=" + ad_id + " to user.id=" + user_id + " was successful");
            }
        })
        .catch(error => {
            console.error('Error the ad could not be deleted to favorites: ', error);
        });
}

function createStar(button){
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "star");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("viewBox", "0 0 21 20");

    // Создаем элемент <path> и добавляем атрибуты
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("d", "m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z");

    // Добавляем элемент <path> в элемент <svg>
    svg.appendChild(path);
    // Добавляем элемент <svg> в элемент <button>
    button.appendChild(svg);
}

function viewAds(listAds){
    var allCars = document.getElementById('allCars');
    if (listAds.length != 0){
        document.getElementById('NotFavorites').remove();
        var count = 0;
        var Line2 = document.createElement('div');
        Line2.classList.add("line2");
        Line2.id = "carsInLine2";
        for (let i = 0; i < listAds.length; i++) {
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
            divPrice.textContent = `${item.price} ₽`;
            const a1 = document.createElement('a');
            const a2 = document.createElement('a');
            a2.href = `http://{{SERV_IP}}:3000/src/pages/car.html?id=${item.id}`;
            a2.appendChild(Img);
            a1.classList.add("cars1");
            if (registered()){
                const buttAd = document.createElement('button');
                buttAd.classList.add("favorite-button");
                createStar(buttAd);
                buttAd.setAttribute('data-value', item.id);
                console.log(listFavoriteAds.includes(item.id));
                if (listId.includes(item.id)){
                    buttAd.classList.toggle('favorite');
                }
                buttAd.addEventListener('click', function() {
                    this.classList.toggle('favorite');
                    var ad_id = Number(this.getAttribute('data-value'));
                    if (listId.includes(ad_id)){
                        deleteAdOfUser(UserID, ad_id);
                        for (let i = 0; i < listId.length; i++){
                            if (listId[i] == ad_id){
                                listId.splice(i, 1);
                            }
                        }
                    }
                    else{
                        setAdToUser(UserID, ad_id);
                    }
                });
                a1.appendChild(buttAd);
            }
            a1.appendChild(divName);
            a1.appendChild(a2);
            a1.appendChild(divPrice);
            Line2.appendChild(a1);
            listAds.splice(i, 1);
            i--;
            count++;
            if (count==3){
                allCars.appendChild(Line2);
                Line2 = document.createElement('div');
                Line2.classList.add("line2");
                Line2.id = "carsInLine2";
                count = 0;
            }
        }
        if (count < 3){
            allCars.appendChild(Line2);
        }
           
    }
}
