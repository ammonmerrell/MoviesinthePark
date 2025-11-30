import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const a = document.querySelector(".list");
a.innerHTML = ``;
function addProductToList(event) {
  const eventList = getLocalStorage("so-events") || [];
  eventList.push(event);
  setLocalStorage("so-events", eventList);
}
function renderCartContents() {
  const cartItems = getLocalStorage("so-events") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  a.innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="src/event/index.html"
    <h2 class="card__name">${item.Name}</h2>
    </a>
  <button id="view" dataset="${item.Name}">${item.FinalMovie}</button>
</li>`;
  return newItem;
}
let ev = {
  Name: "newEvent",
  Date: "N/A",
  FinalMovie: "???",
  MovieList: ["The+Peanuts+movie", "Up", "luca", "Ice+Age"],
};

function removeFromCart() {
  const buttons = document.querySelectorAll("#view");
  buttons.forEach((button) =>
    button.addEventListener("click", function (event) {
      const itemId = event.target.getAttribute("dataset");
      let cartItems = getLocalStorage("so-cart") || [];
      cartItems.splice(itemId, 1);
      localStorage.setItem("so-cart", JSON.stringify(cartItems));
      console.log(itemId);
      renderCartContents();
    }),
  );
}

// addProductToList(ev)
renderCartContents();
removeFromCart();
