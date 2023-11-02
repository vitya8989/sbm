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

}