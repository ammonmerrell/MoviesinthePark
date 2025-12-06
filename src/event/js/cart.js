const title = document.querySelector(".name");
const info = document.querySelector(".info");
// function imported/copied from utils
let evmov = JSON.parse(localStorage.getItem("event"));
console.log(evmov.date);
info.innerHTML = `<p>Event: ${evmov.Name}</p>
<p>Date: ${evmov.date}</p>
<p>Final Movie: ${evmov.FinalMovie}</p>
<p>Movie Options: ${evmov.MovieList}</p>`;
