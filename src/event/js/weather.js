const location1 = document.querySelector(".location")
const pic = document.querySelector("#pic")
const cap = document.querySelector("#caption")
const getString = window.location.search;
const mySearch = new URLSearchParams(getString);
let hrs = mySearch.get("hrs");

const pic2 = document.querySelector("#pic2")
const cap2 = document.querySelector("#caption2")
const location2 = document.querySelector(".location2")
const p2 = document.querySelector("#location-button2")
// const weatherTemp1 = document.querySelector('.location');
// const weatherIcon1 = document.querySelector('#pic');
// const captionDest1 = document.querySelector('#caption');

let latitude = 40.60
let longitude = -112.06
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
        }
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



let url = `https://api.weather.gov/points/${latitude},${longitude}`

// urla = getLocalStorage("data")
const urla = window.localStorage.getItem("data")
console.log(urla)
console.log(url)


async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data.properties.forecastHourly);
            let ad = data.properties.forecastHourly
            console.log(ad)
            localStorage.setItem("data", data.properties.forecastHourly);
            // setLocalStorage("data", ad)
            // displayResults(data);
        } else {
            console.log("B")
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

async function apiFetch2() {
    try {
        const response = await fetch(urla);
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            console.log(data)
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

    pic.setAttribute('src', iconsrc);
    pic.setAttribute('alt', data.properties.periods[hrs].shortForecast);
    cap.textContent = `Percipitaion: ${data.properties.periods[hrs].shortForecast}`;

    console.log(data.properties.periods[hrs].windSpeed)
    location1.innerHTML = `Temperature: ${data.properties.periods[hrs].temperature}&deg;F`;
   
    


    console.log(data.properties.periods[hrs].windSpeed)
    location2.innerHTML = `Wind Speed: ${data.properties.periods[hrs].windSpeed}`;
    p2.innerHTML = `Wind Direction: ${data.properties.periods[hrs].windDirection}`;



//     console.log(data.properties.periods[0].probabilityOfPrecipitation.value)
//     location.innerHTML = `${data.properties.periods[0].temperature}&deg;F`;
//     const iconsrc = `${data.properties.periods[0].icon}`;


//     console.log(data)
//     pic.setAttribute('src', iconsrc);
//     pic.setAttribute('alt', data.properties.periods[1].shortForecast);
//     cap.textContent = `${data.properties.periods[1].shortForecast}`;
}

apiFetch()
apiFetch2()