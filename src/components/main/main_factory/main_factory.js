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
}