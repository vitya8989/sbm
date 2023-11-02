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
}