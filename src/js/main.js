import { getRandomFact } from "./api.js";
import {
  renderFavorites,
  showFactStatus,
  clearFactStatus,
  hideFactText,
  revealFactText,
  setButtonDisabled,
} from "./ui.js";
import { addFavorite as addFavoritePure } from "./favorites.js";

const factText = document.getElementById("fact-text");
const factStatus = document.getElementById("fact-status");
const newFactBtn = document.getElementById("btn-new");
const btnFav = document.getElementById("btn-fav");
const favoritesList = document.getElementById("favorites-list");

let currentFact = null;
let favorites = [];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadFact() {
  setButtonDisabled(newFactBtn, true);
  setButtonDisabled(btnFav, true);

  showFactStatus(factStatus, "Consulting the crystal ball...");
  hideFactText(factText);

  await wait(1200);

  const fact = await getRandomFact();

  if (fact) {
    currentFact = fact;
    revealFactText(factText, fact);
    clearFactStatus(factStatus);
    setButtonDisabled(btnFav, false);
  } else {
    currentFact = null;
    revealFactText(factText, "Something went wrong. Try again.");
    clearFactStatus(factStatus);
  }

  setButtonDisabled(newFactBtn, false);
}

function addFavoriteDOM() {
  if (!currentFact) return;

  const newList = addFavoritePure(favorites, currentFact);
  favorites = newList;
  renderFavorites(favorites, favoritesList, removeFavoriteDOM);
}

function removeFavoriteDOM(index) {
  favorites.splice(index, 1);
  renderFavorites(favorites, favoritesList, removeFavoriteDOM);
}

newFactBtn.addEventListener("click", loadFact);
btnFav.addEventListener("click", addFavoriteDOM);

renderFavorites(favorites, favoritesList, removeFavoriteDOM);