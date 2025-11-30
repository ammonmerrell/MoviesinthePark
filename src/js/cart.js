const title = document.querySelector(".name");
title.innerHTML = "ad"
const movie = document.querySelector("#movie")
const pic = document.querySelector("#pic")
const cap = document.querySelector("#caption")
const url = 'https://www.omdbapi.com/?t=up&apikey=3cf352d ';

// const weatherTemp2 = document.querySelector('#movie');
// const weatherIcon2 = document.querySelector('#pic');
// const captionDest2 = document.querySelector('#caption');


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
    movie.innerHTML = `${data.Title}`;
    
    const desc = data.Poster;
    pic.setAttribute('src', desc);
    pic.setAttribute('alt', data.Title);
    cap.textContent = `${data.Plot}`;

    // weatherTemp2.innerHTML = `${data.Title}&deg;F`;
    // const desc = data.Poster;
    // console.log(data.Title)
    // pic.setAttribute('src', desc);
    // pic.setAttribute('alt', data.Title);
    // cap.textContent = data.Plot;
}
apiFetch()