'use strict';

document.addEventListener('DOMContentLoaded', function() {

    function slider() {
        let slideIndex = 1;
        const slides = document.querySelectorAll('.product');
        let prev = document.querySelector('.shop__arrow-prev');
        let next = document.querySelector('.shop__arrow-next');

        slides.forEach(element => {
            hide(element);
        });
        showGrid(slides[slideIndex - 1]);

        prev.addEventListener('click', (event) => {
            event.preventDefault();
            slideIndex--;
            if (slideIndex < 1) {
                slideIndex = slides.length;
            }
            slides.forEach(element => {
                hide(element);
            });
            showGrid(slides[slideIndex - 1]);
        });

        next.addEventListener('click', (event) => {
            event.preventDefault();
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            slides.forEach(element => {
                hide(element);
            });
            showGrid(slides[slideIndex - 1]);
        });
    }
    slider();


    function showGrid(element) {
        element.style.display = 'grid';
    }

    function hide(element) {
        element.style.display = 'none';
    }

});