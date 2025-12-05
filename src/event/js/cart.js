const title = document.querySelector(".name");
const info = document.querySelector(".info");
// function imported/copied from utils
let evmov = JSON.parse(localStorage.getItem("event"));
console.log(evmov[0].Name);
info.innerHTML = `<p>Event: ${evmov[0].Name}</p>
<p>Date: ${evmov[0].Date}</p>
<p>Final Movie: ${evmov[0].FinaMovie}</p>
<p>Movie Options: ${evmov[0].MovieList}</p>`;
