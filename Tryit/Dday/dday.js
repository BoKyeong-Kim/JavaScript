const firstDay = new Date("2018-09-15"),
    nowDay = new Date(),
    toFisrt = firstDay.getTime(),
    toNow = nowDay.getTime(),
    passedTime = toNow - toFisrt;
    passedDay = Math.round(passedTime/(24*60*60*1000)),
    document.querySelector('#accent').innerHTML = passedDay + "일";

function calcDate(days){
    const future = toFisrt + days*(1000*60*60*24);
    const someday = new Date(future);
    const year = someday.getFullYear();
    const month = someday.getMonth()+1;
    const date = someday.getDate();
    document.querySelector("#date"+days).innerHTML = year + "년" + month + "월" + date + "일" ;
}

function init() {
    calcDate(100);
    calcDate(200);
    calcDate(365);
    calcDate(500);
    calcDate(1000);
}

init();