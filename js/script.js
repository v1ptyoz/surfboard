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

        function removeAllActive(array) {
            array.forEach(element => element.classList.remove('pager__link--active'))
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
                removeAllActive(pagers);
                showFlex(reviews[reviewIndex]);
                setActive(pagers[reviewIndex]);
            })
        });

    }

    reviewSlider();

    function teamHandler() {
        const items = document.querySelectorAll('.team__item');
        const arrows = document.querySelectorAll('.team__arrow');
        const itemsContent = document.querySelectorAll('.team__content');
        const itemsImgs = document.querySelectorAll('.team__img');
        itemsContent.forEach(element => element.style.height = 0 + "px");
        arrows.forEach(element => element.classList.remove('team__arrow--active'));
        let isTabletOrMobile = document.body.clientWidth <= 768;

        items.forEach(item => {
            const itemArrow = item.querySelector('.team__arrow');
            const itemContent = item.querySelector('.team__content');
            const itemImg = item.querySelector('.team__img');

            item.addEventListener('click', (event) => {
                event.preventDefault();
                if (itemContent.classList.contains('team__content--active')) {
                    itemContent.classList.remove('team__content--active');
                    itemArrow.classList.remove('team__arrow--active');
                    itemContent.style.height = 0 + "px";
                    if (isTabletOrMobile) {
                        itemImg.style.height = 0 + "px";
                    }
                } else {
                    itemsContent.forEach(element => {
                        element.style.height = 0 + "px"
                        element.classList.remove('team__content--active')
                    });
                    itemsImgs.forEach(image => {
                        image.style.height = 0 + "px";
                    })
                    arrows.forEach(element => element.classList.remove('team__arrow--active'));
                    itemArrow.classList.add('team__arrow--active');
                    itemContent.classList.add('team__content--active');
                    itemContent.style.height = itemContent.scrollHeight + "px";
                    itemImg.style.height = itemImg.scrollHeight + "px";
                }
            })
        })
    }

    teamHandler();

    function modal() {
        const modalWrapper = document.querySelector('.modal');
        const close = document.querySelector('.modal__close');
        close.addEventListener('click', (e) => {
            e.preventDefault();
            modalWrapper.style.display = 'none';
        });
        modalWrapper.addEventListener('click', (e) => {
            if (e.target == modalWrapper) {
                modalWrapper.style.display = 'none';
            }
        })
    }
    modal();

    function addEventListenerToSubmitForm() {
        const form = document.querySelector('.form');
        const modal = document.querySelector('.modal');
        const modalContent = document.querySelector('.modal__content p');
        form.addEventListener('submit', event => {
            event.preventDefault();

            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.responseType == 'json';
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            data["to"] = "email@example.com"; // хардкодим мыло
            xhr.send(JSON.stringify(data));

            xhr.addEventListener('load', () => {
                const res = JSON.parse(xhr.responseText);
                console.log(res);
                if (res.status == 1) {
                    modalContent.textContent = res.message;
                    showFlex(modal);
                    form.reset();
                } else {
                    modalContent.textContent = res.message || "Что-то пошло не так...";
                    showFlex(modal);
                }
            });

        })
    }

    addEventListenerToSubmitForm();

    function showFlex(element) {
        element.style.display = 'flex';
    }

    function hide(element) {
        element.style.display = 'none';
    }



});