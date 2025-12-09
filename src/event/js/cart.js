import { getLocalStorage, setLocalStorage } from "../../js/utils.mjs";

const title = document.querySelector(".name");
const info = document.querySelector(".info");
const back = document.querySelector(".back");
const final = document.querySelector(".final");
document.addEventListener("DOMContentLoaded", () => {
  let evmov = getLocalStorage("event");
  info.innerHTML = `<p>Event: ${evmov.Name}</p>
<p>Date: ${evmov.date}</p>
<p>Final Movie: ${evmov.FinalMovie}</p>
<p>Movie Options: ${evmov.MovieList}</p>`;
  back.innerHTML = `<input type=submit value="Back" id="back"/>`;
  final.innerHTML = `<input type=submit value="Select Movie" id="select" />`;
});

// info.addEventListener("mouseover", () => {
//   info.classList.toggle("in");
// })

back.addEventListener("click", () => {
  window.location.href = "../../index.html";
});
final.addEventListener("click", () => {
  let evmov = getLocalStorage("event");
  let selection = Math.floor(Math.random() * evmov.MovieList.length);
  evmov.FinalMovie = evmov.MovieList[selection];
  setLocalStorage("event", evmov);
  setLocalStorage("so-events", evmov);
  info.classList.toggle("in");
  // window.location.href = "/event/index.html";
});
