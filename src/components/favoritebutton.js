let clicked = false;

document.getElementById('favoriteButton').addEventListener('click', function() {
    const button = document.getElementById('favoriteButton');
    
    if (!clicked) {
        button.classList.add('favorite');
        clicked = true;
    } else {
        button.classList.remove('favorite');
        clicked = false;
    }
});
