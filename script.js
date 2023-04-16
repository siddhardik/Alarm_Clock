let body = document.getElementsByTagName('body');
const CurrentTime = document.getElementById('Curr-time');
let mode = document.getElementById('theme');
let setAlarm = document.querySelector('#setAlarm');
let stopAlarm = document.querySelector('#stopAlarm');
let allAlarmContainer = document.querySelector('#allAlarmContainer');
let templates = document.querySelector("#templates");
let alarmTimeContainer = document.querySelector('.alarm-time-container');

/* for changing color on mode swith----start here----- */
let root = document.querySelector(':root');
let rootStyle = getComputedStyle(root);

let toggleStatus = false;

let alarmList = [];

mode.addEventListener('click', function () {

    /* getting css variable value of red theme */
    var fg1 = rootStyle.getPropertyValue('--fg1');
    var fg1Text = rootStyle.getPropertyValue('--fg1Text');
    var shadow = rootStyle.getPropertyValue('--shadow');

    /* getting css variable value of blue theme */
    var fg2 = rootStyle.getPropertyValue('--fg2');
    var fg2Text = rootStyle.getPropertyValue('--fg2Text');
    var shadow2 = rootStyle.getPropertyValue('--shadow2');

    if (!toggleStatus) {
        document.body.style.backgroundImage = "url('./asset/img1.png')";

        root.style.setProperty('--fg1', fg2);
        root.style.setProperty('--fg1Text', fg2Text);
        root.style.setProperty('--shadow', shadow2);
    } else {
        document.body.style.backgroundImage = "url('./asset/img2.png')";

        root.style.setProperty('--fg1', '#98003f');
        root.style.setProperty('--fg1Text', '#fbf9de');
        root.style.setProperty('--shadow', 'rgb(90, 0, 36)');
    }

    toggleStatus = !toggleStatus;

})

/* for changing color on mode swith---ends here------ */


/* every 1sec function will get call */
setInterval(appendTime, 1000);

/* current time display function*/

let presentTime;
function appendTime() {

    let time = new Date();

    const hr = timeStyle(time.getHours());
    const min = timeStyle(time.getMinutes());
    const sec = timeStyle(time.getSeconds());

    presentTime = `${hr}:${min}:${sec}`;

    CurrentTime.innerText = presentTime;

}

// change style or format of time, for ex 2:7:7 to 02:07:07
function timeStyle(time) {
    if (time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}

/* for seting alarm -------------- */
setAlarm.addEventListener('click', setAlarmHTML);

/* add alarm html to DOM */

function setAlarmHTML() {

    let alarmContainerTemplate = templates.content.querySelector('.alarmContainer');
    let alarmContainer = document.importNode(alarmContainerTemplate, true);

    /* show alarm time inside alarm list */
    let alarmTime = alarmContainer.querySelector('.alarmTime');

    /* add alarm to the DOM---------- */
    (function () {

        /* fetching hour, min and sec value from alarm-time-container -----------*/

        /* hour selector */
        let hourSelector = alarmTimeContainer.querySelector('#alarm_hr');
        let hour = timeStyle(hourSelector.value);

        /* minute selector */
        let minSelector = alarmTimeContainer.querySelector('#alarm_min');
        let min = timeStyle(minSelector.value);

        /* second selector */
        let secSelector = alarmTimeContainer.querySelector('#alarm_sec');
        let sec = timeStyle(secSelector.value);

        if(sec == 0 && min == 0 && hour == sec) {
            alert("Time cannot be zero");
            hourSelector.value = "";
            minSelector.value = "";
            secSelector.value = "";
            return;
        }


        /* invalid minute time check */
        if(hour > 23  || hour < 0) {
            alert("Invalid time");
            hourSelector.value = "";
            minSelector.value = "";
            secSelector.value = "";
            return;
        }

        if (hour === '0') {
            hour = '00'
        }

        
        /* invalid minute time check */
        if(min > 59  || min < 0) {
            alert("Invalid time");
            hourSelector.value = "";
            minSelector.value = "";
            secSelector.value = "";
            return;
        }

        if (min === '0') {
            min = '00'
        }

        /* invalid second time check */
        if(sec > 59  || sec < 0) {
            alert("Invalid time");
            hourSelector.value = "";
            minSelector.value = "";
            secSelector.value = "";
            return;
        }

        if (sec === '0') {
            sec = '00'
        }

        /* take time in hh:mm:ss format */
        let fetchedTime = `${hour}:${min}:${sec}`;

        /* check for alarm already exist */
        if (alarmList.includes(fetchedTime)) {
            alert("Alarm already exist. Please set a new alarm");
            return;
        } else {
            /* pushing alarm time to alaramList array */
            alarmList.push(fetchedTime);

            /* adding alarm to DOM */
            allAlarmContainer.appendChild(alarmContainer);

            /* setting alarm time to alarmContainer */
            alarmTime.innerText = fetchedTime;

            hourSelector.value = "";
            minSelector.value = "";
            secSelector.value = "";

        }

    })();

    /* delete alarm event listener */
    let deleteAlarm = alarmContainer.querySelector('.delete');
    deleteAlarm.addEventListener('click', deleteHelper);

}

/* delete alarm function */
function deleteHelper() {
    let deleteDiv = this;
    let toBeDeleted = deleteDiv.parentNode;


    /* Rremove alarm from alarmList array------------*/
    /* fetching alarmTime div */
    let alarmTimeDiv = toBeDeleted.querySelector('.alarmTime');
    let alarmTime = alarmTimeDiv.innerText;

    /* removing from array */
    alarmList.splice(alarmTime, 1);

    allAlarmContainer.removeChild(toBeDeleted);

}

/* ring alarm ----------------- */
let music = document.querySelector('#music');
let isPlaying = false;
function ring() {
    music.play();
    isPlaying = true;
    // alert(`Wake Up. Time is ${presentTime}`);
}

let ringInterval = setInterval(() => {
    if (alarmList.includes(presentTime)) {
        ring();
    }
}, 1000);


/* stop alaram ---------*/
stopAlarm.addEventListener('click', () => {

    music.pause();
    if (alarmList.length > 0 && status) {
        alert("alarm stopped");
        isPlaying = false;
    }

    if(alarmList.length <= 0) {
        alert("No alarm is set")
    }

})