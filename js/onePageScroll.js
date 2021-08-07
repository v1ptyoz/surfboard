if (document.body.offsetWidth >= 1100) {
    const content = document.querySelector('.wrapper__content');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.header__nav .nav__link');
    const pageNav = document.querySelector('.page-nav');
    const pageNavLinks = document.querySelectorAll('.page-nav__item');

    sections[0].classList.add('section--active');
    let isScroll = false;
    let activeSection;
    let nextSection;
    let prevSection;

    function setParameters() {
        activeSection = document.querySelector('.section--active');
        nextSection = activeSection.nextElementSibling;
        prevSection = activeSection.previousElementSibling;
    }

    pageNavLinks.forEach((link, index) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            doScroll(index);
        })
    });

    function doScroll(sectionIndex) {
        if (!isScroll) {
            isScroll = true;
            let sectionPosition = sectionIndex * -100;
            content.style.transform = `translateY(${sectionPosition}%)`;

            activeSection.classList.remove('section--active');
            sections[sectionIndex].classList.add('section--active');

            sectionTheme = sections[sectionIndex].getAttribute('data-pagenav-color');
        }
        setTimeout(() => {
            isScroll = false;
            if (sectionTheme == 'dark') {
                pageNav.classList.add('page-nav__list--dark');
            } else {
                pageNav.classList.remove('page-nav__list--dark');
            }
            pageNavLinks.forEach(link => link.classList.remove('page-nav__item--active'));
            pageNavLinks[sectionIndex].classList.add('page-nav__item--active');
        }, 1300);
    }

    navLinks.forEach((link, index) => {
        setParameters()
        link.addEventListener('click', (event) => {
            event.preventDefault();
            doScroll(index + 1);
        })
    })

    function scrollTo(direction) {
        NodeList.prototype.indexOf = Array.prototype.indexOf;
        if (direction === 'next' && nextSection) {
            doScroll(sections.indexOf(nextSection), nextSection);
        }
        if (direction === 'prev' && prevSection) {
            doScroll(sections.indexOf(prevSection), prevSection);
        }
    }

    document.addEventListener('wheel', (event) => {
        setParameters();
        if (event.deltaY > 0) {
            scrollTo('next');
        }
        if (event.deltaY < 0) {
            scrollTo('prev');
        }
    })

    document.addEventListener('keypress', (event) => {
        setParameters();
        let targetTag = event.target.tagName.toLowerCase();
        if (targetTag != 'input' && targetTag != 'textarea') {
            if (event.keyCode == 38 || event.keyCode == 33) {
                scrollTo('prev');
            }
            if (event.keyCode == 40 || event.keyCode == 34) {
                scrollTo('next');
            }
        }
    });
}