const btns = document.querySelectorAll('[data-modal]')
const modal = document.querySelector('.modal')
const close = document.querySelector('[data-close]')
const slides = document.querySelectorAll('.offer__slide');
const prev = document.querySelector('.offer__slider-prev');
const next = document.querySelector('.offer__slider-next');
const current = document.querySelector('#current');
const total = document.querySelector('#total');
const tabs = document.querySelectorAll('.tabcontent')
const tabs_btn = document.querySelectorAll('.tabheader__item')

btns.forEach(btn => {
        btn.onclick = () => {
                modal.classList.add('show')
        }
});
close.onclick = () => {
        modal.classList.remove('show')
}

function tabsShow(idx) {
        tabs.forEach((tab) => tab.classList.add('hide' , 'fade'))
        tabs[idx].classList.remove('hide')
}

tabsShow(0)

tabs_btn.forEach((btn , idx) => {
        btn.onclick = () => {
                tabsShow(idx)
                document.querySelector('.tabheader__item_active').classList.remove('tabheader__item_active')
                btn.classList.add('tabheader__item_active')
        }
})

let slideIndex = 1;

function slidesShow(n) {
        if (n > slides.length) {
                slideIndex = 1;
        } 

        if (n < 1) {
                slideIndex = slides.length;
        }

        slides.forEach((slide) => {
                slide.classList.add('hide');
        });

        slides[slideIndex - 1].classList.remove('hide');

        if (slideIndex > 10) {
                current.innerHTML = slideIndex;
        } else {
                current.innerHTML = `0${slideIndex}`;
    }
}

slidesShow(slideIndex);

next.onclick = () => {
        slideIndex++;
        slidesShow(slideIndex);
};

prev.onclick = () => {
        slideIndex--;
        slidesShow(slideIndex);
};

total.innerHTML = slides.length 
if (slideIndex > 10) {
        current.innerHTML = slideIndex;
} else {
        current.innerHTML = `0${slideIndex}`;
}

let deadline = "2024-06-16 00:00";
let newyear = "2025-01-01 00:00";

function getRemainingTime(endTime) {
    const t = Date.parse(endTime) - Date.now(),
        days = Math.floor((t / 1000) / 60 /60 /24),
        hours = Math.floor((t / 1000) /60 /60 % 24),
        minutes = Math.floor((t / 1000) / 60 % 60),
        seconds = Math.floor((t / 1000 ) % 60);
    return {
        t,
        days,
        hours,
        minutes,
        seconds
    };
}

function setTimer(endTime, selector) {
    const t = document.querySelector(selector);
        days = t.querySelector('#days');
        hours = t.querySelector('#hours');
        minutes = t.querySelector('#minutes');
        seconds = t.querySelector('#seconds');
        interval = setInterval(updateTimer, 1000);

    function updateTimer() {
        const t = getRemainingTime(endTime);

        days.innerHTML = t.days;
        hours.innerHTML = t.hours;
        minutes.innerHTML = t.minutes;
        seconds.innerHTML = t.seconds;
        if (t.t <= 0) {
                clearInterval(interval)   
                confetti({
                        particleCount: 300,
                        startVelocity: 50,
                        spread: 500,
                        origin: {
                                x: Math.random(),
                                y: Math.random() - 0.2
                        }
                });
        }
    }

    updateTimer();
}

setTimer(newyear, '.one');
setTimer(deadline, '.two');