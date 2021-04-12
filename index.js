const deleteUserEl = document.getElementById("deleteUser");

const signupSectionEl = document.getElementById("signupSection");
const signupFormEl = document.getElementById("signupForm");
const createEventSectionEl = document.getElementById("createEventSection");
const eventCalendarSectionEl = document.getElementById("eventCalendarSection");

const usernameEl = document.getElementById("username");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");

const greetingEl = document.getElementById("greeting");


function getUserDetailsFromLocalStorage() {
    let stringifiedUserDetails = localStorage.getItem("UserDetails");
    let parsedUserDetails = JSON.parse(stringifiedUserDetails);
    if (parsedUserDetails === null) {
        return [];
    } else {
        return parsedUserDetails;
    }
}
let UserDetailsList = getUserDetailsFromLocalStorage();
console.log(UserDetailsList);

const createAndAppendEvent = (event) => {
    //generating date logic
    const date = new Date(event.startTime);
    const month = date.toLocaleString('default', {
        month: 'long'
    });
    const dateOfMonth = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();
    var getDaysInMonth = function(month, year) {
        return new Date(year, month + 1, 0).getDate();
    };
    const days = (getDaysInMonth(m, y));
    //creating html elements dynamically
    // const greetingEl = document.createElement("span");
    // greetingEl.textContent = "Hello ";
    // eventCalendarSectionEl.appendChild(greetingEl);

    // const greetUserEl = document.createElement("span");
    // greetUserEl.textContent = `${UserDetailsList[0].username}, You can find your events below`;
    // eventCalendarSectionEl.appendChild(greetUserEl);
    const monthCalendarEl = document.createElement("div");
    monthCalendarEl.classList.add("month-calendar");
    eventCalendarSectionEl.appendChild(monthCalendarEl);

    const monthHeadingEl = document.createElement("h1");
    monthHeadingEl.classList.add("text-center", "text-white");
    monthHeadingEl.textContent = month;
    monthCalendarEl.appendChild(monthHeadingEl);

    const daysContainerEl = document.createElement("div");
    daysContainerEl.classList.add("month-container");
    monthCalendarEl.appendChild(daysContainerEl);

    const eventContainerEl = document.createElement("div");
    eventContainerEl.classList.add("event-container");
    monthCalendarEl.appendChild(eventContainerEl);

    const eventNameEl = document.createElement("span");
    eventNameEl.classList.add("event-name");
    eventNameEl.textContent = `Event Name: ${event.name} Date: ${dateOfMonth} ${month.substring(0,3)} ${y}`;
    eventContainerEl.appendChild(eventNameEl);

    for (let day = 1; day <= days; day++) {
        const dayContainerEl = document.createElement("div");
        dayContainerEl.classList.add("dayContainer");
        if (day === dateOfMonth) {
            dayContainerEl.style.backgroundColor = "orange";
        }
        daysContainerEl.appendChild(dayContainerEl);
        const dayHeadingEl = document.createElement("p");
        dayHeadingEl.textContent = day;
        dayContainerEl.appendChild(dayHeadingEl);
    }
};

const displayUser = () => {
    greetingEl.textContent = `Welcome ${UserDetailsList[0].username}, You can find your events below`;
    eventCalendarSectionEl.appendChild(greetingEl);
};


if (UserDetailsList.length > 0) {
    signupSectionEl.classList.add("d-none");
    createEventSectionEl.classList.remove("d-none");
    if (UserDetailsList[0].events.length > 0) {
        eventCalendarSectionEl.classList.remove("d-none");
        displayUser();
        for (let event of UserDetailsList[0].events) {
            createAndAppendEvent(event);
        }
    }
}
let userCount = UserDetailsList.length;


function createUser(username, Email, Password) {
    const userDetails = {
        id: userCount + 1,
        username,
        Email,
        Password,
        events: [],
    };
    UserDetailsList.push(userDetails);
    localStorage.setItem("UserDetails", JSON.stringify(UserDetailsList));
}

deleteUserEl.addEventListener("click", (event) => {
    if (UserDetailsList.length < 1) {
        alert("No User To Delete");
    } else {
        localStorage.removeItem("UserDetails");
        UserDetailsList = [];
        alert("User Deleted");
        signupSectionEl.classList.remove("d-none");
        createEventSectionEl.classList.add("d-none");
        eventCalendarSectionEl.classList.add("d-none");
    }
});

signupFormEl.addEventListener("submit", (event) => {
    event.preventDefault();
    createUser(usernameEl.value, emailEl.value, passwordEl.value);
    usernameEl.value = "";
    emailEl.value = "";
    passwordEl.value = "";
    signupSectionEl.classList.add("d-none");
    createEventSectionEl.classList.remove("d-none");
});

// event handling code

const eventFromEl = document.getElementById("eventFrom");

const nameEl = document.getElementById("name");
const descriptionEl = document.getElementById("description");
const startTimeEl = document.getElementById("startTime");
const endTimeEl = document.getElementById("endTime");
const dayOfTheWeekEl = document.getElementById("dayOfTheWeek");

let dayOfTheWeekValue = dayOfTheWeekEl.value;

dayOfTheWeekEl.addEventListener("change", (event) => {
    dayOfTheWeekValue = event.target.value;
});

const getUserAndAddEvent = (name, description, startTime, endTime, dayOfTheWeek) => {
    const eventLength = UserDetailsList[0].events.length;
    let event = {
        id: eventLength + 1,
        name,
        description,
        startTime,
        endTime,
        dayOfTheWeek,
    };
    UserDetailsList[0].events.push(event);
    localStorage.setItem("UserDetails", JSON.stringify(UserDetailsList));
    return;
};

const getEvents = (UserDetailsList) => {
    const events = UserDetailsList[0].events;
    return events;
};


eventFromEl.addEventListener("submit", (event) => {
    event.preventDefault();
    eventCalendarSectionEl.textContent = "";
    displayUser();
    const nameValue = nameEl.value;
    const descriptionValue = descriptionEl.value;
    const startTimeValue = startTimeEl.value;
    const endTimeValue = endTimeEl.value;
    getUserAndAddEvent(nameValue, descriptionValue, startTimeValue, endTimeValue, dayOfTheWeekValue);
    nameEl.value = "";
    descriptionEl.value = "";
    startTimeEl.value = "";
    endTimeEl.value = "";
    dayOfTheWeekEl.value = "Monday";
    eventCalendarSectionEl.classList.remove("d-none");
    const UserDetailsList = getUserDetailsFromLocalStorage();
    const eventsList = getEvents(UserDetailsList);
    console.log(UserDetailsList);
    console.log(eventsList);
    for (let event of eventsList) {
        createAndAppendEvent(event);
    }
});
