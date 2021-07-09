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

    function reviewSlider() {
        function setActive(element) {
            element.classList.add("pager__link--active");
        }

        function hideActive() {
            pagers.forEach(element => {
                element.classList.remove("pager__link--active");
            });
        }
        let reviewIndex = 1;
        let reviews = document.querySelectorAll('.reviews__item');
        let pagers = document.querySelectorAll('.pager__link');

        reviews.forEach(element => {
            hide(element);
        })
        showFlex(reviews[reviewIndex - 1]);
        setActive(pagers[reviewIndex - 1]);

        pagers.forEach((element, key) => {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                reviewIndex = key + 1;

                reviews.forEach(element => {
                    hide(element);
                })
                hideActive();
                showFlex(reviews[reviewIndex - 1]);
                setActive(pagers[reviewIndex - 1]);
            })
        });

    }

    reviewSlider();


    function showGrid(element) {
        element.style.display = 'grid';
    }

    function showFlex(element) {
        element.style.display = 'flex';
    }

    function hide(element) {
        element.style.display = 'none';
    }

});