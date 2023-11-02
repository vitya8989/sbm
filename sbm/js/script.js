const header = document.querySelector('.header');

if (header) {
    let scrollPos = 0;
    const openSecondMenuLink = header.querySelector('.js_open_second_menu');
    const secondMenu = header.querySelector('.js_second_menu');

    openSecondMenuLink.addEventListener('click', () => {
        secondMenu.classList.toggle('show');
        openSecondMenuLink.classList.toggle('active');

        if (window.innerWidth <= 1023) {
            if (secondMenu.classList.contains('show')) {
                secondMenu.style.maxHeight = `${secondMenu.scrollHeight}px`;
            } else {
                secondMenu.style.maxHeight = '';
            }
        }
    });
    document.addEventListener('click', (e) => {
        if (window.innerWidth > 1023) {
            if (!e.target.closest('.js_open_second_menu') && !e.target.closest('.js_second_menu')) {
                secondMenu.classList.remove('show');
                openSecondMenuLink.classList.remove('active');
            }
        }
    });

    if (document.querySelector('.wrapper.this--main')) {
        document.addEventListener('slider-hide', () => {
            setTimeout(() => {
                window.addEventListener('scroll', toggleHeader);
            }, 500);
        });
        document.addEventListener('slider-show', () => {
            window.removeEventListener('scroll', toggleHeader);
        });
    } else if (document.querySelector('.wrapper.green_header') || document.querySelector('.wrapper.light_green_header')) {
        window.addEventListener('scroll', toggleHeader);
        if (window.pageYOffset > 0) {
            header.classList.remove('this--transparent')
        } else {
            header.classList.add('this--transparent');
        }
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 0) {
                header.classList.remove('this--transparent')
            } else {
                header.classList.add('this--transparent')
            }
        });
    } else {
        window.addEventListener('scroll', toggleHeader);
    }


    function toggleHeader () {
        if (scrollPos > window.pageYOffset) {
            header.classList.remove('small');
        } else {
            header.classList.add('small');
        }
        scrollPos = window.pageYOffset;
    }

    const headerTopLinks = header.querySelector('.header__top_links');
    const headerTopLinksGroup = header.querySelector('.header__top_links_group');
    const headerMenu = header.querySelector('.header__menu');

    if (window.innerWidth <= 1023) {
        headerMenu.append(headerTopLinksGroup);
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1023) {
            headerMenu.append(headerTopLinksGroup);
        } else {
            headerTopLinks.append(headerTopLinksGroup);
        }
    });

    const burger = header.querySelector('.header__burger');
    const headerMenuClose = header.querySelector('.header__menu_close');

    burger.addEventListener('click', () => {
        headerMenu.classList.add('show');
        document.body.classList.add('this--overflow');
    });

    headerMenuClose.addEventListener('click', () => {
        headerMenu.classList.remove('show');
        document.body.classList.remove('this--overflow');

        if (window.innerWidth <= 1023) {
            setTimeout(() => {
                secondMenu.classList.remove('show');
                openSecondMenuLink.classList.remove('active');
                secondMenu.style.maxHeight = '';
            }, 300);
        }
    });

};
const timeNode = document.querySelectorAll('.js_footer_time');

if (timeNode.length) {
    let timeZone = new Date().getTimezoneOffset();

    function getCurrentTimeString(dots, correction) {
        let date = new Date();
        date.setMinutes(date.getMinutes() + timeZone + correction);
        return date.toTimeString().replace(/:[0-9]{2,2} .*/, '');
    }

    timeNode.forEach((node) => {
        setInterval(function() {
            node.innerHTML = getCurrentTimeString(Math.round(Date.now() / 1000) % 2, 300);
        }, 1000);
    });
}

const footer = document.querySelector('.footer');

if (footer) {
    window.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('.trading-list')) {
            let id = setInterval(() => {
                if (document.querySelector('.trading-list').offsetHeight > 300) {
                    console.log(document.querySelector('.trading-list').offsetHeight)
                    clearInterval(id);
                    let startMove = footer.getBoundingClientRect().top + window.pageYOffset + footer.getBoundingClientRect().height / 2 - window.innerHeight;
                    if (window.pageYOffset >= startMove && window.innerWidth > 1023) {
                        footer.style.top = `${(window.pageYOffset - startMove) / 2}px`;
                    }
                    window.addEventListener('scroll', () => {
                        if (window.pageYOffset >= startMove && window.innerWidth > 1023) {
                            footer.style.top = `${(window.pageYOffset - startMove) / 2}px`;
                        }
                    });
                    window.addEventListener('resize', () => {
                        startMove = footer.getBoundingClientRect().top + window.pageYOffset + footer.getBoundingClientRect().height / 2 - window.innerHeight;
                    });
                }
            }, 700);
        } else {
            setTimeout(() => {
                let startMove = footer.getBoundingClientRect().top + window.pageYOffset + footer.getBoundingClientRect().height / 2 - window.innerHeight;
                window.addEventListener('resize', () => {
                    setTimeout(() => {
                        footer.style.top = '';
                        startMove = footer.getBoundingClientRect().top + window.pageYOffset + footer.getBoundingClientRect().height / 2 - window.innerHeight;
                    }, 200);
                });
                document.addEventListener('change-height', () => {
                    setTimeout(() => {
                        footer.style.top = '';
                        startMove = footer.getBoundingClientRect().top + window.pageYOffset + footer.getBoundingClientRect().height / 2 - window.innerHeight;
                    }, 200);
                });
                if (window.pageYOffset >= startMove && window.innerWidth > 1023) {
                    footer.style.top = `${(window.pageYOffset - startMove) / 2}px`;
                }
                window.addEventListener('scroll', () => {
                    if (window.pageYOffset >= startMove && window.innerWidth > 1023) {
                        footer.style.top = `${(window.pageYOffset - startMove) / 2}px`;
                    }
                });
            }, 200);
        }
    });

};

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
};
const mainProducts = document.querySelector('.main_products');

let evt = document.createEvent('CustomEvent');
evt.initCustomEvent('change-height', false, false, {});

if (mainProducts) {
    const curtain = mainProducts.querySelector('.main_products__curtain');
    const mainProductsBtn = mainProducts.querySelector('.js_main_products_btn');

    mainProductsBtn.addEventListener('click', () => {
        curtain.style.display = 'none';
        mainProductsBtn.style.display = 'none';
        mainProducts.classList.remove('hide');
        document.dispatchEvent(evt);
    });
}

const productBtns = document.querySelectorAll('.js_product_btn');

if (productBtns.length > 0) {
    const productsBottom = document.querySelector('.js_products_bottom');

    if (window.innerWidth < 1024) {
        productsBottom.classList.remove('plank');
        productsBottom.classList.add('card');
    }
    window.addEventListener('resize', () => {
        if (window.innerWidth < 1024) {
            productsBottom.classList.remove('plank');
            productsBottom.classList.add('card');
            productBtns.forEach((btn) => {
                if (btn.dataset.type === 'card') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            document.dispatchEvent(evt);
        }
    });

    productBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
            productBtns.forEach((btn) => {
                if (btn !== this) {
                    btn.classList.remove('active');
                }
            });
            btn.classList.add('active');
            productsBottom.classList.add('hide');
            setTimeout(() => {
                productsBottom.classList.remove('plank');
                productsBottom.classList.remove('card');
                productsBottom.classList.add(btn.dataset.type);
                productsBottom.classList.remove('hide');
                document.dispatchEvent(evt);
            }, 200);
        });
    });
};
const mainFactory = document.querySelector('.main_factory');

if (mainFactory) {
    const mainFactoryWrapper = mainFactory.querySelector('.main_factory__wrapper');
    const mainFactoryImg = mainFactory.querySelector('.js_factory_img');
    let startFactorySliderPoint;
    let endFactorySliderPoint;
    window.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth > 1024) {
            setTimeout(() => {
                mainFactory.style.height = `${mainFactoryImg.scrollHeight}px`;
                startFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset;
                endFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset + mainFactory.offsetHeight - mainFactoryWrapper.offsetHeight;

                document.addEventListener('change-height', () => {
                    startFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset;
                    endFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset + mainFactory.offsetHeight - mainFactoryWrapper.offsetHeight;
                });
            }, 100);
        }

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > startFactorySliderPoint && window.pageYOffset < endFactorySliderPoint) {
                mainFactoryImg.style.top = `-${window.pageYOffset - startFactorySliderPoint}px`;
            }
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                mainFactory.style.height = `${mainFactoryImg.scrollHeight}px`;
                startFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset;
                endFactorySliderPoint = mainFactory.getBoundingClientRect().top + window.pageYOffset + mainFactory.offsetHeight - mainFactoryWrapper.offsetHeight;
            }
        });
    });
};
const factoryTop = document.querySelector('.factory_top');

if (factoryTop) {

    const teamCardSlider = new Swiper('.team_card__slider', {
        spaceBetween: 13,
        slidesPerView: 'auto',
    });
};
const onlyRus = document.querySelectorAll('.js_only_rus');
const onlyEng = document.querySelectorAll('.js_only_eng');
const onlyNumber = document.querySelectorAll('.js_only_number');

if (onlyRus.length > 0) {
    for (let i = 0; i < onlyRus.length; i++) {
        onlyRus[i].addEventListener('input', function () {
            this.value = this.value.replace(/[\w]/g, '');
        });
    }
}
if (onlyEng.length > 0) {
    for (let i = 0; i < onlyEng.length; i++) {
        onlyEng[i].addEventListener('input', function () {
            this.value = this.value.replace(/[а-яА-ЯёЁ]/g, '');
        });
    }
}
if (onlyNumber.length > 0) {
    for (let i = 0; i < onlyNumber.length; i++) {
        onlyNumber[i].addEventListener('input', function () {
            this.value = this.value.replace(/[^\d]/g, '');
        });
    }
}

if (document.querySelector('.js_tel_mask')) {
    $('.js_tel_mask').inputmask({
        mask: '+7 (999) 999-9999',
        showMaskOnHover: false
    });
}

const calculateForm = document.querySelector('.js_calculate_form');

if (calculateForm) {

    let calculateFormSelect = calculateForm.querySelector('.js_calculate_form_select');
    var calculateFormSelectSumo = $('.js_calculate_form_select').SumoSelect({
        nativeOnDevice: [],
        search: true,
        searchText: 'Поиск',
    });

    const calculateFormReqInputs = calculateForm.querySelectorAll('.js_required_input');

    calculateFormReqInputs.forEach((input) => {
        input.addEventListener('focus', () => {
            if (input.classList.contains('error')) {
                input.classList.remove('error');
            }
        });
        if (input.classList.contains('js_calculate_form_select') && input.parentNode.nextElementSibling) {
            input.parentNode.addEventListener('focus', () => {
                input.classList.remove('error');
                input.parentNode.nextElementSibling.classList.remove('show');
            });
        }
    });

    calculateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm(calculateForm)) {
            return;
        }
        // Отправка формы
        //
        calculateForm.reset();
    });

    function validateForm (form) {
        let valid = true;
        const validateInputs = form.querySelectorAll('.js_required_input');

        validateInputs.forEach((input) => {
            if (input.value === '') {
                valid = false;
                input.classList.add('error');
                if (input.classList.contains('js_calculate_form_select') && input.parentNode.nextElementSibling) {
                    input.parentNode.nextElementSibling.classList.add('show');
                }
            }
            if (input.classList.contains('js_tel_mask') && input.value.indexOf('_') !== -1) {
                valid = false;
                input.classList.add('error');
            }
        });

        return valid;
    }
};

