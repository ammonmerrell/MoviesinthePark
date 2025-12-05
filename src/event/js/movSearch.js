const display = document.querySelector("#display");
const pic = document.querySelector("#pic");
const cap = document.querySelector("#caption");
const button = document.querySelector("#search");
const info = document.querySelector("#info");
const suggest = document.querySelector(".suggest")

// get form response from user and puts them in variables.
const getString = window.location.search;
const mySearch = new URLSearchParams(getString);
console.log(mySearch);
let movie = mySearch.get("movie");
let long = mySearch.get("desc");
// checks to see if "long" variable is short, if so make it blank.
// if not, change it in order to run with the api.
if (long == "short") {
  long = "";
} else long = "&plot=full";

const url = `https://www.omdbapi.com/?t=${movie}&apikey=3cf352d${long}`;

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}
// funtion displays results from api
function displayResults(data) {
  display.innerHTML = `${data.Title}`;
  console.log(pic);
  const desc = data.Poster;
  pic.setAttribute("alt", `${data.Title}`);
  pic.setAttribute("src", desc);
  // add info from api into p with all the data.
  cap.innerHTML = `<imgcaption>${data.Plot}</imgcaption>
    <p>Length: ${data.Runtime}</p>
    <p>Genre: ${data.Genre}
    <p>Rating: ${data.Rated}</p>
    <p>Director: ${data.Director}</p>
    <p>Actors: ${data.Actors}</p>
    <p>Writers: ${data.Writer}</p>
    <p>Released: ${data.Released}</p>
    <p>Boxoffice: ${data.BoxOffice}</p>
    <p>IMDB Rating: ${data.imdbRating}</p>
    <p>Awards: ${data.Awards}`;
}
// copied function from utils.mjs
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// copied function from utils.mjs
function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

suggest.addEventListener("click", () => {
  const eventList = getLocalStorage("event") || [];
  let a = eventList[0].MovieList
  a.push(movie)
  eventList.MovieList = a
  setLocalStorage("event", eventList);
  const events = getLocalStorage("so-events")
  checkId()
  // simmilar function to main.js, changed localstorage variable
  function checkId(evt) {
  
    let cart = getLocalStorage("so-events");
    console.log(cart)
    cart.forEach((element) => {
      // compares the element name and the event target innerHTML to find the matching event.
      if (element.Name === eventList[0].Name) {
        // moves the data in the "event" variable(eventList) to the current event in "so-events" variable(cart).
        cart.splice(eventList.index, 1, eventList)
        // updates the "so-events" localstorage with the updated variable (cart). 
        setLocalStorage("so-events", cart);
        window.location.href = "/event/index.html";
      }
    });
  }
})
apiFetch();
