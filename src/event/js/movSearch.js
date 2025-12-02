const title = document.querySelector(".name");
title.innerHTML = "Movie";
const display = document.querySelector("#display");
const pic = document.querySelector("#pic");
const cap = document.querySelector("#caption");
const button = document.querySelector("#search")

const getString = window.location.search;
const mySearch = new URLSearchParams(getString)
console.log(mySearch)
let movie = mySearch.get("movie");
let long = mySearch.get("desc");
if (long == "short") {
    long = ""
} else (
    long = "&plot=full"
)

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

function displayResults(data) {
    display.innerHTML = `${data.Title}`;
    console.log(pic)
    const desc = data.Poster;
    pic.setAttribute("src", desc);
    pic.setAttribute("alt", data.Title);
    cap.textContent = `${data.Plot}`;


}
apiFetch();