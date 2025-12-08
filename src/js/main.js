import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const a = document.querySelector(".list")
a.addEventListener("click", checkId);
const b = document.querySelector(".new")
b.addEventListener("click", addNewEvent);


document.querySelector(".new").innerHTML = "Add event"

function addNewEvent() {
  console.log("B")
  let number = getLocalStorage("so-events") || []
  addProductToList({
    "Name": "newEvent",
    "date": "N/A",
    "FinalMovie": "???",
    "MovieList": [],
    "index": parseInt(`${number.length}`)
  });
  console.log(number)
  setLocalStorage("event", {
    "Name": "newEvent",
    "date": "N/A",
    "FinalMovie": "???",
    "MovieList": [],
    "index": parseInt(`${number.length}`)
  });
  // checkId
  window.location.href = "/event/index.html";
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
  if (Array.isArray(eventList)) {
    eventList.push(event);
    setLocalStorage("so-events", eventList[0]);
  } else {
    eventList + event
    console.log(typeof (eventList))
    setLocalStorage("so-events", eventList);
  }
 
}
function renderCartContents() {
  const cartItems = getLocalStorage("so-events") || [];
  console.log(cartItems)
  if (Array.isArray(cartItems)) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".list").innerHTML = htmlItems.join("");
  } else {
    const htmlItems = cartItemTemplate(cartItems)
    document.querySelector(".list").innerHTML = htmlItems;
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <button class="card__name">${item.Name}</button>
</li>`;
  return newItem;
}
// let ev = 
//   {
//     "Name": "newEvent",
//     "Date": "N/A",
//     "FinalMovie": "???",
//     "MovieList": [],
//     "index": parseInt(`${number}`)
//   };

// function removeFromCart() {
//   const buttons = document.querySelectorAll("#view");
//   buttons.forEach((button) =>
//     button.addEventListener("click", function (event) {
//       const itemId = event.target.getAttribute("dataset");
//       let cartItems = getLocalStorage("so-events") || [];
//       cartItems.splice(itemId, 1);
//       localStorage.setItem("so-events", JSON.stringify(cartItems));
//       console.log(itemId);
//       renderCartContents();
//     }),
//   );
// }

function checkId(evt) {
  console.log("A")
  let cart = getLocalStorage("so-events");
  if (Array.isArray(cart)) {
    cart.forEach((element) => {
      if (element.Name === evt.target.innerHTML) {
        // compares the element name and the event target innerHTML to find the matching event.

        setLocalStorage("event", element);
        window.location.href = "/event/index.html";
      }
    });
  } else {
    console.log(cart)
    setLocalStorage("event", cart)
    window.location.href = "/event/index.html";
  }
}


renderCartContents();
// removeFromCart();
addEventButton()