
//таймер
//для вывода счетчика таймера используется 3 контенера (часы, минуты, секунды)
//.hours класс для вывода часов
//.minutes класс для вывода минут
//.seconds класс для вывода секунд


function init() {

    var h = document.querySelector('.hours'), m = document.querySelector('.minutes'),
        s = document.querySelector('.seconds');

    if (h && m && s) {
        // если все значения (часы/минуты/секунды) сущесвтуют, тогда срабатывает таймер
        initializeTimer();
    }
  
}

// при документ реди вызывается функция init, описаная выше
document.addEventListener('DOMContentLoaded', init);


function initializeTimer() {

    if (!localStorage.getItem("heytimer")) {
        var time = {
            hours: 2,
            minutes: 27,
            seconds: 0
        }, different = false;

        time = time.hours * 3600 + time.minutes * 60 + time.seconds;

        localStorage.setItem("time", time);
        localStorage.setItem("heytimer", true);
        localStorage.setItem("different", different);
    }

    timerSettings();
}

function timerSettings() {
    var time = localStorage.getItem('time'),
        different = localStorage.getItem('different') === "true",
        hours = parseInt(time / 3600, 10),
        minutes = parseInt((time - hours * 3600 ) / 60, 10),
        seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : "" + minutes;
    seconds = seconds < 10 ? "0" + seconds : "" + seconds;
    hours = hours < 10 ? "0" + hours : "" + hours;

    var hoursHTML = document.getElementsByClassName("hours");
    var minutesHTML = document.getElementsByClassName("minutes");
    var secondsHTML = document.getElementsByClassName("seconds");

    if (--time < 0) {
        localStorage.removeItem("heytimer");
        return;
    }
    if (different) {
        seconds = seconds.split("");
        minutes = minutes.split("");
        hours = hours.split("");

        doubleFilling(hoursHTML, hours);
        doubleFilling(minutesHTML, minutes);
        doubleFilling(secondsHTML, seconds);
    } else {
        filling(hoursHTML, hours);
        filling(minutesHTML, minutes);
        filling(secondsHTML, seconds);
    }

    localStorage.setItem("time", time);
    setTimeout(timerSettings, 1000);
}

function filling(obj, value) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].innerHTML = value;
    }
}

function doubleFilling(obj, value) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].innerHTML = value[i % 2];
    }
}


