const mainTopBtn = document.querySelector('.js_main_top_btn');
if (mainTopBtn) {
    mainTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const scrollTarget = document.querySelector('.main_top__body');
        let topOffset = header.offsetHeight - 51;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;
        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
}

const mainTopBody = document.querySelector('.main_top__body');
if (mainTopBody) {
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            let mainTopBodyStartAnim = mainTopBody.getBoundingClientRect().top - header.offsetHeight + window.pageYOffset;

            if (window.innerWidth >= 1024) {
                if (window.pageYOffset >= mainTopBodyStartAnim) {
                    mainTopBody.classList.add('animate');
                } else {
                    mainTopBody.classList.remove('animate');
                }
            }
            window.addEventListener('resize', () => {
                mainTopBodyStartAnim = mainTopBody.getBoundingClientRect().top - header.offsetHeight + window.pageYOffset;
            });
            window.addEventListener('scroll', () => {
                if (window.innerWidth >= 1024) {

                    if (window.pageYOffset >= mainTopBodyStartAnim) {
                        mainTopBody.classList.add('animate');
                    } else {
                        mainTopBody.classList.remove('animate');
                    }
                }
            });
        }, 400);
    });
}