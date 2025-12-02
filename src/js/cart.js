const title = document.querySelector(".name");
title.innerHTML = "Movie";
const display = document.querySelector("#display");
const pic = document.querySelector("#pic");
const cap = document.querySelector("#caption");
const url = "https://www.omdbapi.com/?t=up&apikey=3cf352d";


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
