import { getLocalStorage } from "../../js/utils.mjs";
const title = document.querySelector(".name");
const info = document.querySelector(".info");
const back = document.querySelector(".back");
// function imported/copied from utils
let evmov = getLocalStorage("event");
info.innerHTML = `<p>Event: ${evmov.Name}</p>
<p>Date: ${evmov.date}</p>
<p>Final Movie: ${evmov.FinalMovie}</p>
<p>Movie Options: ${evmov.MovieList}</p>`;

back.innerHTML = `<input type=submit value="Back" id="back"/>`;

back.addEventListener("click", () => {
  window.location.href = "../../index.html";
});
