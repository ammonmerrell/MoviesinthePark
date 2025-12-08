const location1 = document.querySelector(".location");
const pic = document.querySelector("#pic");
const cap = document.querySelector("#caption");
const getString = window.location.search;
const mySearch = new URLSearchParams(getString);
const date = document.querySelector(".date");

let hrs = mySearch.get("hrs");

const pic2 = document.querySelector("#pic2");
const cap2 = document.querySelector("#caption2");
const location2 = document.querySelector(".location2");
const p2 = document.querySelector("#location-button2");
// const weatherTemp1 = document.querySelector('.location');
// const weatherIcon1 = document.querySelector('#pic');
// const captionDest1 = document.querySelector('#caption');

let latitude = 40.6;
let longitude = -112.06;
// geolocation api  template from week3 lesson module.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      // output
      location.innerHTML = `Latitude: ${latitude} 🧭 Longitude: ${longitude}`;
    },
    function (error) {
      location.textContent = `Error: ${error.message}. Setting latitude and longitude instead to "40.06" and "-112.06".`;
    },
  );
} else {
  location.textContent = "Geolocation is not supported by this browser.";
}
// copied from utils.mjs
function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// copied from utils.mjs
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

let url = `https://api.weather.gov/points/${latitude},${longitude}`;

// urla = getLocalStorage("data")
const urla = window.localStorage.getItem("data");

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      let ad = data.properties.forecastHourly;
      localStorage.setItem("data", data.properties.forecastHourly);
      // setLocalStorage("data", ad)
      // displayResults(data);
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
  const iconsrc = `${data.properties.periods[hrs].icon}`;

  pic.setAttribute("src", iconsrc);
  pic.setAttribute("alt", data.properties.periods[hrs].shortForecast);
  cap.textContent = `Percipitaion: ${data.properties.periods[hrs].shortForecast}`;

  location1.innerHTML = `Temperature: ${data.properties.periods[hrs].temperature}&deg;F`;

  location2.innerHTML = `Wind Speed: ${data.properties.periods[hrs].windSpeed}`;
  p2.innerHTML = `Wind Direction: ${data.properties.periods[hrs].windDirection}`;
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
    const events = getLocalStorage("so-events");
    checkId();
  } else {
    // a += `${a},`
    eventList.date = a;
    setLocalStorage("event", eventList);
    const events = getLocalStorage("so-events");
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
