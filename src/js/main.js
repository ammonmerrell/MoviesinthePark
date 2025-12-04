import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const a = document.addEventListener("click", checkId);
const b = document.addEventListener("click", addNewEvent);
let number = 0

document.querySelector(".new").innerHTML = "Add event"

function addNewEvent() {
  number += 1
  console.log(ev.Name)
  addProductToList(ev)
}
function addEventButton() {
  // create new button to add event.
  let newItem = `<li class="cart-card divider">
  <a href="/event/index.html"></a>
    <button class="card__name">Add New Event</button>
    </a>
</li>`;
  document.querySelector(".new").innerHTML = newItem

}
function addProductToList(event) {
  const eventList = getLocalStorage("so-events") || [];
  eventList.push(event);
  setLocalStorage("so-events", eventList);
}
function renderCartContents() {
  const cartItems = getLocalStorage("so-events") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="/event/index.html"></a>
    <button class="card__name">${item.Name}</button>
    </a>
</li>`;
  return newItem;
}
let ev = 
  {
    "Name": "newEvent",
    "Date": "N/A",
    "FinalMovie": "???",
    "MovieList": [],
    "index": parseInt(`${number}`)
  };

function removeFromCart() {
  const buttons = document.querySelectorAll("#view");
  buttons.forEach((button) =>
    button.addEventListener("click", function (event) {
      const itemId = event.target.getAttribute("dataset");
      let cartItems = getLocalStorage("so-events") || [];
      cartItems.splice(itemId, 1);
      localStorage.setItem("so-events", JSON.stringify(cartItems));
      console.log(itemId);
      renderCartContents();
    }),
  );
}

function checkId(evt) {
  let cart = getLocalStorage("so-events");
  cart.forEach((element) => {
    if (element.Name === evt.target.innerHTML) {
      // compares the element name and the event target innerHTML to find the matching event.

      setLocalStorage("event", element);
      window.location.href = "/event/index.html";
    }
  });
}


renderCartContents();
// removeFromCart();
addEventButton()