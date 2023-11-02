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
}