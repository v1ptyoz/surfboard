'use strict';

document.addEventListener('DOMContentLoaded', function() {

    function toggleMenu() {
        let menu = document.querySelector('.nav--vertical');
        let menuOpenBtn = document.querySelector('.header__menu-icon');
        let menuCloseBtn = document.querySelector('.nav__close');

        menuOpenBtn.addEventListener("click", (event) => {
            event.preventDefault();
            menu.classList.add('nav-show');
        })
        menuCloseBtn.addEventListener("click", (event) => {
            event.preventDefault();
            menu.classList.remove('nav-show');
        })
    }
    toggleMenu();

    function slider() {
        let slideIndex = 1;
        const slides = document.querySelectorAll('.product');
        let prev = document.querySelector('.shop__arrow--prev');
        let next = document.querySelector('.shop__arrow--next');

        slides.forEach(element => {
            hide(element);
        });
        showFlex(slides[slideIndex - 1]);

        prev.addEventListener('click', (event) => {
            event.preventDefault();
            slideIndex--;
            if (slideIndex < 1) {
                slideIndex = slides.length;
            }
            slides.forEach(element => {
                hide(element);
            });
            showFlex(slides[slideIndex - 1]);
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
            showFlex(slides[slideIndex - 1]);
        });
    }

    slider();

    function reviewSlider() {
        function setActive(element) {
            element.classList.add("pager__link--active");
        }

        function hideAllActive() {
            pagers.forEach(element => {
                element.classList.remove("pager__link--active");
            });
        }
        let reviewIndex = 0;
        let reviews = document.querySelectorAll('.reviews__item');
        let pagers = document.querySelectorAll('.pager__link');

        reviews.forEach(element => {
            hide(element);
        })
        showFlex(reviews[reviewIndex]);
        setActive(pagers[reviewIndex]);

        pagers.forEach((element, key) => {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                reviewIndex = key;

                reviews.forEach(element => {
                    hide(element);
                })
                hideAllActive();
                showFlex(reviews[reviewIndex]);
                setActive(pagers[reviewIndex]);
            })
        });

    }

    reviewSlider();




    function showFlex(element) {
        element.style.display = 'flex';
    }

    function hide(element) {
        element.style.display = 'none';
    }



});