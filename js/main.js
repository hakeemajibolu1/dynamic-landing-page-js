// DOM Elements
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus');

// Options
const showAmPm = true;

// Show time: It will be called within itself every second to show the seconds
function showTime() {
    // let today = new Date(2019, 06, 10, 20, 33, 30); // Just testing for different time of the day
    let today = new Date(), // Gets real time from the system
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    // Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    // 12 hour format
    hour = hour % 12 || 12;

    //Output time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} 
    ${showAmPm ? amPm : ''}`;

    // Call showTime every second
    setTimeout(showTime, 1000);

    // Add missing zeros
    function addZero(n) {
        return(parseInt(n, 10) < 10 ? '0' : '') + n;
    }
}

// Set background image and greeting
function setBgGreeting() {
    // let today = new Date(2019, 06, 10, 20, 33, 30); // Just testing for different time of the day
    let today = new Date(),
        hour = today.getHours();

    if(hour < 12) {
        // Morning
        document.body.style.backgroundImage = "url('../img/morning.jpg')";
        greeting.textContent = 'Good Morning';
    } else if(hour < 18) {
        // Afternoon
        document.body.style.backgroundImage = "url('../img/afternoon.jpg')";
        greeting.textContent = 'Good Afternoon';
    } else {
        // Evening
        document.body.style.backgroundImage = "url('../img/night.jpg')";
        greeting.textContent = 'Good Evening';
        document.body.style.color = 'white'; // Because the bg image is dark
    }
}

// Making name and focus contents persistent using local storage
// Get Name
function getName() {
    if(localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// Set Name. 
// This has to happen ONLY when the 'Enter' key is pressed.
// Also has to distunguish between keypress and blur
function setName(e) {
    if(e.type === 'keypress') {
        // Make sure 'Enter' is pressed
        if(e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur(); // To ensure pressed 'Enter' key doesn't go to next line
        }
    } else { // This means it's the blur
        localStorage.setItem('name', e.target.innerText);
    }
}

// Get Focus
function getFocus() {
    if(localStorage.getItem('focus') === null) {
        focus.textContent = "[What's Your Focus Today?]";
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
// This has to happen ONLY when the 'Enter' key is pressed.
// Also has to distunguish between keypress and blur
function setFocus(e) {
    if(e.type === 'keypress') {
        // Make sure 'Enter' is pressed
        if(e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur(); // To ensure pressed 'Enter' key doesn't go to next line
        }
    } else { // This means it's the blur
        localStorage.setItem('focus', e.target.innerText);
    }
}

// Name and Focus should update and clear out when text is entered after either 
// clicking 'Enter" key or clicking off the text area (called the 'blur')
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreeting();
getName();
getFocus();