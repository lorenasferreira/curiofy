import { getRandomFact } from "./api.js";
import { renderFavorites } from "./ui.js";

const factText = document.getElementById("fact-text");
const newFactBtn = document.getElementById("btn-new");
const btnFav = document.getElementById("btn-fav");
const favoritesList = document.getElementById("favorites-list");

let currentFact = null;
let favorites = [];

async function loadFact() {
  const fact = await getRandomFact();

  if (fact) {
    currentFact = fact;
    factText.textContent = fact;
    btnFav.disabled = false;
  } else {
    factText.textContent = "Something went wrong. Try again.";
  }
}

function addFavorite() {
  if (!currentFact) return;
  if (favorites.includes(currentFact)) {
    return;
  }
  favorites.push(currentFact);
  renderFavorites(favorites, favoritesList);
}

newFactBtn.addEventListener("click", loadFact);
btnFav.addEventListener("click", addFavorite);

renderFavorites(favorites, favoritesList);