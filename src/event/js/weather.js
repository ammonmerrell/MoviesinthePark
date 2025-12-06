const location = document.querySelector(".location")
let latitude = 40.60
let longitude = -112.06
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            // output
            console.log(latitude)
            location.innerHTML = `Latitude: ${latitude} 🧭 Longitude: ${longitude}`;
        },
        function (error) {
            location.textContent = `Error: ${error.message}`;
        }
    );
} else {
    location.textContent = "Geolocation is not supported by this browser.";
}
