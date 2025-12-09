const location = document.querySelector(".location");
const temp = document.querySelector(".temp");
const pic = document.querySelector("#pic");
const cap = document.querySelector("#caption");
const speed = document.querySelector(".wind-speed");
const direction = document.querySelector(".wind-direction");
const getString = window.location.search;
const mySearch = new URLSearchParams(getString);
const date = document.querySelector(".date");

const temp2 = document.querySelector(".temp2");
const pic2 = document.querySelector("#pic2");
const cap2 = document.querySelector("#caption2");
const speed2 = document.querySelector(".wind-speed2");
const direction2 = document.querySelector(".wind-direction2");

const temp3 = document.querySelector(".temp3");
const pic3 = document.querySelector("#pic3");
const cap3 = document.querySelector("#caption3");
const speed3 = document.querySelector(".wind-speed3");
const direction3 = document.querySelector(".wind-direction3");

const temp4 = document.querySelector(".temp4");
const pic4 = document.querySelector("#pic4");
const cap4 = document.querySelector("#caption4");
const speed4 = document.querySelector(".wind-speed4");
const direction4 = document.querySelector(".wind-direction4");

let hrs = mySearch.get("hrs");

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
      location.textContent = `Error: ${error.message}. Setting latitude and longitude instead to "${latitude}" and "${longitude}".`;
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
  const iconsrc = `${data.properties.periods[hrs - 1].icon}`;

  pic.setAttribute("src", iconsrc);
  pic.setAttribute("alt", data.properties.periods[hrs - 1].shortForecast);
  cap.textContent = `Percipitaion: ${data.properties.periods[hrs - 1].shortForecast}`;
  temp.innerHTML = `Temperature: ${data.properties.periods[hrs - 1].temperature}&deg;F`;
  speed.innerHTML = `Wind Speed: ${data.properties.periods[hrs - 1].windSpeed}`;
  direction.innerHTML = `Wind Direction: ${data.properties.periods[hrs - 1].windDirection}`;

  const iconsrc2 = `${data.properties.periods[hrs].icon}`;
  pic2.setAttribute("src", iconsrc2);
  pic2.setAttribute("alt", data.properties.periods[hrs].shortForecast);
  cap2.textContent = `Percipitaion: ${data.properties.periods[hrs].shortForecast}`;
  temp2.innerHTML = `Temperature: ${data.properties.periods[hrs].temperature}&deg;F`;
  speed2.innerHTML = `Wind Speed: ${data.properties.periods[hrs].windSpeed}`;
  direction2.innerHTML = `Wind Direction: ${data.properties.periods[hrs].windDirection}`;

  const iconsrc3 = `${data.properties.periods[hrs + 1].icon}`;
  pic3.setAttribute("src", iconsrc3);
  pic3.setAttribute("alt", data.properties.periods[hrs + 1].shortForecast);
  cap3.textContent = `Percipitaion: ${data.properties.periods[hrs + 1].shortForecast}`;
  temp3.innerHTML = `Temperature: ${data.properties.periods[hrs + 1].temperature}&deg;F`;
  speed3.innerHTML = `Wind Speed: ${data.properties.periods[hrs + 1].windSpeed}`;
  direction3.innerHTML = `Wind Direction: ${data.properties.periods[hrs + 1].windDirection}`;

  const iconsrc4 = `${data.properties.periods[hrs + 1].icon}`;
  pic4.setAttribute("src", iconsrc4);
  pic4.setAttribute("alt", data.properties.periods[hrs + 2].shortForecast);
  cap4.textContent = `Percipitaion: ${data.properties.periods[hrs + 2].shortForecast}`;
  temp4.innerHTML = `Temperature: ${data.properties.periods[hrs + 2].temperature}&deg;F`;
  speed4.innerHTML = `Wind Speed: ${data.properties.periods[hrs + 2].windSpeed}`;
  direction4.innerHTML = `Wind Direction: ${data.properties.periods[hrs + 2].windDirection}`;
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
