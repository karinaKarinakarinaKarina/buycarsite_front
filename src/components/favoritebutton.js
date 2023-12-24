const favoriteButtons = document.querySelectorAll('.favorite-button');

favoriteButtons.forEach(button => {
    button.addEventListener('click', function() {
        button.classList.toggle('favorite');
    });
});
