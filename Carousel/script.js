var currentIndex = 0;
var previousSlideIndex = 0;

var slides = document.getElementsByClassName('slides');

var heroPrev = document.getElementById('heroPrev');
var heroNext = document.getElementById('heroNext');

var heroNav0 = document.getElementById('heroNav0');
var heroNav1 = document.getElementById('heroNav1');
var heroNav2 = document.getElementById('heroNav2');
var heroNavBtns = document.getElementsByClassName('hero-radio-button');


document.addEventListener('DOMContentLoaded', startup());


function startup() {
    initEventListeners();
    liveSlide(currentIndex = 0);
}


function initEventListeners() {
    heroPrev.addEventListener('click', function () {
        nextSlide(-1);
    });
    heroNext.addEventListener('click', function () {
        nextSlide(1);
    });
    heroNav0.addEventListener('click', function () {
        liveSlide(0);
    });
    heroNav1.addEventListener('click', function () {
        liveSlide(1);
    });
    heroNav2.addEventListener('click', function () {
        liveSlide(2);
    });
}


function nextSlide(x) {
    previousSlideIndex = currentIndex;
    currentIndex += x;

    if (currentIndex < 0)
        currentIndex = slides.length - 1;
    else if (currentIndex > slides.length - 1)
        currentIndex = 0;
    determineSlide();
}


function liveSlide(x) {
    previousSlideIndex = currentIndex;
    currentIndex = x;
    determineSlide();
}


function determineSlide() {
    slides[previousSlideIndex].style.display = 'none';
    heroNavBtns[previousSlideIndex].className = 'hero-radio-button';

    slides[currentIndex].style.display = 'block';
    heroNavBtns[currentIndex].className += ' selected';
}