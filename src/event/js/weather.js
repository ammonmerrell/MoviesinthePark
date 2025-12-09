import { getLocalStorage, setLocalStorage } from "../../js/utils.mjs";
const location = document.querySelector(".location");
const getString = window.location.search;
const mySearch = new URLSearchParams(getString);
const date = document.querySelector(".date");

let hrs = mySearch.get("hrs");
let hr = hrs;
let latitude = 40.6;
let longitude = -112.06;
// geolocation api  template from week3 lesson module.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      // location output
      location.innerHTML = `Latitude: ${latitude} 🧭 Longitude: ${longitude}`;
    },
    function (error) {
      location.textContent = `Error: ${error.message}. Setting latitude and longitude instead to "${latitude}" and "${longitude}".`;
    },
  );
} else {
  location.textContent = "Geolocation is not supported by this browser.";
}

let url = `https://api.weather.gov/points/${latitude},${longitude}`;

const urla = window.localStorage.getItem("data");

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("data", data.properties.forecastHourly);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

async function apiFetch2() {
  try {
    const response = await fetch(urla);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  for (let hour = 1; hour < 5; hour++) {
    if (hour == 1) {
      hr = hrs - 1;
    }
    const temp = document.querySelector(`.temp${hour}`);
    const pic = document.querySelector(`#pic${hour}`);
    const cap = document.querySelector(`#caption${hour}`);
    const speed = document.querySelector(`.wind-speed${hour}`);
    const direction = document.querySelector(`.wind-direction${hour}`);
    let iconsrc = `${data.properties.periods[hr].icon}`;
    pic.setAttribute("src", iconsrc);
    pic.setAttribute("alt", data.properties.periods[hr].shortForecast);
    cap.textContent = `Percipitaion: ${data.properties.periods[hr].shortForecast}`;
    temp.innerHTML = `Temperature: ${data.properties.periods[hr].temperature}&deg;F`;
    speed.innerHTML = `Wind Speed: ${data.properties.periods[hr].windSpeed}`;
    direction.innerHTML = `Wind Direction: ${data.properties.periods[hr].windDirection}`;
    hr += 1;
  }
}

apiFetch();
apiFetch2();

date.addEventListener("click", () => {
  const eventList = getLocalStorage("event") || [];
  let a = eventList.date;
  if (Array.isArray(a)) {
    a.push(date);
    eventList.date = a;
    setLocalStorage("event", eventList);
    checkId();
  } else {
    eventList.date = a;
    setLocalStorage("event", eventList);
    checkId();
  }
  // simmilar function to main.js, changed localstorage variable
  function checkId(evt) {
    let cart = getLocalStorage("so-events");

    if (Array.isArray(cart)) {
      cart.forEach((element) => {
        // compares the element name and the event target innerHTML to find the matching event.
        if (element.Name === eventList.Name) {
          // moves the data in the "event" variable(eventList) to the current event in "so-events" variable(cart).
          cart.splice(eventList.index, 1, eventList);
          // updates the "so-events" localstorage with the updated variable (cart).
          setLocalStorage("so-events", cart);
          window.location.href = "/event/index.html";
        }
      });
    } else {
      eventList.date = hrs;
      setLocalStorage("so-events", eventList);
      setLocalStorage("event", eventList);
      window.location.href = "/event/index.html";
    }
  }
});
